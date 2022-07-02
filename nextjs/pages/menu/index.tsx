import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { allCategory } from '../../api'
import Category from '../../components/Category'
import ItemContainer from '../../components/Items/ItemContainer'
import AppLayout from '../../components/Layouts/AppLayout'
import Search from '../../components/Search'
import {CATEGORY} from "../../types/index"

interface Props {
  categories : CATEGORY[]
}

const menu : NextPage<Props> = ({categories})=> {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <AppLayout title="Menu">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-md font-bold text-textGray' >Our Food</h1>
      <h2 className='text-xl mb-2 font-bold text-textGreen'>Special For You</h2>
      <Search/>
      <Category categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ItemContainer title="Top Of Week" />
      <ItemContainer title="Seafood" />
    </AppLayout>
  )
}

export async function getStaticProps() {
  const categories = await allCategory();
  return {
    props: {
      categories : categories.data,
    },
  };
}

export default menu