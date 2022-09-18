import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import { BANNER } from "../../types";

interface Props {
  banners: BANNER[];
}

const responsive = {
  mobile: {
    breakpoint: { max: 2000, min: 0 },
    items: 1,
  },
};

const Banner: NextPage<Props> = ({ banners }) => {
  return (
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      centerMode={false}
      focusOnSelect={false}
      renderArrowsWhenDisabled={false}
      infinite={true}
      arrows={false}
      autoPlay={true}
      autoPlaySpeed={5000}
    >
      {banners.map((banner: any, i: number) => (
        <div key={i} className="w-full h-40 md:h-80 px-5 lg:px-20 py-2 mb-3 bg-bgLightGreen flex items-center rounded-md shadow-sm">
          <div className="w-4/6 flex flex-col items-start justify-center">
            <h4 className="font-semibold mb-3 text-xl md:text-4xl text-textBlack">
              {banner.title}
            </h4>
            <h5 className="font-medium mb-2 text-textBlack mb-2 md:text-xl">
              {banner.description}
            </h5>
            {banner.menu && (
              <Link href={`/menu/${banner.menu.slug}`}>
                <button className="bg-bgGreen text-textWhite p-2 font-bold rounded-md md:text-lg md:px-3">
                  Order Now
                </button>
              </Link>
            )}
          </div>
          <div className="w-2/6 h-full">
            {banner?.menu ? (
              <img
                className="object-cover w-full h-full"
                src={banner.menu?.cover_img}
                alt="img"
              />
            ) : banner.image_url ? (
              <img
                className="object-cover w-full h-full"
                src={banner.image_url}
                alt="img"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
