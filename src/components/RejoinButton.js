import '../style/components/discordButton.css';

export default function RejoinButton(props)  {
    const handleLogin = async () => {
        await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/rejoin-server",
        {
            method: "POST",
            body: JSON.stringify({
                discordID: localStorage.getItem("discordid"),
                discordToken: localStorage.getItemI("discordtoken")
            })
        })
    }

    return (
        <div 
            className="socialLoginButton" 
            style={{backgroundColor: "#5165F6", color: "white"}}
            onClick={handleLogin}
        >
            <div style={{lineHeight: "normal", verticalAlign: "middle", height: "24px"}} >
                <img style={{verticalAlign: "middle", height: "24px", marginRight: "15px"}} src={`assets/icons/discord.svg`} alt={"discord"} />
                <span>Re-Join Discord Server</span>
            </div>
        </div>
    )
}