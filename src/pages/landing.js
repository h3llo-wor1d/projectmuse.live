import { useNavigate } from "react-router-dom";
import DiscordButton from "../components/DiscordButton";
import '../style/pages/landing.css';
import { useEffect } from "react";

export default function Landing(props) {

    const navigate = useNavigate();

    function goToOnboard() {
        navigate('/onboarding/info');
    }

    useEffect(() => {
        if (localStorage.getItem("discordtoken") !== undefined) {
            goToOnboard();
        }
    }, [])
    
    return (
        <div className="landing-flex">
            <img src="assets/icons/icon_color.png" alt="muse logo" className="logo"/><br/><br/>
            <span className="landing-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sit amet est placerat in. Lacinia at quis risus sed. Amet porttitor eget dolor morbi non arcu risus quis. Quisque non tellus orci ac auctor augue mauris augue. Risus viverra adipiscing at in. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. A erat nam at lectus urna. Eu facilisis sed odio morbi quis commodo odio.<br/><br/>
            Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Pretium nibh ipsum consequat nisl vel. Euismod lacinia at quis risus. Blandit aliquam etiam erat velit. Etiam tempor orci eu lobortis elementum nibh tellus. Vulputate mi sit amet mauris commodo quis imperdiet massa. Eget dolor morbi non arcu risus quis varius quam. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Maecenas pharetra convallis posuere morbi leo urna. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Non sodales neque sodales ut. Pulvinar neque laoreet suspendisse interdum.
            <br/><br/>
            {
                localStorage.getItem("discordtoken") === null && <DiscordButton />
            }
            </span>
            <br/><br/>
        </div>
    )
}