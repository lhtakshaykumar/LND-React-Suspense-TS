import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import  { useState } from 'react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <Container>
      <FormWrapper>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('http://localhost:5000/api/signup', values);
              if (response.status === 201) {
                navigate('/dashboard');
              }
            } catch (error: any) {
              if (error.response && error.response.data) {
                setError(error.response.data.message);
              } else {
                setError('An unexpected error occurred');
              }
            }
            setSubmitting(false);
          }}
        >
         <StyledForm>
            <Label htmlFor="email">Email</Label>
            <StyledField name="email" type="email" />
            <StyledErrorMessage name="email" component="div" />

            <Label htmlFor="password">Password</Label>
            <StyledField name="password" type="password" />
            <StyledErrorMessage name="password" component="div" />

            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <StyledField name="confirmPassword" type="password" />
            <StyledErrorMessage name="confirmPassword" component="div" />

            {error && <ErrorText>{error}</ErrorText>}
            <StyledButton type="submit">Sign Up</StyledButton>
          </StyledForm>
        </Formik>
      </FormWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;
const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  text-align: left;
`;

const StyledField = styled(Field)`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;
