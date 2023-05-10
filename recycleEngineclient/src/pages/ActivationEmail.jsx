import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ActivationEmail() {
  const navigate = useNavigate();
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            'http://localhost:5000/users/activation',
            { activation_token }
          );
          setSuccess(res.data.msg);
          navigate('/login');
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate]);

  return <p>Account Activated successfully</p>;
}

export default ActivationEmail;