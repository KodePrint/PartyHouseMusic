import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, leaveRoom } from '../utils/api';
import { Link, Navigate, Route } from 'react-router-dom';
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core';


const Room = (props) => {

    // Obtenemos el parametro
    const param = useParams();

    const [votes, setVotes] = useState('');
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        getRoom(param.roomCode)
        .then(res => {
            if (res["Room Not Found"]) {
                return window.location.href = '/'
            } else {
                setVotes(res.votes_to_skip);
                setCanPause(res.guest_can_pause);
                setIsHost(res.is_host);
            }
        })
    }, [])

    const leaveButtonPress = (e) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        leaveRoom(requestOptions)
    }

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align="center">
                <Typography variant='h4' component='h4'>
                    Code: {param.roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant='h6' component='h6'>
                    Votes: {votes}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant='h6' component='h6'>
                    Guest Can Pause: {canPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant='h6' component='h6'>
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                    variant='contained' 
                    color='secondary' 
                    to='/'
                    onClick={leaveButtonPress}
                    >
                        Leave Room
                </Button>
            </Grid>
        </Grid>
        // <div className="center">
        //     <h3>{param.roomCode}</h3>
        //     <p>Votes: {votes}</p>
        //     <p>Guest Can Pause: {canPause.toString()}</p>
        //     <p>Host: {isHost.toString()}</p>
        // </div>
    );
}

// Room.defaultProps = {
//     porDefecto: "Algo XD"
// }

export default Room;