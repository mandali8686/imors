import React, { useEffect, useState } from 'react';
import { getThisUser, login } from '../../api/auth';
import { createUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

const SIGNUP = 'SIGNUP';
const LOGIN = 'LOGIN';

const Auth = () => {

    const navigate = useNavigate();

    const labels = {
        LOGIN: {
            'title': "Login",
            'under-button-question': "Don't have an account?",
            'option': 'Signup'
        },
        SIGNUP: {
            'title': "Signup",
            'under-button-question': "Already have an account?",
            'option': 'Login'
        }
    }

    const [mode, setMode] = useState(LOGIN);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState(undefined);
    const [formatMessage, setFormatMessage] = useState(null);

    async function validateSession() {
        try {
            const response = await getThisUser();

            if (!response.hasOwnProperty('message')) {
                navigate("/");
            } else {
                setErrorMessage(response['message']);
            }
        } catch (error) {
            console.error('Error while validating session:', error);
            setErrorMessage('An error occurred while validating session.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) return;

        setLoading(true);
        setErrorMessage(undefined);

        validateSession();
    }, [navigate]);

    const handleAuth = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setErrorMessage(undefined);

        try {
            if (mode === SIGNUP) {
                const {message, error} = await createUser(email, password);
                if(message !== 'User added successfully') {
                    setFormatMessage(message);
                } else {
                    setFormatMessage(message);
                    switchMode();
                }
            } else {
                const {message, error} = await login(email, password);
                if(message !== 'Correct Details') {
                    setFormatMessage(message);
                } else {
                    setFormatMessage(null);
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage('An error occurred during authentication.');
        } finally {
            setLoading(false);
            validateSession();
        }
    }

    const switchMode = () => {
        if (loading) return;

        setMode(mode === SIGNUP ? LOGIN : SIGNUP);
        setErrorMessage(undefined);
    }

    return (
        <div id='auth'>
            {formatMessage && <ErrorMessage message={formatMessage} />}
            <form onSubmit={(e) => handleAuth(e)}>
                <img src='logo.png' alt="logo"></img>
                <h1>
                    {labels[mode]['title']}
                </h1>
                <input
                    type="email"
                    id="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {mode === SIGNUP &&
                    <input
                        type="text"
                        id="username"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                }
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='submit-button'>{labels[mode]['title']}</button>
                <div>
                    {labels[mode]['under-button-question']}
                    <button type='button' className='text-button' onClick={switchMode}> {loading ? <div className='spinner'></div> : labels[mode]['option']} </button>
                </div>
            </form>
        </div>
    );
};

function ErrorMessage({ message }) {
    // Determine the colors based on the message type
    const backgroundColor = message !== 'User added successfully' ? '#ffdddd' : '#ddffdd';
    const textColor = message !== 'User added successfully' ? '#D8000C' : '#006400';

    return (
      <div style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: backgroundColor, 
        color: textColor, 
        padding: '10px 0',
        textAlign: 'center',
        zIndex: 1000,
      }}>
        {message}
      </div>
    );
}

export default Auth;