import Cookies from 'js-cookie';

interface User {
    username: string,
    password: string,
}

export const loginUser = async (user:User) => {
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return response.json()
}

export const isTokenValid = () => {
    const token = Cookies.get('Token')
    if(!token)return false
    return true
}