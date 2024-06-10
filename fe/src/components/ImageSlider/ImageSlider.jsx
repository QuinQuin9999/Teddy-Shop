import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderContainer, SliderItem, SliderImage, CustomSlider } from './style';
import axios from 'axios';

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/v1/carousel/getAll');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

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

  return (
    <SliderContainer>
      <CustomSlider {...settings}>
        {images.map((image, index) => (
          <SliderItem key={index}>
            <SliderImage src={image.url} alt={`Slide ${index}`} />
          </SliderItem>
        ))}
      </CustomSlider>
    </SliderContainer>
  );
};

export default ImageSlider;
