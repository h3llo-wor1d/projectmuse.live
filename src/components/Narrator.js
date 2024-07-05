import { SpeakerNotes, SpeakerNotesOff } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

export default function Narrator(props) {
    const [isActive, setIsActive] = useState(false);
    var audioPlayer = new Audio(props.src);

    const handleClick = () => {
        // weird bug where it multiplies audio. oh well.
        let active = !isActive;
        try {
            audioPlayer.removeEventListener("ended")
        } catch {}
        setIsActive(active);
        if (active) {
            audioPlayer.src = props.src;
            audioPlayer.play(); 
            audioPlayer.addEventListener("ended", function(){
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                setIsActive(false);
            });
            
            return;
        }
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    return (
        <Tooltip arrow title={"Narrate this section of the information page"} sx={{marginLeft: "10px", zIndex: 9999999}} placement={"top"}>
            <IconButton onClick={handleClick}>
                {!isActive ? <SpeakerNotes /> : <SpeakerNotesOff />}
            </IconButton>
        </Tooltip>
    )
}