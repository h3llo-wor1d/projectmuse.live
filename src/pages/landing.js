import { useNavigate } from "react-router-dom";
import DiscordButton from "../components/DiscordButton";
import '../style/pages/landing.css';
import { useEffect } from "react";
import { Link } from '@mui/material';

export default function Landing(props) {

    const navigate = useNavigate();

    function goToOnboard() {
        navigate('/onboarding/info');
    }

    useEffect(() => {
        if (localStorage.getItem("discordtoken") !== null) {
            goToOnboard();
        }
    }, [])
    
    return (
        <div className="landing-flex">
            <img src="assets/icons/icon_color.png" alt="muse logo" className="logo"/><br/><br/>
            <span className="landing-caption">
            Welcome to Project Muse! If this is your first time with us, the show has changed! Originally, Project Muse was initially just a live BGM raffle, 
            but now functions as a live emote AND bgm raffle, where we will interview you at random through discord and make you art within an hour or less!<br/><br/>

            This season is incredibly special, because we have transitioned from a solo show into a couples show! My boyfriend, <Link href="https://x.com/aliens_gate" target="_blank" underline="hover"
            key="2"
            color="yellow">Neptune</Link> has joined the team! He has been my artist for almost 2 and a half years, and to say it's crazy to call him mine would be an understatement.<br/><br/>
            
            Alas, you are not here to read about my love life! In order to actually participate in the show, we need you to sign in with Discord! 
            We use this data to automatically add you to the server
            and autofill out some of the details of the registration form on the next page to make things easier for you.
            <br/><br/>
            {
                localStorage.getItem("discordtoken") === null && <DiscordButton />
            }
            </span>
            <br/><br/>
        </div>
    )
}