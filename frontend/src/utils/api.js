import React from 'react'
// import {  } from 'react-router-dom';


const BASE_URL = 'http://127.0.0.1:8000/api/'

// Crear una nueva habitacion
export const createRoom = async (body) => {
    try {
        let url = `${BASE_URL}create-room`
        await fetch(url, body)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                //return navigate(`/room/${data.code}`)
                return window.location.href = `/room/${data.code}`
            })
    } catch(err) {
        console.error(err.message)
    }
}

// Actualizar una nueva habitacion
export const updateRoom = (body) => {
    try {
        let url = `${BASE_URL}update-room`
        const response = fetch(url, body)
        return response
    } catch(err) {
        console.error(err.message)
    }
}


// Obtener informacion de la habitacion
export const getRoom = async (code) => {
    try { 
        let url = `${BASE_URL}get-room?code=${code}`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err.message)
    }
}

// Unirse a una habitacion
export const joinRoom = async(body, roomCode, error) => {
    try{
        let url = `${BASE_URL}join-room`
        await fetch(url, body)
            .then((response) => {
                if (response.ok) {
                    return window.location.href = `/room/${roomCode}`
                } else {
                    error('Room not found..!')
                }
            })
    } catch(err) {
        console.error(err.message)
    }
}

// User in Room 
export const userInRoom = async (code) => {
    try {
        let url = `${BASE_URL}user-in-room`
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.code === null ? console.log(data) : window.location.href =`/room/${data.code}`
            })
    } catch(err) {
        console.error(err.message)
    }
}

// Leave Room
export const leaveRoom = async(body) => {
    try {
        let url = `${BASE_URL}leave-room`
        await fetch(url, body)
            .then((response) => {
                return window.location.href =`/`
            })
    } catch(err) {
        console.error(err.message)
    }
}