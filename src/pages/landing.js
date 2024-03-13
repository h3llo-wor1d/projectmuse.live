import DiscordButton from "../components/DiscordButton";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import '../style/pages/landing.css';
import RejoinButton from "../components/RejoinButton";

export default function Landing(props) {
    async function createOrder() {
        const response = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const orderData = await response.json();
        
        if (orderData.id) {
            return orderData.id;
        } else {
            console.error("Failed to get payment id from PayPal api!")
        }
    }

    async function onApprove(data) {
        const response = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID,
            discordID: localStorage.getItem("discordid"),
            discordToken: localStorage.getItem("discordtoken")
          })
        })

        // NOTE TO PEOPLE WHO THINK THEY CAN BYPASS THIS
        // YOU'RE NOT HOT SHIT! MY SERVER STORES YOUR USER ID WHEN YOU PAY SO YOU CAN GET ACCESS BACK INTO THE SERVER IF YOU LEAVE BY ACCIDENT
        // YOU CANNOT CHANGE THIS AND GET ENTRY, IT WILL NOT WORK!!!

        localStorage.setItem("hasPaidForMuse", "true")

        const orderData = await response.json();
        console.log(JSON.stringify(orderData, null, 4));
        console.log("Transaction approved? It wasn't that bad after all...")
    }

    const ButtonStuff = (props) => {
        if (localStorage.getItem("hasPaidForMuse") === "true") {
            return (
                <div>
                    <span className="landing-caption">
                        <span className="rainbow rainbow_text_animated">
                            It looks like you have already paid for this event!
                        </span><br/>
                        If you have left the server by accident, you can be re-invited by pressing the button below!<br/><br/>
                        <RejoinButton />
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    {
                        localStorage.getItem("discordtoken") !== null ?
                        <span className="landing-caption">Please press any of the options below to pay for entry and gain access to the Project Muse server!<br/></span>
                        :
                        <span className="landing-caption">In order to join, please press the button below!<br/><br/></span>
                    }
                    <br/>
                    {
                        localStorage.getItem("discordtoken") !== null ?
                            <PayPalScriptProvider options={{ clientId: "ATKFikjxru9-u-HpvuUXYAfwNl-R6YzOge_NPitvTkh0ulKOZy1UxzK-fIBKIwvna6Cj4uX1MD-RZrvS" }}>
                                <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />
                            </PayPalScriptProvider>
                            :
                        <div>
                            <DiscordButton />
                        </div>
                    }
                </div>
            )
        }
                
    }

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
                <ButtonStuff />
            </span>
            <br/><br/>
        </div>
    )
}