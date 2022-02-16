import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link, useParams } from "react-router-dom"
import { createRoom, getRoom } from '../utils/api';
import { param, votes, canPause } from './Room';

const UpdateRoom = (props) => {
    const {roomCode} = props;
    const {guestCanPause} = props;
    const {lastVotes} = props; 
    const {settings} = props; 

    console.log(props)

    const handleGuestCanPaueseChange = (e) => {
        setCanPause(e.target.value)
    }

    const handleVotesChange = (e) => {
        setVotes(e.target.value)
    }

    const handleRoomButtonPress = (e) => {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votes,
                guest_can_pause: canPause
            }),
        };
        createRoom(requestOptions)
    }
    
    return (
        <div className="center">
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {`Update A Room ${roomCode}`}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText align="center" style={{textAlign:"center"}}>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue={guestCanPause.toString()}
                        onChange={handleGuestCanPaueseChange}>
                        <FormControlLabel value="true" 
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom" 
                        />
                        
                        <FormControlLabel value="false" 
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom" 
                        />
                                
                    </RadioGroup>
                </FormControl>
                <Grid item xs={12} align="center" >
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            onChange={handleVotesChange}
                            defaultValue={lastVotes}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        />
                        <FormHelperText style={{textAlign:"center"}}>
                            <span align="center" style={{textAlign:"center"}}>Votes Required To Skip Song</span>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleRoomButtonPress}>
                        Save
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        to={`/room/${roomCode}`}
                        component={Link}
                        >
                        
                        Close
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdateRoom;