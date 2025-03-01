import { Button } from "antd";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Cookies from 'js-cookie';

export default function Home(){
    const {logout} = useAuth();
    const handelLogout = () => {
        logout();
    }

    // 토큰 확인을 위한 테스트 요청
    const testRequest = async() => {
        const token = Cookies.get('Token');

        const response = await fetch('http://localhost:5000',{
             method: 'GET',
             headers: {
                 'Authorization': `Bearer ${token}`}
         })

         if(response.status === 200){
                const data = await response.json();
                console.log(data)
         }

    }

    useEffect(() => {
        testRequest()
    },[])
    
    return (
        <div>
            <h1>Home Page</h1>
            <Button type='primary' onClick={handelLogout}>Logout</Button>
        </div>
    )
    }