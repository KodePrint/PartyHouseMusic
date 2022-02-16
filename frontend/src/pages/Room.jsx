import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, leaveRoom } from '../utils/api';
import { Link, useNavigate, Route } from 'react-router-dom';
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import UpdateRoom from './UpdateRoom';


const Room = (props) => {

    const navigate = useNavigate()

    // Obtenemos el parametro
    const param = useParams();

    const [votes, setVotes] = useState('');
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [settings, setSettings] = useState(false)

    // Obtenemos los datos del ROOM
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

    // Salimos y eliminamos el room
    const leaveButtonPress = (e) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        leaveRoom(requestOptions)
    }
    
    // Actualiza el valor de updateSettings
    const updateSettings = () => {
        if (settings) {
            setSettings(false)
        } else {
            setSettings(true)
        }
    }

    // Renderisamos el botton Settings si es host
    const SettingsBtn = () => {
        return (
            <Grid item xs={12} align="center">
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={updateSettings}
                    >
                        Settings
                </Button>
            </Grid>
        );
    }

    // Renderizamos los campos para actualizar
    const RenderSettings = () => {
        return (
            <div className="center">
                Hola Mami
                <span>Room: {param.roomCode}</span>
            </div>
        )
    }

    if (settings) {
        return <UpdateRoom 
            roomCode={param.roomCode}
            lastVotes={votes}
            guestCanPause={canPause}
            settings={true}
        />
    }
    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align="center">
                <Typography variant='h4' component='h4'>
                    Room Code: {param.roomCode}
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
            { isHost ? (<SettingsBtn/>) : null}
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
    );
}

// Room.defaultProps = {
//     porDefecto: "Algo XD"
// }

export default Room;