import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Baner from '../components/Baner'
import ItemContainer from '../components/Items/ItemContainer'
import AppLayout from '../components/Layouts/AppLayout'
import Search from '../components/Search'


const Home: NextPage = () => {
  const [topOfWeek, setTopOfWeek] = useState([]);

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/menus')
    .then(res => res.json())
    .then(data => setTopOfWeek(data))
  },[])

  return (
    <AppLayout title="Home" >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search/>
      <Baner/>
      <ItemContainer title="Top Of Week" menus={topOfWeek} />
      <ItemContainer title="Seafood" />
    </AppLayout>
  )
}

export default Home
