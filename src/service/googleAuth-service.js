import {parseJwt} from "../../test/util.js";

const handleGoogleCallback = async (code) => {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/google/callback',
            grant_type: 'authorization_code',
        }),
    })

    const data = await response.json()
    console.log(data)
    const id_token = data.id_token
    const decoded = parseJwt(id_token)
    console.log(decoded)
    const { email, name, picture } = decoded

    return { email, name, picture }
}

export default {
    handleGoogleCallback
}