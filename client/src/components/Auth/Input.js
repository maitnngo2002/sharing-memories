import React from 'react'

import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({half, name, label, autoFocus, type, handleChange, handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                required 
                fullWidth 
                autoFocus={autoFocus} 
                type={type} 
                variant="outlined" 
                name={name} 
                label={label}
                handleChange={handleChange}
                InputProps={name === 'password' ? { 
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </InputAdornment>
                    )
                } : null}    
            />
        </Grid>
    )
}

export default Input;
