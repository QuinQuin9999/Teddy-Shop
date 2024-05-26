import styled from 'styled-components';
import Slider from 'react-slick';

export const SliderContainer = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  padding-bottom: 20px;
`;

export const SliderItem = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
`;

export const SliderImage = styled.img`
  width: 100%;
  height: auto;
`;

export const CustomSlider = styled(Slider)`
  .slick-prev, .slick-next {
    width: 40px;
    height: 40px;
    z-index: 1;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 40px;
    color: black;
  }
`;