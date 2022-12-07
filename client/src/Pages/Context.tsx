import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>();
    
    useEffect(() => {
        axios.get('http://localhost:5002/user', { withCredentials: true })
             .then((res: AxiosResponse) => {
                setUser(res.data);
                //console.log('user retrieved:', res.data);
             }).catch((err) => {
                console.log(err);
             })
    }, []);

    return (
        <myContext.Provider value={user!}>{props.children}</myContext.Provider>
    )
}