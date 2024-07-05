import styled from 'styled-components';
import MuseLogo from '../../images/icon_color.png';
import InfoBlock from '../../components/onboarding/InfoBlock';
import VideoPlayer from '../../components/onboarding/VideoPlayer';
import { Alert, Breadcrumbs, Chip, Link, Modal, Typography } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import VineBoom from '../../audio/vine-boom.mp3';
import RipNTear from '../../audio/RipNTear.flac';
import { NavigateNext } from '@mui/icons-material';

const Page = styled.div `
    padding: 30px 30px 30px 30px;
`

const VideoWrapper = styled.div `
margin: 0;
z-index: 99;
position: absolute;
width: 100%;
height: 100%;
`

const sleep = s => new Promise(r => setTimeout(r, s*1000));

const spawnItemWrapper = styled.div `
margin: 0;
z-index 999;
position: fixed;
width: 100%;
height: 100%;
`


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };
  

export default function InfoPage(props) {
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(1);
    const [insertText, setInsertText] = React.useState("Yo dude chill tf out!!!");
    const [videoPlayers, setVideoPlayers] = React.useState([]);
    const [achieveOpen, setAchieveOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [adhdMode, setAdhdMode] = React.useState(true);
    const [canProgress, setCanProgress] = React.useState(true); 
    // set to false for prod and only set to true when user presses "I UNDERSTAND AND HAVE READ THE ENTIRE PAGE" at bottom

    const breadcrumbs = [
        <Typography key="3" color="text.primary">
            Info & Instructions
        </Typography>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href={canProgress ? "/onboarding/registration" : "#"}
        >
          Registration
        </Link>,
      ];

    var audioPlayer = new Audio(RipNTear);

    const handleAchievement = async () => {
        setAchieveOpen(true);
        await sleep(5);
        setAchieveOpen(false);
    }

    const handleRemoveAll = async () => {
        audioPlayer.pause();
        setVideoPlayers([]);
        setAdhdMode(false);
        setModalOpen(true);
    }

    const handleClick = () => {
        //new Audio(VineBoom).play();
        switch (count) {
            case 15:
                setTimeout(() => {
                    handleAchievement()
                }, []);
                break;
            case 20:
                setInsertText("Oh fuck, now you've done it...");
                audioPlayer.play();
                setTimeout(() => {
                    handleAchievement()
                }, []);
                setTimeout(() => {
                    handleRemoveAll()
                }, 30000)
                break;
            default:
                break;
        }
        setCount(count+1);
        setVideoPlayers([...videoPlayers, <VideoPlayer />]);
        setOpen(!open);
    }
    
    return (    
        <Page>
            <Modal
                open={modalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    this is why we cannot have nice things.<br/>
                    i must take this power away from you.<br/>
                    press "ok" to go back to reading the information page.<br/><br/>
                    <Button sx={{position: "relative", left: "50%", transform: "translateX(-50%)"}} onClick={() => setModalOpen(false)}>ok</Button>
                </Box>
            </Modal>
            <spawnItemWrapper>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        Spawned one more TikTok! Enjoy your brainrot!~
                    </Alert>
                </Collapse>
                {adhdMode && <Chip label="ADHD Mode" onClick={handleClick} sx={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    zIndex: 99999
                }} />}
                <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99999,
                        padding: "10px 20px 10px 30px",
                        borderTopRightRadius: "30px",
                        backgroundColor: "rgba(255,255,255,0.15)"
                    }} 
                    >
                    {breadcrumbs}
                </Breadcrumbs>
                <Collapse in={achieveOpen} sx={{position: "absolute", left: 0, bottom: 0}}>
                    <Alert
                        severity="info"
                        sx={{ mb: 2 }}
                        >
                        {insertText}
                    </Alert>
                </Collapse>
            </spawnItemWrapper>
            <VideoWrapper>
                {videoPlayers}
            </VideoWrapper>
            <div style={{textAlign: "center"}}>
                <img src={MuseLogo} alt="muse logo" className="logo" />
            </div>
            <br/>
            <InfoBlock subheading={"Information On The Show"} emoji={"💫"} p={
                <p>
                    A common misconception is that this is just a normal interview show. Project Muse, however, 
                    doubles as live BGM raffle as well, in which you get picked at random, interviewed, and then 
                    made music for, all in an hour or less.<br/>
                    <br/>
                    More information on how the show runs is available below!
                </p>
            } />
            <InfoBlock subheading={"Required Steps To Participate"} emoji={"‼"} p={
                <p>
                    In order to participate in the show, all participants must fill out the form on the next page. If the form is not filled out, you CANNOT be picked.<br/><br/>
                    The form allows myself and Neptune to have a better idea of the style of art and music you are looking for and provide a better end result.
                    It is around 10 questions, most of which may have been pre-filled using data on your profile.<br/><br/>
                    Additionally, failure to join the Show VC within 60 seconds of invitation will result being skipped.
                </p>
            } />
            
        </Page>
    )
}