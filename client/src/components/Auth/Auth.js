import React, {useState} from 'react'

import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleLogin from 'react-google-login';
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
const Auth = () => {
    const classes = useStyles();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => (!prevShowPassword));
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj; // we don't get an error if res doesn't exist -> we will get 'undefined'
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: { result, token }});
            history.push('/'); // redirect to the homepage once we log in

        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log("Had an error with signing in with Google. Try again later!");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper classes={classes.paper} elevation={3}>
                <div align="center">
                    <Avatar classes={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant="h5">{isSignUp ? " Sign Up" : "Sign In"}</Typography>
                </div>


                <form classes={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShow={handleShowPassword} />
                    
                        { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="872640042006-ukg9g49m01nhbksa2jmmvhl1n40a9e5r.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account yet? Sign up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
