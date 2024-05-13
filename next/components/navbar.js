import { useRouter } from 'next/router'

export default function navbar() {

  const router = useRouter()
  
  return (
    <div>
        <p onClick={()=>router.push('/communities')}>GO TO COMMUNITIES</p>
    </div>
  )
}