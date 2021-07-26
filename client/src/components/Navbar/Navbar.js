import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.jpg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    
    // get the user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        dispatch({type: LOGOUT });

        history.push('/');
        setUser(null);

    }
    const location = useLocation();
    useEffect(() => {
        const token = user?.token;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.username} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button onClick={logOut} variant="contained" className={classes.logout} color="secondary">Sign out</Button>
                    </div>
                ) : <Button component={Link} to="./auth" variant="contained" color="primary">Sign in</Button>}
            </Toolbar>
      </AppBar>
    )
}

export default Navbar;