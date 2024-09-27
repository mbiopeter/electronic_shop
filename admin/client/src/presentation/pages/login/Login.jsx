import React, { useState } from 'react';
import './Login.css';
import login from '../../../Assets/login.jpg';
import { ArrowForward, VisibilityIcon, VisibilityOffIcon } from '../../../logical/consts/icons';
import { handleUserLogin } from '../../../logical/users/Users';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate(); 

    const handleInputOnchange = (key, value) => {
        setUserCredentials(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const userLogin = async () => {
        try {
            const response = await handleUserLogin(userCredentials,rememberMe);
            console.log(response);
            toast.success(response.message);
            navigate('/');
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <>
            <div className='login'>
                <div className="loginContainer">
                    <div className="loginImageContainer">
                        <img src={login} alt="none" />
                    </div>
                    <div className="loginFormContainer">
                        <span className="loginHeader">Login</span>
                        <div className="LoginInputController">
                            <span>Username</span>
                            <input 
                                type="text" 
                                placeholder='Name' 
                                onChange={(e) => handleInputOnchange('username', e.target.value)} 
                            />
                        </div>
                        <div className="LoginInputController">
                            <span>Password</span>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='********' 
                                onChange={(e) => handleInputOnchange('password', e.target.value)} 
                            />
                            <VisibilityOffIcon style={showPassword ? {display:'none'} : {display:'block'}} className="showPass" onClick={() => setShowPassword(!showPassword)} />
                            <VisibilityIcon style={!showPassword ? {display:'none'} : {display:'block'}} className="showPass" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className="loginRemeberance">
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <span>Remember me</span>
                        </div>
                        <div className="loginButtons">
                            <button className="btn-primary" onClick={userLogin}>
                                Login
                            </button>
                            <button className="btn-secondary">
                                Forgotten password <ArrowForward fontSize='small' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
