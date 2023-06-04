import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function DefaultPage() {
    const navigate = useNavigate();
    useEffect(()=>{
       setTimeout(()=>{
            navigate('/home')
       }, 3000); 
    },[])
    return ( <>
        <h1>DefaultPage</h1>
    </> );
}

export default DefaultPage;