import React from 'react'
import Carousel from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.scss'

export default function BackgroundSlider(props) {
  const settings = {
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 2000,
    className: 'background-carousel'
  }

  return (
    <div className="slider-background">
      <div className="background-pouring" />
      <Carousel {...settings}>
        <div className="slider-item slider-item-1" />
        <div className="slider-item slider-item-2" />
      </Carousel>
    </div>
  )
}
