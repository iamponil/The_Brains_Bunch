import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from '../../images/dot-pattern.svg';
import axios, { Axios } from 'axios';

const Content = tw.div`max-w-screen-2xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-purple-100   text-purple-500 rounded-lg `}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }

  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-500 text-base font-medium tracking-wide border-b-2 py-2 text-gray-500 hocus:border-pink-400 focus:outline-none transition duration-200`};

    padding: 8px;

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }

  max-width: 800px; // set a max width for the container

  @media (min-width: 768px) {
    max-width: 900px;
  }
`;
const ImageContainer = styled.div`
  border: 2px dashed gray;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px text-center hocus:shadow-xl `;
const buttonStyle = { display: 'revert' };
const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export default function EditAddress() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [streetAddress, setstreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setErrors] = useState(null);
  const [zipCode, setZipCode] = useState('');

  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    streetAddress: '',
    state: '',
    zipCode: '',
    country: '',
  });
  useEffect(() => {
    let script;
    if (!window.google) {
      script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOZZr9jV6SMRQM6rYiYZvnmernRiS3Llo&libraries=places`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        const geocoderInstance = new window.google.maps.Geocoder();
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.0, lng: 9.0 },
          zoom: 8,
        });

        setGeocoder(geocoderInstance);
        setMap(map);

        geocoderInstance.geocode(
          { address: `Amphitheatre Parkway, USA` },
          (results, status) => {
            if (status === 'OK') {
              map.setCenter(results[0].geometry.location);
              const marker = new window.google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
              });
              setMarker(marker);

              window.google.maps.event.addListener(marker, 'click', () => {
                geocoderInstance.geocode(
                  { location: marker.getPosition() },
                  (results, status) => {
                    if (status === 'OK') {
                      const address_components = results[0].address_components;
                      console.log(address_components);
                      let city = '';
                      let state = '';
                      let country = '';
                      let streetAddress = '';
                      let zipCode = '';
                      address_components.forEach((component) => {
                        if (component.types.includes('locality')) {
                          city = component.long_name;
                        }
                        if (
                          component.types.includes(
                            'administrative_area_level_1'
                          )
                        ) {
                          state = component.long_name;
                        }
                        if (component.types.includes('country')) {
                          country = component.long_name;
                        }
                        if (
                          component.types.includes('route') ||
                          component.types.includes('street_address')
                        ) {
                          streetAddress = component.long_name;
                        }
                        if (component.types.includes('postal_code')) {
                          zipCode = component.long_name;
                        }
                      });
                      console.log('City:', city);
                      console.log('State:', state);
                      console.log('Country:', country);
                      console.log('Street Address:', streetAddress);
                      console.log('zipCode:', zipCode);
                      setCity(city);
                      setState(state);
                      setCountry(country);
                      setstreetAddress(streetAddress);
                      setZipCode(zipCode);
                      setFormData({
                        streetAddress,
                        city,
                        state,
                        zipCode,
                        country,
                      });
                      // update city, state, country, and street address state here
                    }
                  }
                );
              });
            } else {
              console.error(
                'Geocode was not successful for the following reason: ' + status
              );
            }
          }
        );
      };

      document.head.appendChild(script);
    } else {
      const geocoderInstance = new window.google.maps.Geocoder();
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      setGeocoder(geocoderInstance);
      setMap(map);
    }

    return () => {
      if (script) {
        script.onload = null;
        document.head.removeChild(script);
      }
      if (marker) {
        window.google.maps.event.clearListeners(marker, 'click');
        //   window.google.maps.event.clearListeners(marker, 'dragend');
      }
    };
   // Clear success message after 4 seconds
   if (successMessage) {
    const timeoutId = setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }
}, [successMessage]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/users/getUserAddress',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        const userAddress = response.data.address;
        console.log(userAddress);
        if (userAddress) {
          setFormData({
            streetAddress: userAddress.streetAdress,
            city: userAddress.city,
            state: userAddress.state,
            zipCode: userAddress.zipCode,
            country: userAddress.country,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAddress();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { city, country, state, streetAddress, zipCode } = formData;

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };

    const formDataToSend = {
      state,
      streetAddress,
      zipCode,
      city,
      country,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/users/addUserAddress',
        formDataToSend,
        { headers }
      );

      const { data: res } = response;
      console.log(res.message);
      setSuccessMessage('updated successfully!');
    } catch (error) {
      setErrors(error?.response?.data?.msg);
    }
  };

  return (
    <div>
      <Content>
        <FormContainer enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div tw="mx-auto max-w-4xl">
            <h2>Edit Address</h2>
            <form action="#">
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="country-input">Your Country</Label>
                    <Input
                      id="country-input"
                      type="text"
                      name="country"
                      placeholder="Tunisia"
                      value={formData.country}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>

                  <InputContainer>
                    <Label htmlFor="city-input">Your City</Label>
                    <Input
                      id="city-input"
                      type="text"
                      name="city"
                      placeholder="el kef"
                      value={formData.city}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="state-input">Your State</Label>
                    <Input
                      id="state-input"
                      type="text"
                      name="state"
                      placeholder="Tunisia"
                      value={formData.state}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="streetAddress-input">
                      Your Street Address
                    </Label>
                    <Input
                      id="streetAddress-input"
                      type="text"
                      name="streetAddress"
                      placeholder="harrouch"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="zipcode-input">Your ZipCode</Label>
                    <Input
                      id="zipcode-input"
                      type="text"
                      name="zipCode"
                      placeholder="7100"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required={true}
                    />

                    {error && <div>{error}</div>}
                    {msg && <div>{msg}</div>}
                  </InputContainer>
                </Column>
                <Column>
                  <ImageContainer id="map"></ImageContainer>
                </Column>
              </TwoColumn>

              <SubmitButton style={buttonStyle} type="submit" value="Submit">
                Submit
              </SubmitButton>
              {successMessage && <div  style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', padding: '1rem' ,
  borderRadius: '0.25rem', marginBottom: '1rem' }} >{successMessage}</div>}
            </form>
          </div>
        </FormContainer>
      </Content>
    </div>
  );
}