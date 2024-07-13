import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import styles from "../styles/modal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addCommunity, fetchCommunities } from "./slices/communityReducer"

export default function AddCommunity({ setCreate }) {

  const dispatch = useDispatch()
  const { addstatus, error } = useSelector(state=> state.communities)
  const [community, setCommunity] = useState({
    name: '',
    description: '',
    leader: ''
  })

  useEffect(()=>{
    if (addstatus==='succeeded'){
      alert("Community Created")  
      dispatch(fetchCommunities())
      setCreate(false)
    }
    else if(addstatus==='failed'){
      alert("Error in Creating Community")
    }
  },[addstatus,dispatch])

  useEffect(() => {
    const vtu = localStorage.getItem('vtu');
    const VTU = vtu ? vtu.replace(/^"(.*)"$/, '$1') : '';
    setCommunity((prev) => ({ ...prev, leader: VTU }));
  }, []);

  const router = useRouter();

  const Create = async () => {
    if (community.name === "") return alert("Enter a name for community")
    const newCommunity = {
      name: community.name,
      description: community.description,
      vtu: community.leader
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
