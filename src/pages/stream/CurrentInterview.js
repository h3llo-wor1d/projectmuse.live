import { Avatar, Button, Card, CardHeader } from "@mui/material"
import styled from "styled-components";
import { TiktokIcon, TwitchIcon, TwitterIcon, YoutubeIcon } from "../../SocialIcons";
import { useEffect, useRef, useState } from "react";

const Page = styled.div `
margin: 0;
height: 72.03px;
`

const SocialBox = styled.div `
display: flex;
align-items: center;
column-gap: 5px;
`

const SocialContainer = styled.div `
display: flex;
flex-direction: row;
`

const delay = async (n) => {return new Promise(function(resolve){
    setTimeout(resolve,n);
})};

const SocialMap = {
    Twitter: <TwitterIcon color={"rgba(255, 255, 255, 0.7)"} size="0.875rem" />,
    Twitch: <TwitchIcon color={"rgba(255, 255, 255, 0.7)"} size="0.875rem" />
}

export default function CurrentInterview() {
    const cardSocials = [
        {type: "Twitter", handle: "h31lo_w0r1d"},
        {type: "Twitch", handle: "h3llo_wor1d"}
    ]

    const [curSocial, setCurSocial] = useState(cardSocials[0]);

    var curIndex = 0;

    const cardRef = useRef();

    const cycle = () => {
        if (curIndex === cardSocials.length-1) {
            curIndex = 0;
        } else {
            curIndex++;
        }
        setCurSocial(cardSocials[curIndex]);
    }

    const AnimateCard = async () => {
        document.getElementById('animateCard').classList.add("animateCardClose");
        await delay(1750);
        document.getElementById('animateCard').classList.remove("animateCardClose");
        document.getElementById('animateCard').classList.add("hidden");
        cycle();
        await delay(1500);
        document.getElementById('animateCard').classList.remove("hidden");
        document.getElementById('animateCard').classList.add("animateCardOpen");
        await delay(1750);
        document.getElementById('animateCard').classList.remove("animateCardOpen");
        setTimeout(() => {AnimateCard()}, 5000);
    }

    useEffect(() => {
        setTimeout(() => {AnimateCard()}, 5000)
    }, [])

    return (
        <Page>
            <Card
            sx={{
                borderBottomLeftRadius: "30px",
                borderBottomRightRadius: "30px",
                width: "100%",
                padding: "16px 16px 16px 16px"  
            }}
            >
                <CardHeader
                    sx={{
                        padding: "0px 0px 0px 0px"  
                    }}
                    avatar={
                        <Avatar aria-label="recipe" src={"https://cdn.discordapp.com/avatars/902242926577455235/5a7e1a30d6db94ff9baf125fedd9fc13.webp?size=160"} />
                    }
                    title="Rai"
                    subheader={
                        <div style={{position: 'relative', height: "20px"}}>
                            <div ref={cardRef} id="animateCard" style={{overflow: "hidden", position: 'absolute', bottom:0}}>
                                <SocialContainer>
                                    <SocialBox>
                                        {SocialMap[curSocial.type]}
                                        {curSocial.handle}
                                    </SocialBox>
                                </SocialContainer>
                            </div>
                        </div>
                        
                        
                    }
                />   
            </Card>
        </Page>
    )
}