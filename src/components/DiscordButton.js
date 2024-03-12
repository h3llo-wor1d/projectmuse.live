import '../style/components/discordButton.css';

const AUTH_URL = "https://discord.com/oauth2/authorize?response_type=token&client_id=1037377769056780369&scope=identify";

export default function DiscordButton(props)  {
    const handleLogin = () => {
        let newwindow=window.open(AUTH_URL,'name','height=700,width=900');
        if (window.focus) {newwindow.focus()}
    }

    return (
        <div 
            className="socialLoginButton" 
            style={{backgroundColor: "#5165F6", color: "white"}}
            onClick={handleLogin}
        >
            <div style={{lineHeight: "normal", verticalAlign: "middle", height: "24px"}} >
                <img style={{verticalAlign: "middle", height: "24px", marginRight: "15px"}} src={`assets/icons/discord.svg`} alt={"discord"} />
                <span>Sign In To Continue</span>
            </div>
        </div>
    )
}