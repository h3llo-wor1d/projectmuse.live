import styled from 'styled-components';
import Twemoji from 'react-twemoji';
import Narrator from '../Narrator';
import { Tooltip } from '@mui/material';

const IBlock = styled.div `
display: block;
margin-bottom: 30px;
z-index: 0;
`;

const GridContainer = styled.div `
display: grid;
grid-template-columns: 18pt auto;
column-gap: 12.5px;
text-wrap: wrap;
height: auto;

`

const HoverElement = styled.span `
&:hover {
cursor: pointer;
}
`

export default function InfoBlock(props) {
    return (
        <IBlock>
            <h2>
                <GridContainer>
                    <Twemoji options={{ className: 'twemoji' }}>{props.emoji}</Twemoji>
                    <div>
                        
                        <HoverElement>
                        <Tooltip title={props.tooltip} sx={{ opacity: .9}} placement={"top"} arrow>{props.subheading}</Tooltip>
                        </HoverElement>
                        {props.narrator !== undefined && <Narrator src={props.narrator} /> }
                    </div>
                </GridContainer>
            </h2>
            {props.p}
        </IBlock>
    )
}