const BASE_URL = 'http://127.0.0.1:8000/api/'

export const getRoom = async (code) => {
    try { 
        let url = `${BASE_URL}get-room?code=${code}`
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch(err) {
        console.log(err.message)
    }
}