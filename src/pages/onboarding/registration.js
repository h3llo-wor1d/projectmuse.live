import { Add, NavigateNext, PlusOne, Remove } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Button, Collapse, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import MuseLogo from '../../images/icon_color.png';
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import DiscordButton from "../../components/DiscordButton";
import { v4 as uuidv4 } from 'uuid';
import { artLinkHandler } from "../../functions/registrationHandlers";
import { getItem, getItemJSON, setItem } from "../../functions/storageHandler";
import { Identity } from "../../identity";

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
    const [formData, setFormData] = useState({}); // get from localStorage as well?
    const [platformURL, setPlatformURL] = useState("");
    const [currentPlatform, setCurrentPlatform] = useState("none");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const [artError, setArtError] = useState(false);
    const [songError, setSongError] = useState(false);

    var artLinks = getItem(`artLinks`) !== null ? JSON.parse(getItem(`artLinks`)) : ["","","",""];
    var songLinks = getItem(`songLinks`) !== null ? JSON.parse(getItem(`songLinks`)) : ["","","",""];
    var identity = getItem(`identity`) !== null ? JSON.parse(getItem(`identity`)) : JSON.parse(JSON.stringify({...JSON.parse(getItem("userData")), social_url: "", preferred_social: "none"}));
    var songStyle = getItem(`musicStyleNotes`) !== null ? JSON.parse(getItem(`musicStyleNotes`)) : "";
    var artStyle = getItem(`artStyleNotes`) !== null ? JSON.parse(getItem(`artStyleNotes`)) : "";
    const handleError = async (e) => {
        setError(e);
        setIsError(true);
        await sleep(2);
        setIsError(false);
    }

    const handleSubmit = () => {
        var chunk1 = JSON.parse(getItem(`artLinks`));
        var chunk2 = JSON.parse(getItem(`songLinks`));
        var chunk3 = JSON.parse(getItem(`identity`));
        var out = {
            artData: {
                refLinks: chunk1,
                styleNotes: getItem("artStyleNotes")
            },
            songData: {
                refLinks: chunk2,
                styleNotes: getItem("musicStyleNotes")
            },
            identity: {
                global_name: chunk3.global_name,
                pronouns: chunk3.pronouns,
                social_url: chunk3.social_url,
                preferred_social: chunk3.preferred_social
            }
        } 
        console.log(out);
    }

    useEffect(() => {
        const canister = JSON.stringify(["","","",""]);
        if (getItem(`artLinks`) === null) setItem('artLinks', canister);
        if (getItem(`songLinks`) === null) setItem('songLinks', canister);
        if (getItem(`identity`) === null) setItem('identity', JSON.stringify({...JSON.parse(getItem("userData")), social_url: "", preferred_social: "none"}));
    }, [])

    const handleChange = (objType, data) => {
        switch (objType) {
            case "link":
                let links = JSON.parse(getItem(`${data.type}Links`));
                links[data.index] = data.value
                setItem(`${data.type}Links`, JSON.stringify(links));
                return;
            case "identity":
                let old = JSON.parse(getItem("identity"));
                old[data.type] = data.value;
                setItem("identity", JSON.stringify(old));
                return;
            case "style":
                switch (data.type) {
                    case "art":
                        setItem("artStyleNotes", data.value);
                        break;
                    case "music":
                        setItem("musicStyleNotes", data.value);
                        break;
                    default:
                        return;
                }
                break;
            default:
                return;
        }
    }

    const checkArtErrors = () => {
        let artLinks = getItemJSON("artLinks");
        let i = 0;
        artLinks.forEach(it => {
            if (!it.startsWith("http") && it.length > 0) i++;
        })

        if (i > 0) return 101;
        if (artLinks[0] === "" || artLinks[1] === "") return 100;
        
        // default case
        return false;
    }

    const checkSongErrors = () => {
        let artLinks = getItemJSON("songLinks");
        let i = 0;
        artLinks.forEach(it => {
            if (!it.startsWith("http") && it.length > 0) i++;
        })

        if (i > 0) return 101;
        if (artLinks[0] === "" || artLinks[1] === "") return 100;
        
        // default case
        return false;
    }

    const checkErrors = () => {
        switch (checkArtErrors()) {
            case 100:
                handleError("Missing required fields!");
                setArtError(100);
                return false;
            case 101:
                handleError("Invalid url provided in one or more fields!");
                setArtError(101);
                return false;
            default:
                break;
        }
        switch (checkSongErrors()) {
            case 100:
                handleError("Missing required fields!");
                setSongError(100);
                return false;
            case 101:
                handleError("Invalid url provided in one or more fields!");
                setSongError(101);
                return false;
            default:
                break;
        }
        return true;
    }

    const submitForm = () => {
        if (checkErrors() === false) return;
        console.log("apparently no errors!")
    }

    const onPlatformChange = (e) => {
        handleChange("identity", {type: "preferred_social", value: e.target.value})
        let userData = JSON.parse(getItem('userData'));
        if (e.target.value === "none") {
            setPlatformURL("");
        }
        setCurrentPlatform(e.target.value);
        if (Object.keys(userData.socials).indexOf(e.target.value) !== -1) {
            handleChange("identity", {type: "social_url", value:  userData.socials[e.target.value]})
            setPlatformURL(userData.socials[e.target.value])
        }
    }

    const onPlatformUrlChange = e => {
        handleChange("identity", {type: "social_url", value: e.target.value})
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
            <Collapse in={isError} sx={{position: "fixed", right: 0, top: 0}}>
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
                        defaultValue={identity.global_name}
                        fullWidth 
                        helperText={"This is taken from your Discord account by default, feel free to change it!"} 
                    />
                    <TextField 
                        label="Your Pronouns" 
                        variant="outlined" 
                        defaultValue={identity.pronouns}
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
                            defaultValue={identity.preferred_social}
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
                            defaultValue={identity.social_url}
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
                    <p style={{fontSize: "11pt", marginBottom: "12px"}}>Song References</p>
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        <TextField 
                            label={`Reference Link 1`}
                            variant="outlined" 
                            defaultValue={songLinks[0]}
                            onChange={(e) => handleChange("link", {index: 0, value: e.target.value, type: 'song'})}
                            required={true}
                            sx={{flex: "35%"}}
                            onClick={() => setSongError(0)}
                            error={songError === 100 || songError === 101}
                        />
                        <TextField 
                            label={`Reference Link 2`}
                            variant="outlined" 
                            defaultValue={songLinks[1]}
                            onChange={(e) => handleChange("link", {index: 1, value: e.target.value, type: 'song'})}
                            required={true}
                            sx={{flex: "35%"}}
                            onClick={() => setSongError(0)}
                            error={songError === 100 || songError === 101}
                        />
                        {
                            Array.apply(null, Array(2)).map((i, v) => v).map((v, i) => 
                                <TextField 
                                    label={`Reference Link ${i+3}`}
                                    variant="outlined" 
                                    defaultValue={songLinks[i+2]}
                                    onClick={() => {
                                        if (songError === 101) setSongError(0);
                                    }}
                                    error={songError === 101}
                                    onChange={(e) => handleChange("link", {index: i+2, value: e.target.value, type: 'song'})}
                                    sx={{flex: "35%"}}
                                />
                            )
                        }
                        <TextField multiline required fullWidth label="Style Notes/Other Notes" rows={3}
                        onChange={(e) => handleChange("style", {value: e.target.value, type: 'music'})}
                        defaultValue={songStyle}
                        />
                    </Box>
                </Box>
                <br/><br/>
                <Box>
                    <p style={{fontSize: "11pt", marginBottom: "12px"}}>Art References</p>
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        <TextField 
                            label={`Reference Link 1`}
                            variant="outlined" 
                            defaultValue={artLinks[0]}
                            sx={{flex: "35%"}}
                            required
                            onChange={(e) => handleChange("link", {index: 0, value: e.target.value, type: 'art'})}
                            error={artError === 100 || artError === 101}
                            onClick={() => setArtError(0)}
                        />
                        <TextField 
                            label={`Reference Link 2`}
                            variant="outlined" 
                            defaultValue={artLinks[1]}
                            sx={{flex: "35%"}}
                            error={artError === 100 || artError === 101}
                            required
                            onChange={(e) => handleChange("link", {index: 1, value: e.target.value, type: 'art'})}
                            onClick={() => setArtError(0)}
                        />
                        {
                            Array.apply(null, Array(2)).map((i, v) => v).map((v, i) => 
                                <TextField 
                                    label={`Reference Link ${i+3}`}
                                    variant="outlined" 
                                    error = {artError === 101}
                                    onChange={(e) => handleChange("link", {index: i+2, value: e.target.value, type: 'art'})}
                                    defaultValue={artLinks[i+2]}
                                    onClick={() => {
                                        if (artError === 101) setArtError(0)
                                    }}
                                    sx={{flex: "35%"}}
                                    
                                />
                            )
                        }
                        <TextField multiline 
                        required 
                        fullWidth label="Style Notes/Other Notes" 
                        onChange={(e) => handleChange("style", {value: e.target.value, type: 'art'})}
                        rows={3} defaultValue={artStyle} />
                    </Box>
                </Box>
            </Box>
            <br/>
            <Paper sx={{padding: "20px 20px 20px 20px"}}>
                This form can be edited again at any time. Press the button below to gain access to the 
                rest of the server and complete the registration process.<br/><br/>
                <Button variant="outlined" onClick={submitForm}>Submit Form</Button>
            </Paper>
            <br/>
        </Page>
    )
}