import styled from 'styled-components'
import { Input } from 'antd'
export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;

`
export const StyleInput = styled(Input)`
    width: 300px;
`
export const StyleInputPassword = styled(Input.Password)`
    width: 300px;
`