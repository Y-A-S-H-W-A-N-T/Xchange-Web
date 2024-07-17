import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Community from "../../components/addcommunity"
import styles from '../../styles/community.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunities } from "@/components/slices/communitySlice";

// export async function getStaticProps() {
//     const response = await fetch('http://localhost:3000/api/community/show_community')
//     const communities = await response.json()
//     return { props: { Oldcommunities } }
//   }

export default function Communities({ Oldcommunities }) {

    const router = useRouter()
    const [create,setCreate] = useState(false)
    const [VTU,setVTU] = useState('')
    
    const dispatch = useDispatch()
    const { communities, status, error } = useSelector(state=> state.communities)

    console.log(communities)

    useEffect(()=>{
        let vtu = localStorage.getItem('vtu');
        const new_vtu = vtu.replace(/^"(.*)"$/, '$1');
        setVTU(new_vtu)
    },[])

    const user = useSelector(state=> state.user)
    console.log(user)

    useEffect(()=>{
        dispatch(fetchCommunities())
    },[dispatch])

    const JoinCommunity = async(e,id,community_name)=>{
        e.stopPropagation();
        await axios
        .post('/api/community/join_member',{
            community_id: id,
            user_vtu: VTU 
        })
        .then((res)=>{
            res.data.status===200
            ? alert(`You have Joined the ${community_name} Community`)
            : alert("Error in Joining Community, Please Try Again")
        })
        router.reload()
    }


  return (
    <div className={styles.container}>
            <div onClick={() => setCreate(true)} className={styles.addButton}>➕</div>
            <div>
                {create && <Community setCreate={setCreate} />}
            </div>
            <div className={styles.communityList}>
                {communities && communities.map((val, ind) => (
                    <div 
                        key={ind} 
                        className={styles.communityCard}
                        onClick={() => {
                            val.members.some(member => member.user_vtu === VTU)
                                ? router.push(`/communities/${val.id}`)
                                : alert("First Join the Community")
                        }}
                    >
                        <p className={styles.communityName}>{val.name}</p>
                        <p className={styles.communityDescription}>{val.description}</p>
                        {val.members.some(member => member.user_vtu === VTU)
                            ? <p className={styles.memberStatus}>Member ✔️</p>
                            : <p 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    JoinCommunity(e, val.id, val.name);
                                }} 
                                className={styles.joinButton}
                              >
                                Join Community ➕
                              </p>
                        }
                    </div>
                ))}
            </div>
        </div>
  )
}