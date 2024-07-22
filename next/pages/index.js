import axios from 'axios'
import login from '../styles/login.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '@/components/slices/userSlice'

axios.post('http://localhost:3000/api/').then((res) => console.log(res.data.msg))

export default function Home() {

  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const [student, setStudent] = useState({
    vtu: '',
    password: ''
  })

  const user = useSelector(state => state.user.vtu)

  useEffect(() => {
    user !== '' || undefined || '' ? router.replace('/home') : setLoading(false)
  }, [])

  const Login = async () => {
    if (student.vtu === '' || student.password === '')
      return alert('Enter Details')
    await axios.post('http://localhost:3000/api/login', student)
      .then((res) => {
        if (res.data.status === 400) return alert("Wrong Credentials")
        localStorage.setItem('name', JSON.stringify(res.data.name))
        localStorage.setItem('vtu', JSON.stringify(res.data.vtu))
        dispatch(signin({ vtu: student.vtu }))
        setLoading(false)
        router.replace('/home')
      })
  }

  return (
    <>
      {
        loading ?
          <div>LOADING</div>
          :
          (<div className={login.login_container}>
            <div className={login.login_box}>
              <input placeholder='VTU' className={login.input} onChange={(e) => setStudent((prev) => ({ ...prev, vtu: e.target.value }))} />
              <input type='password' placeholder='PASSWORD' className={login.input} onChange={(e) => setStudent((prev) => ({ ...prev, password: e.target.value }))} />
              <div className={login.submit} onClick={Login}>
                <p>LOGIN</p>
              </div>
            </div>
          </div>)
      }
    </>
  );
}