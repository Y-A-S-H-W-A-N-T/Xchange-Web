import axios from 'axios'
import login from '../styles/login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

axios.post('http://localhost:3000/api/').then((res)=>console.log(res.data.msg))

export default function Home() {

  const router = useRouter();

  const [student,setStudent] = useState({
    "vtu": '',
    "password": ''
  })

  const Login = async()=>{
    if(student.vtu==='' || student.password==='')
      return alert('Enter Details')
    await axios.post('http://localhost:3000/api/login',student)
    .then((res)=>{
      if(res.data.status===400) return alert("Wrong Credentials")
        localStorage.setItem('name', JSON.stringify(res.data.name))
        localStorage.setItem('vtu', JSON.stringify(res.data.vtu))
        router.replace('/home')
    })
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
        </div>
    </div>
  );
}
