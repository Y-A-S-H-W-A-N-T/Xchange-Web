import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import News from '../../components/addnews'

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/news/show_news')
  const news = await response.json()
  return { props: { news } }
}

export default function navbar({ news }) {

  const router = useRouter()
  const [create,setCreate] = useState(false)
  
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