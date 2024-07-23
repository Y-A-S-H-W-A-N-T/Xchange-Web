import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddPost from '@/components/addPost';
import Comment_Section from '@/components/comment_section';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '@/components/slices/communitySlice';
import styles from '@/styles/community.module.css';

export default function Community() {
    const [addpost, setaddpost] = useState(false);
    const [post_id_for_comment, setPost_id_for_comment] = useState('');
    const [post_number, setPost_number] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const togglePostScreen = () => {
        setaddpost(!addpost);
    };

    const toggleMembers = () => {
        setShowMembers(!showMembers);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const router = useRouter();
    const { community, index } = router.query;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommunities());
    }, [dispatch]);

    const selectedCommunity = useSelector(state => 
        state.communities.communities && state.communities.communities[index]
    )

    console.log(selectedCommunity)

    const Leave_Community = async () => {
        alert("This will Remove you from Community");
        let vtu = localStorage.getItem('vtu');
        const VTU = vtu.replace(/^"(.*)"$/, '$1');
        await axios.post('/api/community/leave_community', { community_id: community, user_vtu: VTU })
            .then((res) => {
                res.data.status === 200 ? alert('Left the Community') : alert("Error in leaving Community");
                router.replace('/communities');
            });
    };

    const Comment = async (id, ind) => {
        setPost_number(ind);
        setPost_id_for_comment(id);
        setShowComments(true);
    }

    const user = useSelector(state=> state.user.vtu)

    if(user===''){
        return (
        <div>
            {user==='' && <h2 onClick={()=>router.replace('/')}>LOGIN FIRST</h2>}
        </div>
        )
    }

    return (
        <>
            {user && <div className={styles.communityPage}>
            {!sidebarVisible && <button 
                className={styles.sidebarToggle} 
                onClick={toggleSidebar}
            >
                ➡️
            </button>}
            <AddPost togglePostScreen={togglePostScreen} addpost={addpost} community_id={community} />
            <div className={`${styles.sidebar} ${sidebarVisible ? styles.sidebarVisible : styles.sidebarHidden}`}>
                {selectedCommunity ? (
                    <>
                        <p className={styles.Closesidebar} onClick={toggleSidebar}>⬅️</p>
                        <h1 className={styles.communityName}>{selectedCommunity.name}</h1>
                        <div className={styles.addPostSection}>
                            <p className={styles.togglePost} onClick={togglePostScreen}>Add Post ➕</p>
                        </div>
                        <div className={styles.membersSection}>
                            <h2 onClick={toggleMembers} className={styles.membersToggle}>MEMBERS {showMembers ? '▲' : '▼'}</h2>
                            {showMembers && <div className={styles.membersList}>
                                {
                                    selectedCommunity.members.map((members, ind) => (
                                        <div key={ind} className={styles.memberItem}>
                                            <p>{members.user_vtu}</p>
                                        </div>
                                    ))
                                }
                            </div>}
                        </div>
                        <div className={styles.leaveCommunity} onClick={Leave_Community}>Leave</div>
                    </>
                ) : (
                    <div>Loading community data...</div>
                )}
            </div>
            <div className={styles.communityContent}>
                <div className={styles.postsSection}>
                    {
                        selectedCommunity && selectedCommunity.posts.map((post, ind) => (
                            <div key={post._id} className={styles.postItem}>
                                <img src={post.post_media} alt='post' width={500} height={500} />
                                <p className={styles.commentIcon} onClick={() => Comment(post.id, ind)}>💬{post.post_comments.length}</p>
                                <p>{post.post_vtu} : {post.post_title}</p>
                            </div>
                        ))
                    }
                    {showComments && <Comment_Section post_id={post_id_for_comment} post_number={post_number} community_number={index} setShowComments={setShowComments} community_id={community} />}
                </div>
            </div>
        </div>}
        </>
    )
}