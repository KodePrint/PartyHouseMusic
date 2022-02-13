import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../utils/api';

const Room = (props) => {
    

    // Obtenemos el parametro
    const param = useParams();

    const theState = {
        guestCanPuese: "",
        votesToSkip: 2,
        isHost: ""
    };

    const [ state, setState] = useState(theState)
    
    const getData = async (e) => {
        const data = await getRoom(param.roomCode)
        setState({
            guestCanPuese: data.guest_can_pause,
            votesToSkip: data.votes_to_skip,
            isHost: data.is_host,
        });
    }

    return (
        <div className="">
            <h3>{param.roomCode}</h3>
            <p>Votes: {state.votesToSkip}</p>
            <p>Guest Can Pause: {state.guestCanPuese.toString()}</p>
            <p>Host: {state.isHost.toString()}</p>
        </div>
    );
}

export default Room;