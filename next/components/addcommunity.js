import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/modal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addCommunity, fetchCommunities, resetAddStatus } from "./slices/communitySlice"
import { CustomAlert } from  'alerts-react'

export default function AddCommunity({ setCreate }) {

  const dispatch = useDispatch()
  const { addstatus, error } = useSelector(state=> state.communities)
  const [community, setCommunity] = useState({
    name: '',
    description: ''
  })

  const user = useSelector(state=> state.user.vtu.vtu)

  useEffect(()=>{
    if (addstatus==='succeeded'){
      dispatch(fetchCommunities())
      setCreate(false)
      dispatch(resetAddStatus())
      CustomAlert({
        title: 'Community Created',
        showCancelButton: false,
        type: 'success'
        })  
    }
    else if(addstatus==='failed'){
      CustomAlert({
        title: 'Error in creating Community',
        description: 'Try again after some time',
        type: 'error',
        showCancelButton: false
        })
    }
  },[addstatus,dispatch])

  const router = useRouter()
  console.log(user)

  const Create = async () => {
    if (community.name === "")
      return CustomAlert({
        title: 'Enter Community name',
        showCancelButton: false
      })
    const newCommunity = {
      name: community.name,
      description: community.description,
      vtu: user
    }
    dispatch(addCommunity(newCommunity))
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setCreate(false)}>
          &times;
        </span>
        <h2>Create Community</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Community name"
            onChange={(e) =>
              setCommunity((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Description for community"
            onChange={(e) =>
              setCommunity((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={Create}>CREATE</button>
        </div>
      </div>
    </div>
  );
}
