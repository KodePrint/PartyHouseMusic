// Crear una nueva habitacion

const BASE_URL = 'http://127.0.0.1:8000/spotify/'

export const getCurrentSong = async () => {
    try {
        let url = `${BASE_URL}current-song`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err.message)
    }
}