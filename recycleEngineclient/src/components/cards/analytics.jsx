import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { NavLinks, NavLink } from 'components/headers/light';
import { Header } from 'components/headers/profileHeader';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
const Container = tw.div``;
const Content = tw.div``;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FormContainer = styled.div`
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-4xl sm:text-5xl  text-gray-700 font-bold`}
  }
  h3 {
    ${tw` text-gray-500 font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-500 text-base font-medium tracking-wide border-b-2 py-2 text-gray-500 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;
const Tag = styled.span`
  ${tw`inline-block rounded-full text-sm font-medium px-2 py-1`}
  background-color: ${(props) => props.color};
  color: #fff;
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input`  `;
const TextArea = tw.textarea`h-64 sm:h-full `;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl justify-center`;
const Button = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-gray-100 text-primary-500 w-full py-4 rounded-lg   rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-inner focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
export default function Analytics({ roundedHeaderButton }) {
  const [year, setYear] = useState(0);
  const [population, setPopulation] = useState(0);
  const [plastic_waste, setPlastic_waste] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [error, setErrors] = useState(null);
  const [isPredictionInRange, setIsPredictionInRange] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [prediction, setPrediction] = useState(null);
  const { titre } = useParams();

  const [formData, setFormData] = useState({
    year: '',
    population: '',
    plastic_waste: '',
    precipitation: '',
  });
  const [project, setproject] = useState({
    title: ' ',
    location: ' ',
    fundGoal: 0,
    category: ' ',
    subtitle: '',
    image: null,
    video: null,
    launchingDate: new Date().toISOString().slice(0, 10),
    duration: 0,
    Analytics: ' ',
  });
  useEffect(() => {
    if (titre) {
      fetch(`http://localhost:5000/projects/getByTitle/${titre}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setproject(data);
          console.log(project);
        })
        .catch((err) => {
          console.error(err);
          setErrors(err);
        });
    }
  }, [titre]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      year: formData.year,
      population: formData.population,
      plastic_waste: formData.plastic_waste,
      precipitation: formData.precipitation,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/projects/getAnalytics',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const res = await response.json();
      setPrediction(res);
      try {
        const response = await fetch(
          `http://localhost:5000/projects/updateAnalytics/${titre}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ analytics: res }), // convert res to a JSON string
          }
        );
      } catch (error) {
        setErrors(error?.response?.data?.msg);
        setSuccessMessage('updated successfully!');
      }

      console.log('Prediction value:', res); // log the value of the prediction
      alert('the prediction is made successfully');

      const predictionValue = res;
      if (predictionValue >= 8.7 && predictionValue <= 9.5) {
        setIsPredictionInRange(true);
      } else {
        setIsPredictionInRange(false);
      }

      setSuccessMessage('updated successfully!');
    } catch (error) {
      setErrors(error?.response?.data?.msg);
      setSuccessMessage('updated successfully!');
    }
  };
  const getColorClass = (value) => {
    if (value >= 8 && value < 9) {
      console.log('Value:', value, 'Class:', 'bg-yellow-400 text-gray-900');
      return '#10B981';
    } else if (value >= 9 && value <= 9.5) {
      console.log('Value:', value, 'Class:', 'bg-green-400 text-gray-900');
      return '#FBBF24';
    } else {
      console.log('Value:', value, 'Class:', 'bg-red-400 text-gray-900');
      return '#EF4444';
    }
  };

  const ColorTag = ({ value }) => {
    const colorClass = getColorClass(parseFloat(value));
    return (
      <Tag color={colorClass} style={{ color: '#fff' }}>
        {value}
      </Tag>
    );
  };
  const handleGo = (e) => {
    e.preventDefault();
    window.location.href = `/project/${project._id}`;
  };
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />

      <Container>
        <Content>
          <FormContainer enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div tw="mx-auto max-w-4xl">
              <br></br>
              <h2>Analytics</h2>

              <form action="#">
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="name-input" tw="text-primary-500">
                        Year
                      </Label>
                      <Input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </InputContainer>
                    <InputContainer></InputContainer>
                  </Column>
                  <Column>
                    <InputContainer tw="flex-1">
                      <Label htmlFor="name-input" tw="text-primary-500">
                        Pollution per tons
                      </Label>
                      <Input
                        type="number"
                        name="plastic_waste"
                        value={formData.plastic_waste}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <br></br>
                <hr tw=" text-gray-900"></hr>
                <br></br>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="name-input" tw="text-primary-500">
                        Population
                      </Label>
                      <Input
                        id="name-input"
                        type="number"
                        name="population"
                        value={formData.population}
                        onChange={handleInputChange}
                        required={true}
                      />
                      <br />
                      <br />
                      {/* <img src={calcul} width="20px" height="20px"/> */}
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="name-input" tw="text-primary-500">
                        precipitation
                      </Label>
                      <Input
                        id="name-input"
                        type="number"
                        name="precipitation"
                        value={formData.precipitation}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </InputContainer>
                    {prediction !== null && <ColorTag value={prediction} />}

                    <br></br>
                  </Column>
                </TwoColumn>
                <br></br>
                <hr tw=" text-gray-900"></hr>
                <br></br>

                <SubmitButton type="submit" value="Submit">
                  Submit
                </SubmitButton>
                <SubmitButton type="button" value="button" onClick={handleGo}>
                  Save And go Back
                </SubmitButton>
                <br></br>
              </form>
            </div>
            <br></br>
          </FormContainer>
        </Content>
      </Container>
    </>
  );
}
