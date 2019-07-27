import styled from 'styled-components/native'
import { darkColours, darkBasic } from '../utils/colour'

export const Header = styled.View`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
background-color: ${darkColours['color-warning-default']};
`

export const Title = styled.Text`
font-size: 14px;
font-weight: 600;
padding: 10px;
color: ${darkColours['border-info-color-4']};
background-color: ${darkColours['color-warning-default']};
`

export const SubTitle = styled(Title)`
font-size: 12px;
font-weight: 400;
background-color: ${darkBasic['color-warning-100']};
`
