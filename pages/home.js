import AddRoom from '../components/addroom'
import { useRouter } from 'next/router';

export default function home() {
  const router = useRouter()
  console.log(router)

  return (
    <div>
        <div>
            <div>
                <h1>Chat Room</h1>
            </div>
            <div>
                <p>Add Room ➕</p>
            </div>
            <AddRoom/>
        </div>
    </div>
  )
}