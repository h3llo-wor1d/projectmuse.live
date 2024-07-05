import styled from 'styled-components';
import Twemoji from 'react-twemoji';

const IBlock = styled.div `
display: block;
margin-bottom: 30px;`;

const GridContainer = styled.div `
display: grid;
grid-template-columns: 18pt auto;
column-gap: 12.5px;
position: relative;
`


export default function InfoBlock(props) {
    return (
        <IBlock>
            <h2 style={{position: "relative", height: "30pt"}}>
                <GridContainer>
                    <Twemoji options={{ className: 'twemoji' }}>{props.emoji}</Twemoji>
                    {props.subheading}
                </GridContainer>
            </h2>
            {props.p}
        </IBlock>
    )
}