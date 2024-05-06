import axios from 'axios'
import login from '../styles/login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  const [student,setStudent] = useState({
    vtu: '',
    password: ''
  })

  const Login = async()=>{
    if(student.vtu==='' || student.password==='')
        return alert('Enter Details')
    await axios.post('http://localhost:8000/login',student)
    .then((res)=>{
      if(res.data.message==='login_error') return
      localStorage.setItem('name', JSON.stringify(res.data.name))
      localStorage.setItem('vtu', JSON.stringify(res.data.vtu))
      router.replace('/home')
    })
  }

  const Check = async()=>{
    const data = await fetch('http://localhost:3000/',{
      headers: {
        Accept: "application/json",
        method: "GET"
      }
    })
    console.log("DATA -> ",data.json())
  }

  return (
    <div>
        <div className={login.login_container}>
            <div className={login.login_box}>
                <input placeholder='VTU' className={login.input} onChange={(e)=>setStudent((prev)=>({...prev,vtu: e.target.value}))}/>
                <input placeholder='PASSWORD' className={login.input} onChange={(e)=>setStudent((prev)=>({...prev,password: e.target.value}))}/>
                <div className={login.submit}>
                  <p onClick={Login}>LOGIN</p>
                </div>
            </div>
            <div onClick={Check}>
              TRY NEXT BACKEND RESPONSE
            </div>
        </div>
    </div>
  );
}
