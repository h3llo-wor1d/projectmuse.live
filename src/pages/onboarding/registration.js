import { Add, NavigateNext, PlusOne, Remove } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Collapse, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import MuseLogo from '../../images/icon_color.png';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import DiscordButton from "../../components/DiscordButton";
import { v4 as uuidv4 } from 'uuid';
import { artLinkHandler } from "../../functions/registrationHandlers";
import { getItem, setItem } from "../../functions/storageHandler";

Array.prototype.stringify = function (arr) {
    return JSON.stringify(arr);
}

const Page = styled.div `
    padding: 30px 30px 30px 30px;
`

const platforms = [
    {label: "None", value: 'none'},
    {label: "Twitch", value: "twitch"},
    {label: "YouTube", value: 'youtube'},
    {label: "Twitter/X", value: 'twitter'},
    {label: "TikTok", value: 'tiktok'},
    {label: "Other", value: 'other'}
]

const sleep = s => new Promise(r => setTimeout(r, s*1000));

export default function Registration(props) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
    const [formData, setFormData] = useState({}); // get from localStorage as well?
    const [artLinks, setArtLinks] = useState();
    const [platformURL, setPlatformURL] = useState("");
    const [currentPlatform, setCurrentPlatform] = useState("none");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const handleError = async (e) => {
        setError(e);
        setIsError(true);
        await sleep(2);
        setIsError(false);
    }

    const handleChange = (objType, data) => {
        console.log(artLinks)
        switch (objType) {
            case "artLink":
                let links = Array(4).join(".").split(".");
                if (getItem("artLinks") === null) {
                    setItem("artLinks", links.stringify());
                } else {
                    links = JSON.parse(getItem("artLinks"))
                }
                console.log(links)
                return;
            default:
                return;
        }
    }

    const onPlatformChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === "none") {
            setPlatformURL("");
        }
        setCurrentPlatform(e.target.value);
        setFormData({...formData, preferredSocial: e.target.value});
        console.log(JSON.stringify(formData, null, 4));
        if (Object.keys(userData.socials).indexOf(e.target.value) !== -1) {
            setPlatformURL(userData.socials[e.target.value])
            setFormData({...formData, socialURL: userData.socials[e.target.value]})
            
        }
    }

    const onPlatformUrlChange = e => {
        setPlatformURL(e.target.value);
        setFormData({...formData, socialURL: e.target.value});
        console.log(JSON.stringify(formData, null, 4));
    }

    const breadcrumbs = [
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/onboarding/info"
        >
          Info & Instructions
        </Link>,
        <Typography key="3" color="text.primary">
            Registration
        </Typography>,
    ];
    return (
        <Page>
            <Collapse in={isError} sx={{position: "fixed", right: 0, bottom: 0}}>
                <Alert
                    severity="error"
                    variant="filled"
                    >
                    {error}
                </Alert>
            </Collapse>
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
            <br/>
            <Box>
                <Typography sx={{marginBottom: "20px"}}>
                    A. Basic Information
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "25px"
                }}>
                    <TextField 
                        label="Your Name" 
                        variant="outlined" 
                        defaultValue={userData.global_name}
                        fullWidth 
                        helperText={"This is taken from your Discord account by default, feel free to change it!"} 
                    />
                    <TextField 
                        label="Your Pronouns" 
                        variant="outlined" 
                        defaultValue={userData.pronouns}
                        fullWidth 
                        helperText={"This is taken from your Discord account by default, feel free to change it!"} 
                    />
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        <TextField 
                            label="Streaming Platform" 
                            select
                            onChange={onPlatformChange}
                            helperText={"Some of these are taken from your Discord account by default, feel free to change them!"}
                            variant="outlined" 
                            required
                            defaultValue={"none"}
                            sx={{flex: "35%"}}
                        >
                            {platforms.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            label={currentPlatform === "youtube" ? "Account URI" : "Account Username" }
                            variant="outlined" 
                            required
                            disabled={currentPlatform==="none"}
                            value={platformURL}
                            onChange={onPlatformUrlChange}
                            sx={{flex: "35%"}}
                        />
                    </Box>
                </Box>
            </Box><br/><br/>
            <Box>
                <Typography>
                    B. Song and Art References
                </Typography><br/>
                <Box>
                    <p style={{fontSize: "11pt", marginBottom: "10px"}}>Song References</p>
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        {
                            Array.apply(null, Array(4)).map((i, v) => v).map((v, i) => 
                                <TextField 
                                    label={`Reference Link ${i+1}`}
                                    variant="outlined" 
                                    required={i < 2}
                                    sx={{flex: "35%"}}
                                />
                            )
                        }
                    </Box>
                </Box>
                <br/><br/>
                <Box>
                    <p style={{fontSize: "11pt", marginBottom: "10px"}}>Art References</p>
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        {
                            Array.apply(null, Array(4)).map((i, v) => v).map((v, i) => 
                                <TextField 
                                    label={`Reference Link ${i+1}`}
                                    variant="outlined" 
                                    onChange={(e) => handleChange("artLink", {index: i, value: e.target.value})}
                                    required={i < 2}
                                    sx={{flex: "35%"}}
                                />
                            )
                        }
                    </Box>
                </Box>
            </Box>
            <br/><br/>
        </Page>
    )
}