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
import { Link, useLocation, useNavigate } from "react-router-dom"
import { createRoom, updateRoom } from '../utils/api';
import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

const CreateRoomPage = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    if (location.state === null) {
        location.state = {
            "lastVotes": 2,
            "lastCanPause": true,
            "update": false,
            "room": ""
        }
        console.log(location)
    }
    const update = location.state.update

    const [votes, setVotes] = useState(location.state.lastVotes)
    const [canPause, setCanPause] = useState(location.state.lastCanPause)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    // const [ canPause, setCanPause ] = useState(true)
    // const [ votes, setVotes ] = useState(2)

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

    const handleUpdateButtonPress = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votes,
                guest_can_pause: canPause,
                code: location.state.room
            }),
        };
        updateRoom(requestOptions)
            .then(resp => {
                if (resp.ok) {
                    setSuccessMsg('Room updated successfully!')
                } else {
                    setErrorMsg('Error updating room...!')
                }
            })
    }

    const RenderCreateButtons = () => {
        return (
            <Grid container spacing={1}>
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
        )
    }
    const RenderUpdateButtons = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleUpdateButtonPress}>
                        Update Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color='secondary'
                        variant='contained'
                        to={`/room/${location.state.room}`}
                        component={Link}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={1} className="center" alignItems='center' alignContent='center'>
                <div className="collapse">
                    <Collapse in={errorMsg != '' || successMsg != ''}>
                        { successMsg != '' 
                            ? (<Alert severity="success" onClose={()=>setSuccessMsg('')}>{successMsg}</Alert>) 
                            : (<Alert sverity="error" onClose={()=>setErrorMsg('')}>{errorMsg}</Alert>) 
                        }
                    </Collapse>
                </div>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {update ? `Update a Room ${location.state.room}` : 'Create A Room'}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText align="center" style={{textAlign:"center"}}>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue={location.state.lastCanPause.toString()}
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
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                    required={true}
                    type="number"
                    onChange={handleVotesChange}
                    defaultValue={votes}
                    inputProps={{
                        min: 1,
                        style: { textAlign: "center" },
                    }}
                    />
                    <FormHelperText>
                    <span align="center">Votes Required To Skip Song</span>
                    </FormHelperText>
                </FormControl>
            </Grid>
            { update 
                ? (<RenderUpdateButtons/>) 
                : (<RenderCreateButtons/>) 
            }
        </Grid>
    );
}

export default CreateRoomPage;