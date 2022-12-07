import { useEffect, useContext } from 'react';
import { myContext } from '../Pages/Context';

export default function Logout() {
    let ctx = useContext(myContext);

    useEffect(() => {
        console.log(ctx);
        //ctx.current = null; 
        if (!ctx) {
            window.location.href = '/';
        }
    }, [ctx]);

    return (
        <>
            <h1>Logout</h1>
            <p>You have successfully logged out.</p>
        </>

    );
}