import { getCookie, hasCookie } from 'cookies-next'
import type { NextPage } from 'next'
import Head from 'next/head'
import { allBanners, API, featureCategory } from '../api'
import Baner from '../components/Baner'
import ItemContainer from '../components/Items/ItemContainer'
import AppLayout from '../components/Layouts/AppLayout'
import Search from '../components/Search'
import { BANNER, CATEGORY } from '../types'

interface Props{
  categories : CATEGORY[],
  banners : BANNER[]
}

const Home: NextPage<Props> = ({categories,banners}) => {
  
  return (
    <AppLayout title="Home" >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search/>
      <Baner banners={banners} />
      {categories.map((category:any) => (
        <ItemContainer key={category.slug} title={category.name} menus={category.menus} />
      ))}
    </AppLayout>
  )
}

export async function getServerSideProps() {
  const categories = await featureCategory();
  const banners = await allBanners();


  return {
    props: {
      categories : categories.data,
      banners : banners.data
    },
  };
}

export default Home
