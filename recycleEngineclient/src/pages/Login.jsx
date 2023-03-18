import React, { useCallback, useState } from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage.jsx';
import { Container as ContainerBase } from 'components/misc/Layouts';
import tw from 'twin.macro';
import axios, { Axios } from 'axios';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { css } from 'styled-components/macro'; //eslint-disable-line
import illustration from 'images/login-illustration.svg';
import logo from 'images/logo.png';
import ReCAPTCHA from 'react-google-recaptcha';
import Google from 'images/google-icon.png';
import Github from 'images/github.png';
import Linkedin from 'images/linkedin.png';
import { ReactComponent as LoginIcon } from 'feather-icons/dist/icons/log-in.svg';
import { GoogleLoginButton } from 'react-social-login-buttons';
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
  logoLinkUrl = '/login',
  illustrationImageSrc = illustration,
  headingText = 'Sign In To RecycleEngine',

  submitButtonText = 'Sign In',
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = '/forgot-password',
  signupUrl = '/sign-up',
}) => {
  const style = { marginLeft: '120px' };
  const google = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const github = () => {
    window.open('http://localhost:5000/auth/github', '_self');
  };

  const linkedin = () => {
    window.open('http://localhost:5000/auth/linkedin', '_self');
  };
  const handleLoginFailure = (error) => {
    console.error(error);
  };
  const [isVerified, SetIsVerified] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVerified) {
      // submit the form
      console.log('Form submitted!');
      window.location.href = '/';
    } else {
      // show error message
      console.log('Please verify that you are a human.');
    }
  };
  const handleButtonClick = () => {
    if (!isVerified) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:5000/auth/sign-in', {
        email,
        password,
      });
      if (res.data.statusCode === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        const user = res.data.user;
        window.location.href = `/?data=${JSON.stringify(user)} `;
      }

      // Handle successful login
      console.log(res.data.accessToken); // Example: Log the access token received from server
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <img style={style} src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  <SocialButton onClick={google}>
                    <img src={Google} alt="" className="icon" />
                    <div className="text">Google</div>
                  </SocialButton>

                  <SocialButton onClick={github}>
                    <img src={Github} alt="" className="icon" />

                    <div className="text">Github</div>
                  </SocialButton>
                  <SocialButton onClick={linkedin}>
                    <img src={Linkedin} alt="" className="icon" />
                    <div className="text">Linkedin</div>
                  </SocialButton>
                </SocialButtonsContainer>

                <DividerTextContainer>
                  <DividerText>Or Sign in with your e-mail</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleLogin}>
                  <Input
                    type="email"
                    name="email"
                    pattern="^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)@(esprit|gmail|outlook|hotmail|yahoo|microsoft|icloud|yandex|gmx|mail|aol|zoho|protonmail|googlemail)\.(tn|com|org|de|net|cn|uk|info|nl|eu|ru)$"
                    id="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    placeholder="Password"
                    required
                  />
                  <br></br>
                  <br></br>

                  <ReCAPTCHA
                    sitekey="6Ldgs7skAAAAAAWE6w231uQ3-0m73VDg4SQC6QAB"
                    onChange={() => {
                      // Set the isVerified state to true if the value is not null or undefined.
                      SetIsVerified(true);
                    }}
                  />

                  <SubmitButton type="submit" onClick={handleButtonClick}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>

                  {isVerified && (
                    <Alert variant="success" dismissible>
                      Captcha passed!
                    </Alert>
                  )}
                  {showAlert && (
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() => setShowAlert(false)}
                    >
                      Please verify that you are a human.
                    </Alert>
                  )}
                </Form>

                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{' '}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </a>
                </p>
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
