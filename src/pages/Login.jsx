import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from "../Firebase";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            window.location.reload();
            navigate('/interpreter', { replace: true });
        }
    }, [loggedIn, navigate]);

    const handleSignInWithGoogle = async () => {
        try {

            await signInWithGoogle();
            Cookies.set('authenticated', 'true', { expires: 1 });
            setLoggedIn(true); 
            navigate('/interpreter', { state: { loggedIn: true } });
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <LoginPageContainer>
            <LoginButton onClick={handleSignInWithGoogle}>
                Sign in with Google
            </LoginButton>
        </LoginPageContainer>
    );
};

export default Login;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
`;
