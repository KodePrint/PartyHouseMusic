import React, { PureComponent } from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nextSong } from '../utils/spotify';

const MusicPlayer = (props) => {

    const sonProgress = (props.time / props.duration) * 100;

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        };
        nextSong(requestOptions)
    }
    

    return (
        <Card className='musicPlayer'>
            <Grid container alignItems='center'>
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%"/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div className="">
                        <IconButton>
                            {props.is_playing 
                                ? (<PauseCircleOutlineIcon/>) 
                                : (<PlayCircleOutlineIcon/>)}
                        </IconButton>
                        <IconButton
                            onClick={skipSong}
                        >
                            <SkipNextIcon/>
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant='determinate' value={sonProgress}/>
        </Card>
    );
}

export default MusicPlayer;