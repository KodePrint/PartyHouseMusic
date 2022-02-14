import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../utils/api';

const Room = (props) => {
    
    const algo = () => {
        console.log(props)
     };
     algo();

    // Obtenemos el parametro
    const param = useParams();

    var theState = {
        guestCanPuese: "",
        votesToSkip: 2,
        isHost: ""
    };

    const [ state, setState] = useState(theState)
    
    const getData = async (e) => {
        const data = await getRoom(param.roomCode)
        console.log(data.votes_to_skip)
        return data
    }
    getData();


    return (
        <div className="">
            <h3>{param.roomCode}</h3>
            <p>Votes: {getData.data.votes_to_skip}</p>
            {/* <p>Guest Can Pause: {getData.data.guest_can_puese.toString()}</p> */}
            {/* <p>Host: {getData.data.is_host.toString()}</p> */}
        </div>
    );
}

Room.defaultProps = {
    porDefecto: "Algo XD"
}

export default Room;