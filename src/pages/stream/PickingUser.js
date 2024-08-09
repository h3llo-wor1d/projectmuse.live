import styled from "styled-components"
import MuseLogo from '../../images/icon_color.png';
import { useEffect, useState } from "react";
import BallBotListener from "../../BallBotListener";

const Page = styled.div `
margin: 0;
width: 1920px;
height: 1080px;
text-align: center;
`

const MainContent = styled.div `
width: 100vw;
position: absolute;
top: 50%;
transform: translateY(-50%);
`

const Logo = styled.img `
width: 500px;
`

const MainText = styled.div `
text-align: center;
font-size: 28pt;
font-family: "Garet Book";
margin-top: 40px;
`

function SetTextColor(value){
    //value from 0 to 1
    var hue=((1-(value))*120).toString(10);
    try {
        document.getElementById("timeRem").style.color = ["hsl(",hue,",100%,50%)"].join("")
    } catch {}
}

export default function PickingUser() {
    const [timeRem, setTimeRem] = useState(false);
    const [name, setName] = useState(false);
    const [showTime, setShowTime] = useState(true);
    var Listener = new BallBotListener();

    const handle = (etype, edata) => {
        if (etype === "vc-select") {
            setName(edata);
            setTimeRem(60);
        }
        if (etype === "vc-refresh") {
            setName(edata)
        }
        if (etype === "vc-timer") {
            if (edata === false) {
                setName(false)
            }
            setTimeRem(edata);
            console.log()
            SetTextColor(1 - edata/60);   
        }
        if (etype === "newUser") {
            setShowTime(false);
        }
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
            <MainContent>
                <Logo src={MuseLogo} alt="MuseLogo" />
                <MainText>
                    <span>
                        {
                            name ?
                            <>{name}, you have been selected!<br/></> :
                            <>Waiting on BallBot...</>
                        }
                        {showTime && 
                        <div style={{fontSize: "18pt", opacity: name ? 1 : 0}}>
                            <span id="timeRem">{timeRem} seconds remain to join the show vc</span>
                        </div>
                        }
                    </span>
                </MainText>
            </MainContent>
        </Page>
    )
}