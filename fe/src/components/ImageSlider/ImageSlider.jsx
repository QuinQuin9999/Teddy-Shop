// src/components/ImageSlider.js
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderContainer, SliderItem, SliderImage, CustomSlider } from './style';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, 
    centerMode: true,
    centerPadding: '0', 
  };

  const images = [
    '/slider1.jpg',
    '/slider2.jpg',
    '/slider3.jpg',
    '/slider4.jpg'
  ];

  return (
    <SliderContainer>
      <CustomSlider {...settings}>
        {images.map((image, index) => (
          <SliderItem key={index}>
            <SliderImage src={image} alt={`Slide ${index}`} />
          </SliderItem>
        ))}
      </CustomSlider>
    </SliderContainer>
  );
};

export default ImageSlider;
