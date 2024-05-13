import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Community() {

    const router = useRouter()
    const { community } = router.query

    const [Community_Details,setCommunity_Details] = useState(null)

    useEffect(()=>{
        const getCommunityDetails = async()=>{
            await axios
            .post('/api/community/selected_community',{community_id: community})
            .then((res)=>{
                setCommunity_Details(res.data)
                console.log(res.data)
            })
        }
        getCommunityDetails()
    },[router])

    const Leave_Community = async()=>{
        alert("This will Remove you from Community")
        let vtu = localStorage.getItem('vtu')
        const VTU = vtu.replace(/^"(.*)"$/, '$1')
        await axios.post('/api/community/leave_community',{ community_id: community, user_vtu: VTU})
        .then((res)=>{
            res.data.status===200? alert('Left the Community') : alert("Error in leaving Community")
            router.replace('/communities')
        })
    }

  return (
    <div>
        <div onClick={Leave_Community} style={{display: 'flex', backgroundColor: 'red', cursor: 'pointer'}}>Leave</div>
        <div>
            <div>
                <p onClick={()=>alert("Upload Post")}>Add Post ➕</p>
            </div>
            <h1>{Community_Details!==null && Community_Details.name}</h1>
            <div>
                <h2>MEMBERS:</h2><br></br>
                <div>
                    {
                        Community_Details!==null
                        ?
                        (
                            Community_Details.members.map((members,ind)=>(
                                <p>{members.user_vtu}</p>
                            ))
                        )
                        :
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}