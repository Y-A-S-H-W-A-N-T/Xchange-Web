import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddPost from '@/components/addPost'
import Comment_Section from '@/components/comment_section';

export default function Community() {

    const [addpost,setaddpost] = useState(false)
    const [post_id_for_comment,setPost_id_for_comment] = useState('')
    const [post_number,setPost_number] = useState('')
    const [showComments,setShowComments] = useState(false)
    const togglePostScreen = ()=>{
        setaddpost(!addpost)
    }

    const router = useRouter()
    const { community } = router.query

    const [Community_Details,setCommunity_Details] = useState(null)

    useEffect(()=>{
        const getCommunityDetails = async()=>{
            await axios
            .post('/api/community/selected_community',{ community_id: community })
            .then((res)=>{
                setCommunity_Details(res.data)
                console.log(res.data)
            })
        }
        getCommunityDetails()
    },[community])

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

    const Comment = async(id,ind)=>{
        setPost_number(ind)
        setPost_id_for_comment(id)
        setShowComments(true)
    }

  return (
    <div>
        <div onClick={Leave_Community} style={{display: 'flex', backgroundColor: 'red', cursor: 'pointer'}}>Leave</div>
        <div>
            <div>
                <p onClick={togglePostScreen}>Add Post ➕</p>
                <AddPost togglePostScreen={togglePostScreen} addpost={addpost} community_id={community}/>
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
                                <div key={ind}>
                                    <p>{members.user_vtu}</p>
                                </div>
                            ))
                        )
                        :
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
            <div>
            {
                        Community_Details!==null
                        ?
                        (
                            Community_Details.posts.map((post,ind)=>(
                                <div key={post._id} style={{border: '2px red solid'}}>
                                    <p>{post.post_title}</p>
                                    <img src={post.post_media} alt='post' width={300} height={300}/>
                                    <p onClick={()=>Comment(post._id,ind)}>💬</p>
                                </div>
                            ))
                        )
                        :
                        (
                            <div></div>
                        )
                    }
                    {showComments && <Comment_Section post_id={post_id_for_comment} post_number={post_number} post={Community_Details} setShowComments={setShowComments} community_id={community}/>}

            </div>
        </div>
    </div>
  )
}