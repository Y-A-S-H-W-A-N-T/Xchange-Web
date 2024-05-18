import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import News from '../../components/addnews'

export default function navbar() {

  const router = useRouter()
  const [news,setNews] = useState()
  const [create,setCreate] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:3000/api/news/show_news')
    .then((res)=>{
      setNews(res.data)
    })
  },[])
  
  return (
    <div>
        <div onClick={()=>setCreate(true)}>
          ➕
        </div>
          {create && <News setCreate={setCreate}/>}
        <div>
            {
                news &&
                news.map((news,ind)=>(
                  <div key={ind} style={{backgroundColor: 'lightblue'}}>
                      <div>
                        <h1>{news.headline}</h1>
                      </div>
                      <div>
                        <Image src={news.image} width={400} height={200} alt='news image'/>
                      </div>
                      <div>
                        <>{news.description}</>
                      </div>
                  </div>
                ))
            }
            </div>
    </div>
  )
}