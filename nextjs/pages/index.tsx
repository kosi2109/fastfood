import type { NextPage } from "next";
import Head from "next/head";
import {
  allBanners,
  featureCategory,
  getDiscountMenus,
  googleCallBack,
} from "../api";
import ItemContainer from "../components/client/Items/ItemContainer";
import AppLayout from "../components/Layouts/AppLayout";
import Search from "../components/client/Search";
import { BANNER, CATEGORY, MENU } from "../types";
import Banner from "../components/client/Banner";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import {login as authLogin} from "../store/slices/authSlice"


interface Props {
  categories: CATEGORY[];
  banners: BANNER[];
  discountMenus: MENU[];
}

const Home: NextPage<Props> = ({ categories, banners, discountMenus }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query.code) {
      googleCallBack({
        code: router.query.code,
        scope: router.query.scope,
        authuser: router.query.authuser,
        prompt: router.query.prompt,
      }).then((response) => {
        router.replace("/");
        dispatch(authLogin(response.data));
        const age = 60 * 60 * 24 * 30; //1month
        setCookie("jwt", response.data.token, {
          maxAge: age,
        });
        setCookie("fastfood_auth", response.data.user, {
          maxAge: age,
        });
      });
    }
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Fastfood</title>
      </Head>
      <Search />
      <div className="w-full lg:mx-auto lg:w-2/3">
        <Banner banners={banners} />
        <div className="w-full">
          <ItemContainer title="Discount Items" menus={discountMenus} />
          {categories.map((category: any) => (
            <ItemContainer
              key={category.slug}
              title={category.name}
              menus={category.menus}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps() {
  const categories = await featureCategory();
  const discountMenus = await getDiscountMenus();
  const banners = await allBanners();

  return {
    props: {
      categories: categories.data.data,
      banners: banners.data.data,
      discountMenus: discountMenus.data.data,
    },
  };
}

export default Home;
