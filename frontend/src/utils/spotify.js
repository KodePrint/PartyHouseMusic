// Crear una nueva habitacion

const BASE_URL = 'http://127.0.0.1:8000/spotify/'

export const getCurrentSong = async () => {
    try {
        let url = `${BASE_URL}current-song`
        const response = await fetch(url);
        if (response.status === 204) {
            return {'playing': false}
        }
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err.message)
    }
}

export const nextSong = async(body) => {
    try {
        let url = `${BASE_URL}skip`;
        console.log(url)
        fetch(url, body)
    } catch(err) {
        console.error(err.message)
    }
}