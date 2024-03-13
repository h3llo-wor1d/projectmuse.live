import DiscordButton from "../components/DiscordButton";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import '../style/pages/landing.css';

export default function Landing(props) {
    return (
        <div className="landing-flex">
            <img src="assets/icons/icon_color.png" alt="muse logo" className="logo"/><br/><br/>
            <span className="landing-caption">
                <span className="rainbow rainbow_text_animated">
                    "Wrench, this seems slightly overcomplicated just to fundraise for your album,"
                </span> you say to your screen. It obviously doesn't talk back, 
                because screens are not sentient. Yes, of course, even my fundraising has to be overcomplicated. Nothing is ever easy with me.
                Thus is why, for the first time ever, I am doing an uncapped Project Muse donothon.<br/><br/>
                Here's how it works:<br/>
                - The show starts with a total of 6 songs. Until those songs are completed, the show will not end.<br/>
                - Payment is completed through the portal on this site which you gain access to after signing in via discord.<br/>
                - Once paid, your Discord account will automatically be added to the Project Muse server.<br/>
                <br/>
                For this one-time event, instead of ending after 6 songs, we will continue going; for every 10 participants who register for this special episode, another song will be made.<br/>
                <br/>The show will <b>NOT</b> stop until <b>ALL</b> of those slots have been fulfilled.
                <br/><br/>
                In order to join, please press the button below!<br/><br/>
                
            </span>
            <DiscordButton /><br/><br/>
            {
                localStorage.getItem("discordtoken") !== null &&
                <div>
                    Please press any of the options below to pay for entry and gain access to the Project Muse server!<br/>
                    <PayPalScriptProvider options={{ clientId: "ATKFikjxru9-u-HpvuUXYAfwNl-R6YzOge_NPitvTkh0ulKOZy1UxzK-fIBKIwvna6Cj4uX1MD-RZrvS" }}>
                        <PayPalButtons style={{ layout: "vertical" }} />
                    </PayPalScriptProvider>
                </div>
            }
        </div>
    )
}