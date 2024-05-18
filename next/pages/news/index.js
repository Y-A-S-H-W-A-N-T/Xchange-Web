import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function navbar() {

  const router = useRouter()
  const [news,setNews] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/api/news/show_news')
    .then((res)=>{
      setNews(res.data)
    })
  },[])
  
  return (
    <div>
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