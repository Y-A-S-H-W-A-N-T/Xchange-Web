import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Community from "../../components/addcommunity"
import styles from '../../styles/communities.module.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchCommunities } from "@/components/slices/communitySlice"
import { JOIN_COMMUNITY } from "@/components/grapql/communityQueries"
import { useMutation } from "@apollo/client"
import Loading from "@/components/loading"
import { CustomAlert } from 'alerts-react'


export default function Communities() {

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

    const JoinCommunity = async(e,id,ind)=>{
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
                router.push(`/communities/${id}/${ind}`)
            }
            else {
                CustomAlert({
                    title: 'Error in joining Community',
                    description: 'Try again after some time',
                    showCancelButton: false,
                    type: 'error'
                })
            }
        })
    }

    const vtu = useSelector(state=> state.user.vtu)

    console.log(vtu)

    if(vtu===''){
        return (
        <div>
            {vtu==='' && <h2 onClick={()=>router.replace('/')}>LOGIN FIRST</h2>}
        </div>
        )
    }

  return (
    <div className={styles.container}>
            {!communities && <Loading/>}
            {vtu && <>
            <div onClick={() => setCreate(true)} className={styles.addButton}>🆕</div>
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
                                :
                                CustomAlert({
                                    title: 'Join Community to enter',
                                    showCancelButton: false
                                })
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
                                    JoinCommunity(e, val.id, ind);
                                }} 
                                className={styles.joinButton}
                              >
                                {loading?'joining...':'Join Community ➕'}
                              </p>
                        }
                    </div>
                ))}
            </div>
            </>}
    </div>
  )
}