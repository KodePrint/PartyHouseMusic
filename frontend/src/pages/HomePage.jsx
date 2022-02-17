import React from 'react';
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { userInRoom } from '../utils/api';


const HomePage = (props) => {
    
    const location = useLocation()
    const navigate = useNavigate()
    
    const [roomCode, setRoomCOde ] = useState("")

    useEffect(()=> {
        userInRoom()
            .then(res => {
                if (res.code) {
                    navigate(`/room/${res.code}`)
                }
            })
        userInRoom()
    },[])

    return (
        <Grid container spacing={3} className="center">
            <Grid item xs={12} align="center">
                <Typography variant='h3' compact='h3'>
                    <span>
                        🎶
                    </span>
                    <span>
                        🔉
                    </span> 
                        House Music Party 
                    <span>🎉</span>
                    <span>🎈</span>
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup 
                    disableElevation 
                    variant='contained'
                    color='primary'
                >
                    <Button 
                        color='primary' 
                        to='/join' 
                        component={Link}>
                        Join a Room
                    </Button>
                    <Button 
                        color='secondary' 
                        to='/create' 
                        component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} align="center"></Grid>
        </Grid>
    );
}

export default HomePage;