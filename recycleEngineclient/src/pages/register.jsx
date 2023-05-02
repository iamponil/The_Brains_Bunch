import React, { useRef, useState } from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import { Container as ContainerBase } from 'components/misc/Layouts';
import tw from 'twin.macro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../pages/button.css';

import 'react-phone-number-input/style.css';
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import styled from 'styled-components';
// import illustration from 'images/signup-illustration.svg';
import illustration from 'images/signup.png';
import logo from 'images/logo.png';
// import axios from 'axios';
import { ReactComponent as LoginIcon } from 'feather-icons/dist/icons/log-in.svg';
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const styles = {
  imageUpload: {
    position: 'relative',
    width: '100px',
    height: '100px',
    margin: '0 auto',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
};

// const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
// const SubmitButton = styled.button`
//   ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
//   .icon {
//     ${tw`w-6 h-6 -ml-2`}
//   }
//   .text {
//     ${tw`ml-3`}
//   }
// `;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw` w-full  bg-contain bg-center bg-no-repeat`}
`;

export default function Register({
  logoLinkUrl = '#',
  illustrationImageSrc = illustration,
  headingText = 'Sign Up to Recycle Engine',

  submitButtonText = 'Register',
  ResendButton = 'Resend Email',
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = '#',
  signupUrl = '#',
  signInUrl = '/login',
}) {
  // const phoneInputRef = useRef(null);
  const style = { display: 'block', margin: 'auto' };
  const [showSendButton, setShowSendButton] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    phone_number_country: '',
    image: null, // add a state variable for the image
  });
  const [msg, setMsg] = useState('');
  const [error, setErrors] = useState(null);

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;

    if (name === 'phone_number' && !isValidPhoneNumber(value)) {
      setErrors(
        <div style={{ color: 'red' }}>Please enter a valid phone number</div>
      );
    } else {
      setErrors(null);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

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
      const response = await fetch('http://localhost:5000/users/addUser1', {
        method: 'POST',
        body: formDataToSend, // send the FormData object as the request body
      });
      console.log(response);
      const { data: res } = await response.json();
      // if (response.status !== 200) {
      //   alert('Invalid Email Account');
      // } else {
      //   alert('verify your email account');
      // }
      if (response.status !== 200) {
        toast.error(' Email Already Exists');
      } else {
        toast.success('Verify Your Email Account');
      }
      setMsg(res.message);
      console.log(res.message);
    } catch (error) {
      setErrors(error?.response?.data?.msg);
    }
  }
  const handleSendClick = () => {
    setShowSendButton(false);
  };

  const handleResendClick = () => {
    setShowSendButton(true);
  };
  const defaultImage = require('../images/demo/150-1503945_transparent-user-png-default-user-image-png-png.png');
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <img style={style} src={logo} alt="logo" />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form enctype="multipart/form-data" onSubmit={handleSubmit}>
                  <div style={{ textAlign: 'center' }}>
                    <label>
                      <br />
                      Profile Picture:
                      <div className="image-upload">
                        <label htmlFor="file-input">
                          <img
                            src={
                              selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : defaultImage
                            }
                            alt="Profile"
                            className="profile-image"
                            style={styles.profileImage}
                          />
                        </label>

                        <Input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                      </div>
                    </label>
                  </div>
                  <br />
                  <label>
                    UserName :
                    <Input
                      type="text"
                      name="name"
                      placeholder=" User Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </label>
                  <label>
                    Email:
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      //  pattern="^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)@(esprit|gmail|outlook|hotmail|yahoo|microsoft|icloud|yandex|gmx|mail|aol|zoho|protonmail|googlemail)\.(tn|com|org|de|net|cn|uk|info|nl|eu|ru)$"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </label>
                  {error !== null ? (
                    <p tw="mt-6 text-xs text-red-600 text-center">
                      <span
                        tw="border-red-500"
                        style={{ fontSize: '15px', color: ' red' }}
                      >
                        {error}
                      </span>
                    </p>
                  ) : null}
                  <label>
                    Password :
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password *"
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={true}
                      minLength={8}
                    />
                    {formData.password.length > 0 &&
                      formData.password.length < 8 && (
                        <div style={{ color: 'red' }}>
                          Password must be at least 8 characters long
                        </div>
                      )}
                    {formData.password.length >= 8 &&
                      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                        formData.password
                      ) && (
                        <div style={{ color: 'red' }}>
                          Password must contain at least one letter and one
                          number
                        </div>
                      )}
                  </label>
                  <div className="form-group">
                    <label>
                      Confirm Password
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      {formData.confirmPassword !== formData.password ? (
                        <div style={{ color: 'red' }}>
                          Passwords do not match
                        </div>
                      ) : (
                        ''
                      )}
                    </label>
                  </div>
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
                            ? '2px solid red'
                            : 'none'
                          : 'null',
                      }}
                    />
                  </label>
                  {formData.phone_number ? (
                    !isPossiblePhoneNumber(formData.phone_number) &&
                    !isValidPhoneNumber(formData.phone_number) ? (
                      <div style={{ color: 'red' }}>
                        Please enter a valid phone number
                      </div>
                    ) : null
                  ) : null}

                  {error && <div>{error}</div>}
                  {msg && <div>{msg}</div>}
                  <br />
                  <br />
                  <div>
                    {showSendButton ? (
                      <button type="submit" onClick={handleSendClick}>
                        <div className="wrapper">
                          <i class="bi bi-send"></i>
                        </div>
                        <span className="text">{submitButtonText}</span>
                      </button>
                    ) : (
                      <button type="submit" onClick={handleResendClick}>
                        <div className="wrapper">
                          <i class="bi bi-send"></i>
                        </div>
                        <span className="text">Resend</span>
                      </button>
                    )}{' '}
                    <p tw="mt-8 text-sm text-gray-600">
                      Didn't receive an email?
                    </p>
                    <br />
                  </div>
                </Form>
              </FormContainer>
              <ToastContainer />
              <p tw="mt-8 text-sm text-gray-600 text-center">
                already have an account?{' '}
                <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                  login
                </a>
              </p>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
