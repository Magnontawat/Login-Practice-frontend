import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); //เปลี่ยน URL โดยไม่ต้องกด Link
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [message,setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const resp = await fetch(`${API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                }
            )
              const data = await resp.json()
              console.log(data);
              
              setMessage(data.message)
              if(data.success){
                localStorage.setItem('token',data.token)
                navigate('/dashboard')
              }
        } catch (error) {
            console.log("เกิดข้อผิดพลาด", error.message)
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    return (
        <div className='flex justify-center min-h-screen items-center bg-amber-100'>
            <form onSubmit={handleSubmit} className='item-center flex justify-center flex-col gap-3 bg-white rounded-xl shadow-md p-8 w-full max-w-sm'>
                <p>Login</p>
                <input className='border rounded' name='email' value={form.email} onChange={handleChange} placeholder='email' />
                <input className='border rounded' name='password' value={form.password} onChange={handleChange} placeholder='password' />
                <button className='rounded bg-amber-300 px-4 py-2 cursor-pointer active:scale-97'> Login </button>
                <p className="text-red-500">{message}</p>
            </form>
        </div>
    )
}

export default Login