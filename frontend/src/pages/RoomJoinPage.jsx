import { TextField, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { joinRoom } from '../utils/api';

const RoomJoinPage = () => {

    const [ roomCode, setRoomCode ] = useState('')
    const [textError, setTextError] = useState('') 

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value)
    }

    const handleEnterRoomPress = () => {
        if (roomCode <= 0) {
            setTextError('The code must not be empty ')
        }
        const requestOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        };
        joinRoom(requestOption, roomCode, setTextError)
    }

    return (
        <Grid container spacing={1} alignItems="center" className="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={textError.length > 0 ? true : false}
                    label="Code"
                    placeholder="Enter a Room Code"
                    //value={roomCode}
                    helperText={textError}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleEnterRoomPress}>
                        Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                    variant='contained' 
                    color='secondary' 
                    to="/"
                    component={Link} >
                        Back
                </Button>
            </Grid>
        </Grid>
    );
}

export default RoomJoinPage;