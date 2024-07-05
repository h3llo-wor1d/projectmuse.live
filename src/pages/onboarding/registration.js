import { Add, NavigateNext, PlusOne, Remove } from "@mui/icons-material";
import { Alert, Box, Breadcrumbs, Collapse, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import MuseLogo from '../../images/icon_color.png';
import styled from 'styled-components';
import { useEffect, useState } from "react";

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
    const [rawImages, setRawImages] = useState([]);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [platformURL, setPlatformURL] = useState("");
    const [currentPlatform, setCurrentPlatform] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const handleError = async (e) => {
        setError(e);
        setIsError(true);
        await sleep(2);
        setIsError(false);
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

    const handleCreateNewImage = () => {

        // Various error messages //
        if (currentImage === "") {
            setTimeout(() => handleError("Image reference cannot be empty!"));
            return;
        }
        if (currentImage.startsWith("http") !== true) {
            setTimeout(() => handleError("Image reference must be a valid URL!"));
            return;
        }
        // todo: pretty animation in for new element
        setRawImages([...rawImages, currentImage])
        setImages([...images, <FormControl sx={{ width: '95%', position: "relative", left: "50%", transform: "translateX(-50%)", marginTop: "25px" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Reference Image</InputLabel>
            <OutlinedInput
                fullWidth={true}
                id="outlined-adornment-password"
                value={currentImage}
                disabled
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => console.log("todo: remove image")}
                    edge="end"
                    >
                        <Remove htmlColor={"#a52422"} />
                    </IconButton>
                </InputAdornment>
                }
                label="Reference Image"
            />
        </FormControl>])
        setCurrentImage("");
    }

    const handleChange = (e) => {
        setCurrentImage(e.target.value);
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
                        <TextField 
                            label="Reference Link 1" 
                            variant="outlined" 
                            required
                            sx={{flex: "35%"}}
                        />
                        <TextField 
                            label="Reference Link 2" 
                            variant="outlined" 
                            required
                            sx={{flex: "35%"}}
                        />
                        <TextField 
                            label="Reference Link 3" 
                            variant="outlined" 
                            sx={{flex: "35%"}}
                        />
                        <TextField 
                            label="Reference Link 4" 
                            variant="outlined" 
                            sx={{flex: "35%"}}
                        />
                    </Box>
                </Box>
                <br/>
                <Box>
                    <p style={{fontSize: "11pt", marginBottom: "10px"}}>Image References</p>
                    <Paper >

                        <FormControl sx={{ width: '95%', position: "relative", left: "50%", transform: "translateX(-50%)", marginTop: "25px" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Image Link (Imgur, Discord, etc.)</InputLabel>
                            <OutlinedInput
                                fullWidth={true}
                                id="outlined-adornment-password"
                                value={currentImage}
                                onChange={handleChange}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleCreateNewImage}
                                    edge="end"
                                    >
                                        <Add htmlColor={"#358600"} />
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Image Link (Imgur, Discord, etc.)"
                            />
                        </FormControl><br/><br/>
                        <Paper elevation={5} sx={{height: "300px", overflowY: "scroll"}}>
                            {images}
                        </Paper>
                    </Paper>
                </Box>
            </Box>
            <br/>
        </Page>
    )
}