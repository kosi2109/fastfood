import type { NextPage } from 'next'
import Head from 'next/head'
import { allBanners, featureCategory } from '../api'
import ItemContainer from '../components/client/Items/ItemContainer'
import AppLayout from '../components/Layouts/AppLayout'
import Search from '../components/client/Search'
import { BANNER, CATEGORY } from '../types'
import Banner from '../components/client/Banner'

interface Props{
  categories : CATEGORY[],
  banners : BANNER[]
}

const Home: NextPage<Props> = ({categories,banners}) => {
  
  return (
    <AppLayout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search/>
      <div className='w-full md:mx-auto md:w-2/3'>
        <Banner banners={banners} />
        <div className='w-full md:w'>
          {categories.map((category:any) => (
            <ItemContainer key={category.slug} title={category.name} menus={category.menus} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export async function getServerSideProps() {
  const categories = await featureCategory();
  const banners = await allBanners();


  return {
    props: {
      categories : categories.data.data,
      banners : banners.data.data
    },
  };
}

export default Home
