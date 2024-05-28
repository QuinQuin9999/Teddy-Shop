import styled from 'styled-components'
import { Input } from 'antd'
export const StyleContainer = styled.div`
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    @media (max-width: 1024px)
    {
      margin: 1% 0;
    }
`

export const StyleLeftCon = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #1A93FF; 
    @media (max-width: 968px) {
        display: none; 
    }
`
export const StyleRightCon = styled.div`
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 500px;

    h4 {
        color: #CC7A33;
        text-align: center;
    }
    @media (max-width: 968px) {
        padding: 20px; 
    }
`
export const StyleInput = styled(Input)`
    border-radius: 5px;
    height: 40px;
`