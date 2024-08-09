import styled from "styled-components"
import BallBotListener from "../../BallBotListener";
import { useEffect, useState } from "react";
import { Card, Collapse, Fade } from "@mui/material";

const Page = styled.div `
margin: 0;
font-family: "Garet Heavy";
font-size: 30pt;
text-align: center;
`

export default function Timer() {
    const [showTimer, setShowTimer] = useState(false);

    var clockInterval = false;
    const [timeRem, setTimeRem] = useState("");

    const handle = (etype, edata) => {
        if (etype === "timer-complete") {
            clearInterval(clockInterval);
            document.getElementById("demo")
                    .innerHTML = "";
            setShowTimer(false);
            
        }
        if (etype === "timer-start") {
            setShowTimer(true);
            if (clockInterval !== false) clearInterval(clockInterval);
            clockInterval = setInterval(function () {
                 
                // Getting current time in required format
                let now = new Date().getTime();
                let t = edata.endsAt - now;

 
                // Getting value of days, hours, minutes, seconds
                let hours = Math.floor(
                    (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                let minutes = Math.floor(
                    (t % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                let seconds = Math.floor(
                    (t % (1000 * 60)) / 1000).toString().padStart(2, '0');
 
                // Output the remaining time
                let h = hours === "00" ? "" : hours + ":"
                setTimeRem(h + minutes + ":" + seconds);
 
                // Output for over time
                if (t < 0) {
                    setTimeRem("");
                    clearInterval(clockInterval);
                }
            }, 1000);
        }
    }

    var Listener = new BallBotListener();

    const InitListener = () => {
        Listener.eventHandler = handle;
        Listener.initMessage = "timer.actions.init"
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
            <Fade in={showTimer}>
                <Card
                sx={{
                    borderBottomLeftRadius: "60px",
                    width: "100%",
                    padding: "16px 16px 16px 16px",
                    textAlign: "center"
                }}
                >
                    {timeRem} remaining
                </Card>
            </Fade>
            
            
        </Page>
    )
}