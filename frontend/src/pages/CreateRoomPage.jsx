import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from "react-router-dom"
import { createRoom } from '../utils/api';


const CreateRoomPage = (props) => {
    
    const [ canPause, setCanPause ] = useState(true)
    const [ votes, setVotes ] = useState(2)

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
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText align="center" style={{textAlign:"center"}}>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue="true"
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
                            defaultValue={2}
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
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color='secondary'
                        variant='contained'
                        to="/"
                        component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CreateRoomPage;