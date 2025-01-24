import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../store/slices/authSlice';
import { BiUser, BiLock } from 'react-icons/bi';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #2d3748);
  color: white;
`;

const LoginForm = styled.form`
  background: rgba(45, 52, 54, 0.85);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-family: 'Poppins', sans-serif;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  background: rgba(30, 39, 46, 0.8);
  border: 1px solid #4a5568;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #00b894;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 184, 148, 0.6);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #00b894;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background: #00a884;
    transform: scale(1.03);
  }
`;

const ErrorMessage = styled.div`
  color: #fc8181;
  text-align: center;
  margin-top: 1rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &:before,
  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #4a5568;
  }

  &:before {
    margin-right: 0.75rem;
  }

  &:after {
    margin-left: 0.75rem;
  }
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #a0aec0;
  font-size: 0.9rem;

  a {
    color: #00b894;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        dispatch(login({
          name: 'John Doe',
          email: credentials.email
        }));
      } else {
        setError('Invalid credentials. Try user@example.com / password');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Welcome to DoIt</Title>
        <InputGroup>
          <Icon>
            <BiUser size={20} />
          </Icon>
          <Input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <Icon>
            <BiLock size={20} />
          </Icon>
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </InputGroup>
        <LoginButton type="submit">Login</LoginButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Divider>or</Divider>
        <FooterText>
          Don't have an account? <a href="#">Sign up here</a>
        </FooterText>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
