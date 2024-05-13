import axios from "axios"
import { useState, useEffect } from "react"

export default function Communities() {

    const [communities,setCommunities] = useState(null)
    const [VTU,setVTU] = useState('')

    useEffect(()=>{
        let vtu = localStorage.getItem('vtu');
        const new_vtu = vtu.replace(/^"(.*)"$/, '$1');
        setVTU(new_vtu)
        const getCommunities = async()=>{
            await axios
            .post('/api/community/show_community')
            .then((res)=>{
                setCommunities(res.data)
                console.log(res.data)
            })
        }
        getCommunities()
    },[])

    const JoinCommunity = async()=>{
        await axios
        .post('/api/community/join_member')
    }


  return (
    <div>
        <div>
            {
                communities &&
                communities.map((val,ind)=>(
                    <div key={ind} style={{border: '2px black solid'}}>
                        <p>{val.name}</p>
                        <p>{val.description}</p>
                        <p onClick={()=>JoinCommunity(val._id,VTU)}>JOIN ➕</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}