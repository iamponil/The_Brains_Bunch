import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import EmailVerificationNotification from '../notification/emailVerificationNotification';

const TwoColumn = styled.div``;

const Column = styled.div``;
const InputContainer = tw.div`relative py-5`;

const Label = tw.label`font-semibold text-sm`;

const Input = tw.input`
  w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 
  py-2 text-gray-100 focus:border-pink-400 focus:outline-none transition duration-200
`;
const Content = tw.div`max-w-screen-2xl mx-auto py-20 lg:py-24`;
const TogglePasswordFields = styled.div`
  ${tw`text-sm mt-2 cursor-pointer hover:underline`};
`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg `}
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

const columnStyle = { display: 'contents' };
const buttonStyle = { display: 'revert' };
const SubmitButton = tw.button`
  w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide 
  shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline 
  hover:bg-gray-300 hover:text-primary-700 focus:-translate-y-px text-center focus:shadow-xl
`;

export default () => {
  const [updatedEmail, setUpdatedEmail] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [msg, setMsg] = useState('');
  const [error, setErrors] = useState(null);
  const [showError, setShowError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false); // state variable to keep track of whether to show password fields or not
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userMainAddress, setUserMainAddress] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false); // initialize state variable to false
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          setUserMainAddress({
            email: user.email,
          });
          setFormData({
            email: user.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, currentPassword, newPassword, confirmPassword } = formData;
    const formDataToSend = {
      currentPassword,
      newPassword,
      confirmPassword,
      email,
    };
    console.log(formDataToSend);
    if (email !== userMainAddress.email) {
      formDataToSend.append('email', email);
    }

    try {
      if (email !== userMainAddress.email && email !== null) {
        const response = await fetch('http://localhost:5000/users/updateUser', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formDataToSend,
        });
        const { data: res } = await response.json();
        console.log(res);
      }
      if (currentPassword && newPassword && confirmPassword) {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        const response = await axios.post(
          'http://localhost:5000/users/updateUserPassword',
          formDataToSend,
          { headers }
        );
        const { data: res } = await response.json();
        console.log(res.message);
        setShowSuccessMsg(true);
      }
    } catch (error) {
      setErrors(error?.response?.data?.msg);
      setShowError(true);
    }
  };
  return (
    <div>
      {updatedEmail && <EmailVerificationNotification />}

      <Content>
        <FormContainer enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div tw="mx-auto max-w-4xl">
            <h2>Edit Credentials</h2>
            <form>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="email-input">Email</Label>
                    <Input
                      id="email-input"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </InputContainer>
                  <div>
                    {showPasswordFields && (
                      <>
                        <InputContainer>
                          <Label htmlFor="current-password-input">
                            Current Password
                          </Label>
                          <Input
                            id="current-password-input"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            required={true}
                          />
                        </InputContainer>
                        <InputContainer>
                          <Label htmlFor="new-password-input">
                            New Password
                          </Label>
                          <Input
                            id="new-password-input"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            required={true}
                          />
                        </InputContainer>
                        <InputContainer>
                          <Label htmlFor="confirm-password-input">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirm-password-input"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required={true}
                          />
                        </InputContainer>
                      </>
                    )}
                  </div>
                  <SubmitButton
                    style={buttonStyle}
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </SubmitButton>
                  {showSuccessMsg && (
                    <p style={{ color: 'green', textAlign: 'center' }}>
                      Update successful!
                    </p>
                  )}
                </Column>
                <Column>
                  <TogglePasswordFields
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                  >
                    {showPasswordFields
                      ? 'Hide Password Fields'
                      : 'Show Password Fields'}
                  </TogglePasswordFields>
                </Column>
              </TwoColumn>
            </form>
          </div>
        </FormContainer>
      </Content>
    </div>
  );
};
