import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import News from '../../components/addnews'
import styles from '../../styles/news.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '@/components/slices/newsSlice'


// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/news/show_news')
//   const news = await response.json()
//   return { props: { news } }
// }

export default function navbar({ news }) {
  const router = useRouter()
  const [create,setCreate] = useState(false)
  const dispatch = useDispatch()
  const testNews = useSelector(state=> state.news.news)

  useEffect(()=>{
    dispatch(fetchNews())
  },[])

  console.log(testNews)
  
  return (
    <>
      <div className={styles.createButton} onClick={() => setCreate(true)}><img src='./add.png' alt='create_room' height={50} width={50}/></div>
      <div className={styles.container}> 
          <div>
              {create && <News setCreate={setCreate} />}
          </div>
          <div className={styles.newsContainer}>
              {testNews && testNews.map((newsItem, ind) => (
                  <div key={ind} className={styles.newsCard}>
                      <div className={styles.newsContentContainer}>
                          <h1 className={styles.newsHeadline}>{newsItem.headline}</h1>
                          <Image className={styles.newsImage} src={newsItem.image} layout="responsive" width={800} height={600} alt='news image' />
                          <p className={styles.newsDescription}>{newsItem.description}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </>
  )
}