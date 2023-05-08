import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from '../../images/dot-pattern.svg';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
const Content = tw.div`max-w-screen-2xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-100  opacity-50 text-gray-100 rounded-lg `}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }

  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

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

export default () => {
    
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    phone_number_country: '',
    image: null,
  });
  const [msg, setMsg] = useState('');
  const [error, setErrors] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
const [User , setUser]= useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    // start initial tasks here
    const getUser = () => {
      fetch('http://localhost:5000/users/getOneByPayloadId/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          const user = resObject.user;
          setUser((prevState) => ({ ...prevState, user }));
          if (user) {
            setFormData({
                name: user.name,
              phone_number: user.phone_number,
              image: user.image,
           
            });
        }
        })
        .catch((err) => {
          console.log(err);
        });
    };
     // Clear success message after 4 seconds
     if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
    getUser();
    
  }, [successMessage]);

      
        
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageFile(file);
      console.log({ imageFile });
      setPreviewSrc(reader.result);
    };
  };
  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;

    if (name === 'phone_number' && !isValidPhoneNumber(value)) {
      setErrors(
        <div style={{ color: 'violet' }}>Please enter a valid phone number</div>
      );
    } else {
      setErrors(null);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, phone_number } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('phone_number', phone_number);
    if (imageFile) {
      formDataToSend.append('image', new File([imageFile], imageFile.name));
    }

    try {
      const response = await fetch('http://localhost:5000/users/updateUser', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formDataToSend,
      });
      const { data: res } = await response.json();
      console.log(res.message);
      setSuccessMessage('updated successfully!');
    } catch (error) {
      setErrors(error?.response?.data?.msg);
      setSuccessMessage('updated successfully!');
    }
  };

  return (
    <div>
      <Content>
        <FormContainer enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div tw="mx-auto max-w-4xl">
            <h2>Edit Informations</h2>
            <form action="#">
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Name</Label>
                    <Input
                      id="name-input"
                      type="text"
                      name="name"
                      placeholder="E.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>
                      Phone Number:
                      <PhoneInput
                        name="phone_number"
                        placeholder="Phone Number *"
                        value={formData.phone_number}
                        onChange={(value) => {
                          setFormData({ ...formData, phone_number: value });
                        }}
                        flags={flags}
                        defaultCountry="TN"
                        style={{
                          height: '100px',
                          border: formData.phone_number
                            ? !isPossiblePhoneNumber(formData.phone_number) &&
                              !isValidPhoneNumber(formData.phone_number)
                              ? '2px solid violet'
                              : 'none'
                            : 'null',
                        }}
                      />
                    </label>
                    {formData.phone_number ? (
                      !isPossiblePhoneNumber(formData.phone_number) &&
                      !isValidPhoneNumber(formData.phone_number) ? (
                        <div style={{ color: 'violet' }}>
                          Please enter a valid phone number
                        </div>
                      ) : null
                    ) : null}

                    {error && <div>{error}</div>}
                    {msg && <div>{msg}</div>}
                  </InputContainer>
                </Column>
                <Column>
                  <ImageContainer
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {previewSrc ? (
                      <ImagePreview src={previewSrc} />
                    ) : (
                      'Drag and drop image here'
                    )}
                  </ImageContainer>
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
};