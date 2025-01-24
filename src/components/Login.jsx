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
  background: #1e272e;
`;

const LoginForm = styled.form`
  background: #2d3436;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  background: #1e272e;
  border: 1px solid #4a5568;
  border-radius: 4px;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: #00b894;
    outline: none;
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
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #00a884;
  }
`;

const ErrorMessage = styled.div`
  color: #fc8181;
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in a real app, this would be an API call
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
        <Title>Login to DoIt</Title>
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
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;