import styled from 'styled-components';
import Sparkles from '@mui/icons-material/AutoAwesome';
import Dizzy from '../../emoji/dizzy.png';

const DizzyEmoji = styled.img `
display: inline-block;
font-size: inherit;
height: 14pt;
padding-right: 10px;
`

const Page = styled.div `
    padding: 30px 30px 30px 30px;
`
export default function InfoPage(props) {
    return (
        <Page>
            <h1 style={{textAlign: "center", marginTop: "20px"}}><Sparkles /> About Project Muse <Sparkles /></h1>
            <br/>
            <h2><DizzyEmoji src={Dizzy} />Information On The Show</h2>
            <p>
            A common misconception about Project Muse is that this is just a normal vtuber interview show. Project Muse, however, is a live BGM raffle as well, where you get picked at random, interviewed, and then made music for, all in an hour or less.<br/><br/>
            More information is below on how exactly the show runs!
            </p>
        </Page>
    )
}