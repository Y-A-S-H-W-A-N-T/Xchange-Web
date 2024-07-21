import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Community from "../../components/addcommunity"
import styles from '../../styles/community.module.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchCommunities } from "@/components/slices/communitySlice"
import { JOIN_COMMUNITY } from "@/components/grapql/communityQueries"
import { useMutation } from "@apollo/client"

// export async function getStaticProps() {
//     const response = await fetch('http://localhost:3000/api/community/show_community')
//     const communities = await response.json()
//     return { props: { Oldcommunities } }
//   }

export default function Communities({ Oldcommunities }) {

    const router = useRouter()
    const [create,setCreate] = useState(false)
    
    const dispatch = useDispatch()
    const { communities, status, error } = useSelector(state=> state.communities)

    console.log("Total communities : ",communities)

    const [joinCommunity,{loading}] = useMutation(JOIN_COMMUNITY)

    const user = useSelector(state=> state.user.vtu.vtu)

    console.log(communities)

    useEffect(()=>{
        dispatch(fetchCommunities())
    },[dispatch])

    const JoinCommunity = async(e,id)=>{
        e.stopPropagation();        
        joinCommunity({
            variables: {
                communityId: id,
                vtu: user
            }
        })
        .then((response)=>{
            console.log(response)
            if (response.data.joinCommunity.id!==null || '') {
                router.push(`/communities/${id}`)
            }
            else {
                alert("Error in Joining Community")
            }
        })
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
                            val.members.some(member => member.user_vtu === user)
                                ? router.push(`/communities/${val.id}/${ind}`)
                                : alert("First Join the Community")
                        }}
                    >
                        <p className={styles.communityName}>{val.name}</p>
                        <p className={styles.communityDescription}>{val.description}</p>

                        <p>{val.members.length} members joined</p>

                        {val.members.some(member => member.user_vtu === user)
                            ? <p className={styles.memberStatus}>Member ✔️</p>
                            : <p 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    JoinCommunity(e, val.id);
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