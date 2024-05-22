import { Button, InputNumber, Slider } from "antd";
import styled from "styled-components";

export const ButtonCustom = styled(Button)`
    &:hover {
        border-color: #BF8B70 !important;
        color: #BF8B70 !important;
    }
`
export const SliderPrice = styled(Slider)`
  .ant-slider-track {
    background-color: #BF8B70 !important;
  }

  .ant-slider-handle {
    background-color: #BF8B70 !important;
    border-color: #BF8B70 !important;
  }

  .ant-slider-handle::after {
    box-shadow: 0 0 0 2px #BF8B70;
    border-radius: 50%;
  }

  .ant-slider-handle:hover,
  .ant-slider-handle:focus,
  .ant-slider-handle:active,
  .ant-slider-handle.ant-slider-handle-click-focused {
    box-shadow: 0 0 0 2px #BF8B70 !important;
    border-radius: 50%;
  }

  .ant-slider-handle:hover::after,
  .ant-slider-handle:focus::after,
  .ant-slider-handle:active::after,
  .ant-slider-handle.ant-slider-handle-click-focused::after {
    box-shadow: 0 0 0 2px #994C00 !important;
    border-radius: 50%;
  }

  .ant-slider-dot {
    border-color: #BF8B70 !important;
  }

  .ant-slider:hover .ant-slider-track {
    background-color: #BF8B70 !important;
  }

  &:hover .ant-slider-handle {
    background-color: #BF8B70 !important;
    border-color: #BF8B70 !important;
  }

  &:hover .ant-slider-handle::after {
    box-shadow: 0 0 0 2px #BF8B70 !important;
  }
`;

export const InputPrice = styled(InputNumber)`
    &:hover {
        border-color: #BF8B70 !important;
        color: #BF8B70 !important;
    }
`