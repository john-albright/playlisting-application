import { useContext, useState, useEffect } from "react"
import { myContext } from './Context';
import { UserInterface } from '../Interfaces/UserInterface';

export default function HomePage() {
    
    const ctx = useContext(myContext);
    const [data, setData] = useState<UserInterface>();


    useEffect(() => {
        setData(ctx);
    }, [ctx]);

    return(
        <>
            <h1>HomePage</h1>
            { data ? (
                <p>Welcome, {data.username}!</p>
             ) : (
                <p>Let's get started!</p>
             )
            }
            
        </>
    );
}