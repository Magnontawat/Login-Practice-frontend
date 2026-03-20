import { useState } from "react"

function register() {
  const [message,setMessage] = useState("")
  const [status,setStatus] = useState(null)
  const [form,setForm] = useState({
    display_name:"",
    email:"",
    username:"",
    password:""
  });

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const resp = await fetch('http://localhost:3000/api/auth/register',
        {method:'POST',
         headers: {'Content-Type':'application/json'},
         body:JSON.stringify(form)
        }
      ) 
      const data = await resp.json()
      console.log(data)
      setMessage(data.message)
      setStatus(data.success)
    }catch(error){
      console.log(error,"fetch error");
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่")
      setStatus(false)
    }

    //reset เมื่อกดส่ง submit
    setForm({
    display_name:"",
    email:"",
    username:"",
    password:""
  })
  }
  const handleChange=(e)=>{
    setForm({...form,[e.target.name] : e.target.value})
  }
  return (
   <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <form className="item-center flex flex-col gap-3 bg-white rounded-xl shadow-md p-8 w-full max-w-sm" onSubmit={handleSubmit} >
        <h1>Register</h1>
        <input className="border" name="display_name" value={form.display_name} onChange={handleChange} placeholder="display name"/>
        <input className="border" name="email" value={form.email} onChange={handleChange} placeholder="email"/>
        <input className="border" name="username" value={form.username} onChange={handleChange} placeholder="username"/>
        <input className="border" name="password" value={form.password} onChange={handleChange} placeholder="password"/>
        <button className="cursor-pointer active:scale-97 bg-blue-500 text-white px-4 py-2 rounded "type="submit">สมัครสมาชิก</button>
      <p className={status ? "text-green-500" : "text-red-500"}>{message}</p>
      </form>
   </div>   
  )
}

export default register