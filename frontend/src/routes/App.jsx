import React, { useState } from 'react';
import HomePage from '../pages/HomePage';
import CreateRoomPage from '../pages/CreateRoomPage';
import RoomJoinPage from '../pages/RoomJoinPage';
import Room from '../pages/Room';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateRoom from '../pages/UpdateRoom';

const App = (props) => {
    
    //useState()
    const {name} = props
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route exact path="/create" element={<CreateRoomPage/>} />
                <Route path="/room/:roomCode" element={<Room/>} />
                <Route path="/update/:roomCode" element={<UpdateRoom/>} />
                <Route path="/join" element={<RoomJoinPage/>} />
                <Route path="*" element={<span>Ups... Page no found Error 404</span>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;