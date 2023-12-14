
import { useEffect, useState } from "react";

interface SendRequestProps {
    className?: string;
}




export const SendRequest = ({ className }: SendRequestProps) => {

    const [localSerResp, setLocalSerResp] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/users/2', { method: 'GET' })
            .then(res => res.json())
            // .then(json => console.log((json)))
            .then(json => {
                setLocalSerResp(json)
                console.log('json: ', json)
            })
    },[])
    console.log('localSerResp: ',localSerResp)

    return (
        <div>
            {/* {localSerResp.name} */}
        </div>
    );
};