import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        const fetchFN = async () => {
            try {
                const resp = await fetch('http://localhost:3000/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await resp.json();
                console.log(data.data);
                setUser(data.data)
            } catch (error) {
                console.log("เกิดข้อผิดพลาด", error.message)
            }
        }
        fetchFN();
    }, [])

    if(!user){
        return <p>is Loading..</p>
    }
    
    return (
        <div>
        {user && <p>ยินดีต้อนรับ, {user.display_name}!</p>}
        <p>ข้อมูลของคุณคือ</p>
        <p>ID : {user.id}</p>
        <p>email : {user.email}</p>
        <p>display_name : {user.display_name}</p>
        </div>
    )
}
export default Dashboard