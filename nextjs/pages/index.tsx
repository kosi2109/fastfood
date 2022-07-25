import { getCookie, hasCookie } from 'cookies-next'
import type { NextPage } from 'next'
import Head from 'next/head'
import { API, featureCategory } from '../api'
import Baner from '../components/Baner'
import ItemContainer from '../components/Items/ItemContainer'
import AppLayout from '../components/Layouts/AppLayout'
import Search from '../components/Search'
import { CATEGORY } from '../types'

interface Props{
  categories : CATEGORY[],
}

const Home: NextPage<Props> = ({categories}) => {
  
  return (
    <AppLayout title="Home" >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search/>
      <Baner/>
      {categories.map((category:any) => (
        <ItemContainer key={category.slug} title={category.name} menus={category.menus} />
        ))}
    </AppLayout>
  )
}

export async function getServerSideProps() {
  const categories = await featureCategory();
  return {
    props: {
      categories : categories.data
    },
  };
}

export default Home
