import { Link } from 'react-router-dom';
import { myContext } from '../Pages/Context';
import { useContext } from 'react';
import axios from 'axios';

export default function NavBar() {
    let ctx = useContext(myContext);

    const logout = () => {
        axios.get('http://localhost:5002/logout', {
            withCredentials: true
        }).then((res) => {
            console.log(res.data);

            if (res.data === 'Successfully logged out!') {
                window.location.href = '/';
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div className='NavContainer'>
        { ctx ?  (
            <>
                <Link onClick={ logout } to='/logout'>Logout</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin">Admin</Link>
            </>
        ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
            </>
        )}
        <Link to="/">Home</Link>
        </div>
    );
}