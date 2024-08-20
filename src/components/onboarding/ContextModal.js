import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    p: 4,
};

const ModalText = [
    {
        title: "What Are We Looking For In Art References?",
        body: (
        <div>
            In reference links, we are looking for 1 or more links to reference photos of your character
            and 1 link to a reference emote image.<br/><br/>
            In the style notes, we would like you to clarify other details about your character 
            that may help Neptune in the art process!
        </div>
        )
    },
    {
        title: "What Are We Looking For In Song References?",
        body: (
        <div>
            In reference links, we are looking for 2-4 links to existing songs via YouTube, SoundCloud, etc. 
            that will help Wrench with creating your BGM!<br/><br/>
            In the style notes, we would like you to clarify other details about your song request and/or character
            that may help Wrench in the song process!
        </div>
        )
    }
]

export default function ContextModal(props) {
    const [device, setDevice] = useState(0);

    useEffect(() => {
      function handleDeviceDetection() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
        const isTablet =
          /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
  
        if (isMobile) setDevice(1);
        else if (isTablet) setDevice(1);
        else setDevice(0);
      }
  
      handleDeviceDetection();
      window.addEventListener('resize', handleDeviceDetection);
  
      return () => window.removeEventListener('resize', handleDeviceDetection);
    }, []);
    

    return (
        <Modal
            open={props.open}
            onClose={props.onModalClosed}
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                🤔 <span style={{marginLeft: "5px"}}> {ModalText[props.modalType].title} </span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {ModalText[props.modalType].body}<br/>
                <p style={{fontSize: "10pt", textAlign: "center"}}>{device === 0 ? "Click" : "Press" } anywhere outside of this popup to close it and return to the form!</p>
            </Typography>
            </Box>
        </Modal>
    )
}