import styled from 'styled-components';
import MuseLogo from '../../images/icon_color.png';
import InfoBlock from '../../components/onboarding/InfoBlock';
import { Breadcrumbs, Link, Paper, Typography } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import { NavigateNext } from '@mui/icons-material';
import { commonFAQ } from '../../data/commonFAQ';
import dnd from '../../images/status/dnd.png';
import idle from '../../images/status/idle.png';
import online from '../../images/status/online.png';
import invis from '../../images/status/invis.png';
import { otherFAQ } from '../../data/otherFAQ';

const Page = styled.div `
    padding: 30px 30px 30px 30px;
    z-index: 0;
`

export default function InfoPage(props) {
    const [canProgress, setCanProgress] = React.useState(localStorage.getItem("progressAllowed") !== null); 

    const breadcrumbs = [
        <Typography key="3" color="text.primary">
            Info & Instructions
        </Typography>,
        canProgress ? <Link
          underline="hover"
          key="2"
          color="inherit"
          href={"/onboarding/registration"}
        >
          Registration
        </Link> : <Typography key="3" color="text.primary">
            Registration
        </Typography>,
      ];
    
    return (    
        <Page>
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                zIndex: 0,
            }}>
                <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{
                       
                        padding: "10px 20px 10px 30px",
                        borderTopRightRadius: "30px",
                        backgroundColor: "grey"
                    }} 
                    >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <div style={{textAlign: "center"}}>
                <img src={MuseLogo} alt="muse logo" className="logo" />
            </div>
            <br/><br/>
            <div>
                <InfoBlock subheading={"Information On The Show"} emoji={"💫"}
                tooltip={"Small introductory segment about the show"}
                p={
                    <p style={{marginTop: "5px"}}>
                        A common misconception is that this is just a normal interview show. Project Muse, however, 
                        doubles as a live BGM <b>AND</b> art raffle as well, in which you get picked at random, interviewed, and then 
                        made music for, all in an hour or less.<br/>
                        <br/>
                        More information on how the show runs is available below!
                    </p>
                } /><br/>
                <InfoBlock subheading={"Required Steps To Participate"} 
                tooltip={"The steps you must take to participate and receive free art and music!"}
                emoji={"‼"} p={
                    <p style={{marginTop: "5px"}}>
                        In order to participate in the show, all participants must fill out the form on the next page. If the form is not filled out, you CANNOT be picked.<br/><br/>
                        The form allows myself and Neptune to have a better idea of the style of art and music you are looking for and provide a better end result.
                        It is around 10 questions, most of which may have been pre-filled using data on your profile.<br/><br/>
                        Additionally, failure to join the Show VC within 60 seconds of invitation will result being skipped.
                    </p>
                } /><br/>
                <InfoBlock subheading={"Commonly Asked Questions Regarding Registration"} 
                tooltip={"Brief FAQ for registration"}
                emoji={"🤔"} p={
                    <div style={{marginTop: "5px", display: "grid", gridTemplateColumns: "auto", rowGap: "30px"}}>
                        {
                            commonFAQ.map(i => <div>
                                <h3>"{i[0]}"</h3>
                                <div style={{display: "grid", gridTemplateColumns: "10px auto", columnGap: "10px", marginTop: "8px"}}>
                                    <div style={{width: "8px", height: "100%", borderRadius: "30px", backgroundColor: "grey"}} />
                                    <p>{i[1]}</p>
                                    </div>
                            </div>)
                        }
                    </div>
                } /><br/>
                <InfoBlock subheading={"Information on the picking process"} 
                tooltip={"Explaining how user selection works for Project Muse"}
                emoji={"📋"} p={
                    <p style={{marginTop: "5px"}}>
                        When the stream starts, on my command, the bot will randomly select <b>REGISTERED</b> and <b>NON-INVISIBLE</b> members to join a channel called ⁠Picked VC. 
                        If you have been picked, you will be pinged and have <b>60 seconds</b> to join the VC, or you will be skipped! 
                        Inside the VC, I will interview you, and then Neptune and I will create work based on the form you've submitted! 
                        <div style={{display: "grid", gridTemplateColumns: "10px auto", columnGap: "10px", marginTop: "10px"}}>
                            <div style={{width: "8px", height: "100%", borderRadius: "30px", backgroundColor: "grey"}} />
                            <p>If I do not finish the track and/or Neptune does not finish the art on-stream within the hour time limit (and it is not beyond my ability at the time), we will finish it off-stream and send it to you</p>
                        </div><br/>
                        To better clarify <b>non-invisible</b> statuses, here is a list of statuses the bot <b>will</b> pick:<br/>
                        <div style={{display: "grid", gridTemplateColumns: "10px auto", columnGap: "10px", marginTop: "10px", marginBottom: "10px"}}>
                            <div style={{width: "8px", height: "100%", borderRadius: "30px", backgroundColor: "grey"}} />
                            <p>
                                <div style={{display: "flex", alignItems: "center", marginBottom: "5px"}}>
                                <img src={dnd} alt="dnd" style={{"height": "14pt", verticalAlign: "middle", marginRight: 8}} /><span>Do Not Disturb</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginBottom: "5px"}}>
                                <img src={idle} alt="dnd" style={{"height": "14pt", verticalAlign: "middle", marginRight: 8}} /><span>Idle</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                <img src={online} alt="dnd" style={{"height": "14pt", verticalAlign: "middle", marginRight: 8}} /><span>Online</span>
                                </div>
                            </p>
                        </div><br/>
                        The bot will <b>NOT</b> pick you if you have
                        <div style={{display: "grid", gridTemplateColumns: "10px auto", columnGap: "10px", marginTop: "10px", marginBottom: "10px"}}>
                            <div style={{width: "8px", height: "100%", borderRadius: "30px", backgroundColor: "grey"}} />
                            <p>
                                <div style={{display: "flex", alignItems: "center"}}>
                                <img src={invis} alt="invis" style={{"height": "14pt", verticalAlign: "middle", marginRight: 8}} /><span>Invisible/Offline</span>
                                </div>
                            </p>
                        </div>
                        set as your status, or if you have opted into getting temporarily skipped in advanced settings!
                    </p>
                } /><br/>
                <InfoBlock subheading={"Other Commonly Asked Questions"} 
                tooltip={"More frequently asked questions regarding the show's operations!"}
                emoji={"❓"} p={
                    <div style={{marginTop: "5px", display: "grid", gridTemplateColumns: "auto", rowGap: "30px"}}>
                        {
                            otherFAQ.map(i => <div>
                                <h3>"{i[0]}"</h3>
                                <div style={{display: "grid", gridTemplateColumns: "10px auto", columnGap: "10px", marginTop: "8px"}}>
                                    <div style={{width: "8px", height: "100%", borderRadius: "30px", backgroundColor: "grey"}} />
                                    <p>{i[1]}</p>
                                    </div>
                            </div>)
                        }
                    </div>
                } />
                {
                // fix styling issues to automatically wrap on mobile devices as well
                canProgress !== true && <Paper elevation={2} sx={{width: "500px", padding: "20px 20px 20px 20px"}}>
                    I acknowledge that I have read everything on this page! I will not ask stupid questions in the server because I missed a part. I understand that I will be profusely complained to if I do that!<br/><br/>
                    <Button variant="outlined" onClick={() => {
                        localStorage.setItem("progressAllowed", "true");
                        setCanProgress(true);
                        window.location.href="/onboarding/registration";
                    }}>I Acknowledge</Button>
                </Paper>}<br/>
            </div>
        </Page>
    )
}