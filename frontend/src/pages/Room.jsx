import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, leaveRoom } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Grid, Typography, CircularProgress } from '@material-ui/core';
import { getCurrentSong } from '../utils/spotify';
import MusicPlayer from '../components/MusicPlayer';
import { css } from '@emotion/react';


const Room = (props) => {

    const override = css `
        display: block;
        margin: 0 auto;
        border-color: red;
    `

    const navigate = useNavigate()

    // Obtenemos el parametro
    const param = useParams();

    const [votes, setVotes] = useState('');
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [spotifyAuth, setSpotifyAuth] = useState(false);
    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(true);

    // Obtenemos los datos del ROOM
    useEffect(() => {
        getRoom(param.roomCode)
        .then(res => {
            if (res["Room Not Found"]) {
                navigate('/', {
                    state: {
                        room: "Not found",
                        state: false
                        }
                    }
                )
            } else {
                setVotes(res.votes_to_skip);
                setCanPause(res.guest_can_pause);
                setIsHost(res.is_host);
                if (res.is_host) {
                    authenticateSpotify()
                }
            }
        })
        // getSong()
        componentDidMount()
    }, [])

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then(response => response.json())
            .then(data => {
                setSpotifyAuth(data.status)
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then(res => res.json())
                        .then(data => {
                            window.location.replace(data.url)
                        })
                }
            })
    }

    // Salimos y eliminamos el room
    const leaveButtonPress = (e) => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        leaveRoom(requestOptions)
    }
    
    // Llamamos a la funcion de settings
    const updateSettings = () => {
        return navigate(
            `/create`, {
                state: {
                    lastVotes:votes,
                    lastCanPause: canPause,
                    update:true,
                    room: param.roomCode
                }
            }
        )
    }

    const getSong = () => {
        getCurrentSong()
            .then(data => {
                if (!data.playing) {
                    setPlaying(false)
                }
                if (data.is_playing) {
                    setSong(data)
                    setPlaying(true)
                }
                setLoading(false)
            })
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

    const componentDidMount = () => {
        const interval = setInterval(
            () => {
                getSong()
            }, 1000
        )
    }

    const PlaySpotifyLink = () => {
        return (
            <Card>
                <div className="spotify_content">
                    <Typography component="h6" variant="h6">
                        Play a song in Spotify
                    </Typography>
                    <a href='https://open.spotify.com/' target="_blank">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/174/174872.png" 
                            alt="Spotify"
                            className='spotify_img' 
                        />
                    </a>
                </div>
            </Card>
        )
    }

    // Retorna el los datos del ROOM
    return (
        <Grid container spacing={1} className="center" justifyContent='center'>
            <Grid item xs={12} align="center">
                <Typography variant='h4' component='h4'>
                    Room Code: {param.roomCode}
                </Typography>
            </Grid>
            {loading 
            ? (<CircularProgress />) 
            : ( !playing 
                ? (<PlaySpotifyLink/>)
                :(<MusicPlayer {...song}/>)) }
            {/* <Grid item xs={12} align="center">
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
            </Grid> */}
            
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