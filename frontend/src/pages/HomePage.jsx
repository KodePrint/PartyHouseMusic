import React from 'react';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const HomePage = (props) => {
    console.log(props)
    return (
        <p>This the Home Page</p>
    );
}

export default HomePage;