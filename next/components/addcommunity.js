import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/modal.module.css"

export default function AddCommunity({ setCreate }) {

  useEffect(()=>{
    let vtu = localStorage.getItem('vtu');
    const VTU = vtu.replace(/^"(.*)"$/, '$1');
    setCommunity((prev)=>({...prev,leader: VTU}))
  },[])

  const router = useRouter()
  const [community, setCommunity] = useState({
    name: '',
    description: '',
    leader: ''
  })
  const Create = async () => {
    if (community.name === "") return alert("Enter a name for community");
        await axios
        .post("/api/community/create_community", {
            name: community.name,
            description: community.description,
            vtu: community.leader
        })
        .then((res) => {
        res.data.status === 200
            ? alert("Community Created")
            : alert("Error in Creating Community");
        router.reload();
        })
  }
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close} onClick={()=>setCreate(false)}>
              &times;
            </span>
            <div>
            <h2>Create Community</h2>
            <div>
                <input
                placeholder="Community name"
                onChange={(e) =>
                    setCommunity((prev) => ({ ...prev, name: e.target.value }))
                }
                />
                <input
                placeholder="Description for community"
                onChange={(e) =>
                    setCommunity((prev) => ({
                    ...prev,
                    description: e.target.value,
                    }))
                }
                />
                <button onClick={Create}>CREATE</button>
            </div>
            </div>
        </div>
  </div>
  )
}