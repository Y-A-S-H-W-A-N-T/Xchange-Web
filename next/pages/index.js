import axios from 'axios'
import login from '../styles/login.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '@/components/slices/userSlice'
import { CustomAlert } from  'alerts-react'

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
    setLoading(true)
    if (student.vtu === '' || student.password === '')
    { 
      CustomAlert({
        title: 'Enter Credentials',
        showCancelButton : false,
        type: 'information'
      })
      return setLoading(false)
    }
    await axios.post('http://localhost:3000/api/login', student)
      .then((res) => {
        if (res.data.status === 400)
        {  
          setLoading(false)
          return CustomAlert({
            title: 'Wrong Credentials',
            showCancelButton: false,
            cormfirmButtonTitle: 'try again',
            type: 'error'
          })
        }
        localStorage.setItem('name', JSON.stringify(res.data.name))
        localStorage.setItem('vtu', JSON.stringify(res.data.vtu))
        dispatch(signin({ vtu: student.vtu }))
        setLoading(false)
        router.replace('/home')
      })
      setLoading(false)
  }

  return (
    <>
      {user==='' && <div className={login.login_container}>
        <div className={login.login_box}>
          <input placeholder='VTU' className={login.input} onChange={(e) => setStudent((prev) => ({ ...prev, vtu: e.target.value }))} />
          <input type='password' placeholder='PASSWORD' className={login.input} onChange={(e) => setStudent((prev) => ({ ...prev, password: e.target.value }))} />
          <button disabled={loading} onClick={Login} className={login.submit} style={{backgroundColor: loading? 'grey': 'red'}}>{loading? 'lOADING...' : 'LOGIN'}</button>
        </div>
      </div>}
    </>
  );
}