import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = () => {
        axios.post('http://localhost:5002/login', {
            username,
            password
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data);

            if (res.data === 'Successfully authenticated!') {
                window.location.href = '/';
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    /*
    const getUser = () => {
        axios.get('http://localhost:5002/user', {
            withCredentials: true
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };*/

    return(
        <div>
            <h1>Login</h1>
                <input type='text' placeholder='username' onChange={ e => setUsername(e.target.value) } />
                <input type='password' placeholder='password' onChange={ e => setPassword(e.target.value) } />
                <input type='submit' onClick={login} value='Login' />
            {/**<button onClick={getUser}>Get User</button>*/}
        </div>
    );
}