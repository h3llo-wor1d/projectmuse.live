import '../style/components/discordButton.css';

// sandbox url
const AUTH_URL = "https://discord.com/oauth2/authorize?client_id=1023694867798441984&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&scope=identify+guilds.join";

// final url
const FINAL_URL = "https://discord.com/oauth2/authorize?client_id=1023694867798441984&response_type=code&redirect_uri=https%3A%2F%2Fprojectmuse.live%2Fredirect&scope=identify+guilds.join";


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