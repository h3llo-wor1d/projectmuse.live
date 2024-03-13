import { useState } from 'react';
import '../style/components/discordButton.css';

export default function RejoinButton(props)  {
    const [success, setSuccess] = useState(false);
    const handleLogin = async () => {
        let f1 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/rejoin-server",
        {
            method: "POST",
            body: JSON.stringify({
                discordID: localStorage.getItem("discordid"),
                discordToken: localStorage.getItem("discordtoken")
            })
        })

        if (f1.status === 200) {
            setSuccess(true)
        }
    }

    return (
        <div 
            className="socialLoginButton" 
            style={{backgroundColor: "#5165F6", color: "white"}}
            onClick={handleLogin}
        >
            {success === true ?
                <span className="rainbow rainbow_text_animated">
                    Successfully added back to server!
                </span> :
                <div style={{lineHeight: "normal", verticalAlign: "middle", height: "24px"}} >
                    <img style={{verticalAlign: "middle", height: "24px", marginRight: "15px"}} src={`assets/icons/discord.svg`} alt={"discord"} />
                    <span>Re-Join Discord Server</span>
                </div>
            }
            
        </div>
    )
}