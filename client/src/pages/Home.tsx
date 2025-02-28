import { Button } from "antd";
import useAuth from "../hooks/useAuth";

export default function Home(){
    const {logout} = useAuth();
    const handelLogout = () => {
        logout();
    }
    return (
        <div>
            <h1>Home Page</h1>
            <Button type='primary' onClick={handelLogout}>Logout</Button>
        </div>
    )
    }