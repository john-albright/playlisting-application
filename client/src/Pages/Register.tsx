import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const register = () => {
        axios.post('http://localhost:5002/register', {
            'username': username,
            'password': password
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data);

            if (res.data === "Success") {
                window.location.href = '/';
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    /*
    const getUser = () => {
        axios.get('/user', {
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
        });
    };*/

    return(
        <div>
            <h1>Register</h1>
            <input type='text' placeholder='username' onChange={ e => setUsername(e.target.value) } />
            <input type='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
            <button onClick={ register }>Register</button>
            {/* <button onClick={ getUser }>Get User</button> */}
        </div>
    );
}