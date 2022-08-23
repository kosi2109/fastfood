import React from "react";
import SingleItem from "./SingleItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MENU } from "../../../types";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Items = ({deviceType , menus}: {deviceType? : any, menus : MENU[] | null}) => {
  return (
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      arrows
      centerMode={false}
      className="z-10"
      containerClass="container-with-dots"
      dotListClass=""
      draggable={deviceType == "mobile" || deviceType == "tablet" ? true : false}
      focusOnSelect={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
    >
      {menus?.map((menu : any,i : number)=>(
        <SingleItem key={i} menu={menu} />
      ))}
    </Carousel>
  );
};

export default Items;
