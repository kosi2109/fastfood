import type { NextPage } from 'next'
import Head from 'next/head'
import { allMenus } from '../api'
import Baner from '../components/Baner'
import ItemContainer from '../components/Items/ItemContainer'
import AppLayout from '../components/Layouts/AppLayout'
import Search from '../components/Search'
import { MENU } from '../types'

interface Props{
  topOfWeek : MENU[],
  malarShanKaw : MENU[]
}

const Home: NextPage<Props> = ({topOfWeek,malarShanKaw}) => {
  
  return (
    <AppLayout title="Home" >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search/>
      <Baner/>
      <ItemContainer title="Top Of Week" menus={topOfWeek} />
      <ItemContainer title="Malar Shan Kaw" menus={malarShanKaw} />
    </AppLayout>
  )
}

export async function getStaticProps() {
  const topOfWeek = await allMenus('top-of-week');
  const malarShanKaw = await allMenus('malar-shan-kaw');
  
  return {
    props: {
      topOfWeek : topOfWeek.data,
      malarShanKaw : malarShanKaw.data,
    },
  };
}

export default Home
