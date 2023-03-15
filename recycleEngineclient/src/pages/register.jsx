import React, { useState } from 'react';
import axios from 'axios';
import AnimationRevealPage from 'helpers/AnimationRevealPage.jsx';
import { Container as ContainerBase } from 'components/misc/Layouts';
import tw from 'twin.macro';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import illustration from 'images/login-illustration.svg';
import logo from 'images/logo.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import googleIconImageSrc from 'images/google-icon.png';
import GitHubIconImageSrc from 'images/github.png';
import FacebookIconImageSrc from 'images/facebook.png';
import { ReactComponent as LoginIcon } from 'feather-icons/dist/icons/log-in.svg';
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
//const [isVerified, SetIsVerified] = useState(false);
const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = '#',
  illustrationImageSrc = illustration,
  headingText = 'Register to Recycle Engine',

  submitButtonText = 'Register',
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = '#',
  signupUrl = '#',
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    image: null, // add a state variable for the image
  });

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, phone_number } = formData;
    const formDataToSend = new FormData(); // create a new FormData object
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('phone_number', phone_number);
    formDataToSend.append('image', selectedFile); // add the image to the FormData object
    console.log(selectedFile);
    try {
      const response = await fetch('http://localhost:5000/users/addUser', {
        method: 'POST',
        body: formDataToSend, // send the FormData object as the request body
      });
      const data = await response.json();
      window.location = '/login';
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form enctype="multipart/form-data" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="name"
                    placeholder=" User Name "
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="Number"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />

                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
