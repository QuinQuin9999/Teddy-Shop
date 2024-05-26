import styled from "styled-components";
export const WrapperProducts = styled.div`
  display: grid;
  gap: 8px;
  padding: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (min-width: 1480px)
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

  @media (max-width: 768px)
  {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px)
  {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const ButtonTag = styled.h2`
background-color: #f7f0e8; 
border: 3px solid #e1d3c2; 
border-radius: 20px; 
padding: 10px 20px; 
display: inline-block;  
font-weight: bold; 
color: #3d2e1f;
font-size: 20px;
text-decoration: none; 
position: relative;
min-width: 240px;
margin-top: 20px;
`