import styled from "styled-components";

export const WrapperDiv = styled.div`
  background: #fff;
  margin: 0 120px;
  height: fit-content;
  width: fit-content;
  // margin: auto auto;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const WrapperProducts = styled.div`
  display: grid;
  gap: 8px;
  padding: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (min-width: 1280px)
  {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (max-width: 1280px)
  {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1024px)
  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 968px)
  {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px)
  {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

`

