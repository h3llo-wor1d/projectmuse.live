import { Avatar, Button, Card, CardHeader } from "@mui/material"
import styled from "styled-components";
import { TiktokIcon, TwitchIcon, TwitterIcon, YoutubeIcon } from "../../SocialIcons";
import { useEffect, useRef, useState } from "react";
import BallBotListener from "../../BallBotListener";

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
    twitter: <TwitterIcon color={"rgba(255, 255, 255, 0.7)"} size="0.875rem" />,
    twitch: <TwitchIcon color={"rgba(255, 255, 255, 0.7)"} size="0.875rem" />,
    tiktok: <TiktokIcon color={"rgba(255, 255, 255, 0.7)"} size="0.875rem" />
}

export default function CurrentInterview() {
    var cardSocials = [{type: "None Stated", handle: ""}];
    const [currentName, setCurrentName] = useState("Nobody Yet!");
    const [avatarURL, setAvatarURL] = useState("https://archive.org/services/img/discordprofilepictures")

    var Listener = new BallBotListener();

    const [curSocial, setCurSocial] = useState(cardSocials[0]);

    var curIndex = 0;

    const cardRef = useRef();

    const handle = (etype, edata) => {
        console.log(etype)
        if (etype === "init" || etype === "newUser") {
            if (edata.currentUser !== null) {
                setCurrentName(edata.currentUser);
                setAvatarURL(edata.avatar);
                let socials = edata.currentUserData.identity.rawSocials;
                if (socials.length > 0) {
                    let newSocials = Object.keys(socials).map(
                        socialType => {
                            return {
                                type: socialType, 
                                handle: socials[socialType]
                            }
                        }
                    )
                    newSocials = newSocials.filter(i => Object.keys(SocialMap).indexOf(i.type) !== -1)
                    cardSocials = newSocials;
                    setCurSocial(newSocials[0]);
                    if (newSocials.length > 1) {
                        setTimeout(() => {AnimateCard()}, 5000);
                    }
                }
            }
            return;
        }
    }

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

    const InitListener = () => {
        Listener.eventHandler = handle;
        Listener.start();
    }

    useEffect(() => {
        if (Listener.webSocket === false ) {
            Listener.close();
            InitListener();    
        }   
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
                        <Avatar aria-label="recipe" 
                            src={avatarURL} 
                        />
                    }
                    title={currentName}
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