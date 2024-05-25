import styled from 'styled-components';

export const FooterInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-width: 200px;
`

export const FooterTitle = styled.h4`
    color: #994C00; 
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`

export const FooterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #F0DACD; 
    padding: 0px 50px;
    font-size: 14px;
    color: #BF8B70; 
    margin-top: 20px;
    padding-top: 20px
`

export const Logo = styled.img`
  height: 50px;
`;

export const InfoDetail = styled.a`
    color: #BF8B70; 
    text-decoration: none;
    line-height: 1.6;
    display: flex;
    align-items: center;

    margin-right: 10px;

    &:hover{
        color: #994C00;
    }
`

export const Info = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
`

export const Social = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`