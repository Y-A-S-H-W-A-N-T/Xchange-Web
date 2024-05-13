import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Communities() {

    const router = useRouter()

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
    <div>
        <div>
            {
                communities &&
                communities.map((val,ind)=>(
                    <div key={ind} style={{border: '2px black solid'}}
                        onClick={()=>{
                            val.members.some(member => member.user_vtu === VTU)
                            ? router.push( `/communities/${val._id}`)
                            : alert("First Join the Community")
                        }}
                    
                    >
                        <p>{val.name}</p>
                        <p>{val.description}</p>
                        {val.members.some(member => member.user_vtu === VTU)
                        ?
                        (
                            <p>Member ✔️</p>
                        )
                        :
                        (
                            <p onClick={(e)=>JoinCommunity(e,val._id,val.name)} style={{backgroundColor: 'lightgreen',cursor: 'pointer'}}>Join Community ➕</p>
                        )}
                    </div>
                ))
            }
        </div>
    </div>
  )
}