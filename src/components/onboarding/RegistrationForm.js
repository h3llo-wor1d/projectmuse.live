import { useForm } from "react-hook-form";
import * as React from "react";
import { Alert, Box, Button, Collapse, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { z } from "zod";
import getInitialData from "../../functions/getInitialData";
import { HelpOutline } from "@mui/icons-material";
import ContextModal from "./ContextModal";

function expand(obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i],
            subkeys = key.split(/,\s?/),
            target = obj[key];
        delete obj[key];
        subkeys.forEach(function(key) { obj[key] = target; })
    }
    return obj;
}

const platforms = [
    {label: "Twitch", value: "twitch"},
    {label: "YouTube", value: 'youtube'},
    {label: "Twitter/X", value: 'twitter'},
    {label: "TikTok", value: 'tiktok'}
]

const formPopup = {
    severity: [
        "error",
        "info",
        "success",
        "error"
    ],
    message: [
        "One or more fields are incorrect.",
        "Submitting form, please wait...",
        "Form submitted successfully!",
        "Failed to submit form. Please try again later."
    ]
}

const formatToAPI = async (d) => {
    return {
        artData: {
            refLinks: [
                d.artRef1,
                d.artRef2,
                d.artRef3 !== "" && d.artRef3,
                d.artRef4 !== "" && d.artRef4
            ].filter(Boolean),
            styleNotes: d.artNotes
        },
        songData: {
            refLinks: [
                d.songRef1,
                d.songRef2,
                d.songRef3 !== "" && d.songRef3,
                d.songRef4 !== "" && d.songRef4
            ].filter(Boolean),
            styleNotes: d.songNotes
        },
        identity: {
            global_name: d.displayName,
            pronouns: d.pronouns,
            social_url: d.socialUsername,
            preferred_social: d.socialPlatform,
            rawSocials: JSON.parse(localStorage.getItem("userData")).socials // todo: implement
        }
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function RegistrationForm({
    initialValues
  }) {
    const [formSubmitting, setFormSubmitting] = React.useState(false);
    const [formProgress, setFormProgress] = React.useState(1); // default: info. ind 0 = error
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState(0);

    const schema = z.object(expand({
        "songRef1, songRef2, artRef1, artRef2": z
            .string()
            .url({ message: "Must be a valid URL" })
            .nonempty({ message: "Field is required." }),
        "songRef3, songRef4, artRef3, artRef4": z
            .string()
            .optional()
            .refine((val) => val === undefined || val === "" || z.string().url().safeParse(val).success, { message: "Must be a valid URL" }),
        "displayName": z.string().optional(),
        "pronouns": z.string().optional(),
        "socialUsername": z.string().nonempty("Must be a valid username!"),
        "socialPlatform": z.string().optional()
    }));


    const validateLinks = (data) => {
    try {
        schema.parse(data);
        return { success: true, errors: {} };
    } catch (e) {
        return { success: false, errors: e.errors };
    }
    };

    const getSavedData = React.useCallback(() => {
        // still haven't figured out cloud data, unfortunately ;w;
        let data = localStorage.getItem("muse_registration");
        if (data) {
         // Parse it to a javaScript object
          try {
            data = JSON.parse(data);
          } catch (err) {
            console.log(err);
          }
          return data;
        }
        let altData = localStorage.getItem("userData");

        if (altData) {
            // Parse it to a javaScript object
             try {
               let x = JSON.parse(altData);
               data = {
                displayName: x.global_name,
                pronouns: x.pronouns,
                socialUsername: x.socials.twitch,
                socialPlatform: "twitch"
               }
             } catch (err) {
               console.log(err);
             }
             return data;
        }
        return initialValues;
      }, [initialValues]);

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: getSavedData()
    });

    const validate = (d) => {
        const validation = validateLinks(d);

        if (!validation.success) {
            let hasErrors = false;

            validation.errors.forEach((error) => {
                setError(error.path[0], { message: error.message });
                hasErrors = true;
            });
            return hasErrors;
        }
        return false;
    }

    const onSubmit = async (data) => {
        const hasErrors = validate(data);

        if (hasErrors) {
            setFormProgress(0);
            setFormSubmitting(true);
            await sleep(1500);
            setFormSubmitting(false);
            return
        }
        console.log("data is valid!")
        setFormProgress(1);
        setFormSubmitting(true);
        let out = await formatToAPI(data);
        let f1 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/add-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                discordID: JSON.parse(localStorage.getItem("userData")).id,
                content: out
            })
        })

        // wait for response before updating the widget to say success
        let f2 = await f1.blob();
        if (f1.status === 200) {
            setFormProgress(2);
            await sleep(1500);
            setFormSubmitting(false);
        } else {
            setFormProgress(3);
            await sleep(1500);
            setFormSubmitting(false);
        }
        

    };

    const handleSelectChange = (e) => {
        setValue('socialPlatform', e.target.value, { shouldValidate: false });
        const socials = JSON.parse(localStorage.getItem("userData")).socials;
        if (socials[e.target.value] !== undefined || socials[e.target.value] !== "") {
            setValue('socialUsername', socials[e.target.value])
        }
        localStorage.setItem("muse_registration", JSON.stringify(getValues()))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={() => {localStorage.setItem("muse_registration", JSON.stringify(getValues()))}}>
            <ContextModal 
                open={modalOpen} 
                onModalClosed={() => setModalOpen(!modalOpen)} 
                modalType={modalType}
            />
            <Collapse in={formSubmitting} sx={{position: "fixed", right: 0, top: 0, zIndex: 999}}>
                <Alert
                    severity={formPopup.severity[formProgress]}
                    variant="filled"
                    >
                    {formPopup.message[formProgress]}
                </Alert>   
            </Collapse>
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
                        {...register("displayName")}
                        variant="outlined"
                        fullWidth 
                        helperText={"This is automatically taken from your Discord account, feel free to change it!"} 
                    />
                    <TextField 
                        label="Your Pronouns" 
                        {...register("pronouns")}
                        variant="outlined" 
                        fullWidth 
                        helperText={"This is automatically taken from your Discord account, feel free to change it!"} 
                    />
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "25px",
                        columnGap: "25px"
                    }}>
                        <FormControl sx={{flex: "35%"}}>
                        <InputLabel id="demo-simple-select-label">Streaming Platform</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Streaming Platform"
                            onChange={handleSelectChange}
                            defaultValue={getValues()['socialPlatform'] !== undefined ? getValues()["socialPlatform"] : "twitch"}
                            //{...register("socialPlatform")}
                        >
                            {platforms.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <TextField 
                            label={"Account Username" }
                            variant="outlined" 
                            required
                            {...register("socialUsername")}
                            sx={{flex: "35%"}}

                        />
                    </Box>
                </Box>
            </Box><br/><br/>
            <Box>
                <Typography>
                    B. Song and Art References
                </Typography><br/>
                {["Art", "Song"].map((valType, ind) => 
                <>
                    <Box>
                        <p style={{fontSize: "11pt", marginBottom: "12px", display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                            <HelpOutline sx={{fontSize: "11pt", marginRight: "5px"}} 
                            className="iconButton"
                            onClick={() => {
                                setModalType(ind);
                                setModalOpen(true)
                            }}
                            />
                            {valType} References
                        </p>
                        
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            rowGap: "0px",
                            columnGap: "25px"
                        }}>
                            {
                                Array.apply(null, Array(4)).map((n, i) => {
                                    return <TextField
                                        label={`Reference Link ${i+1}`}
                                        key={valType+i}
                                        variant="outlined"
                                        required={i < 2}
                                        placeholder={ind === 0 ? 
                                            "Please provide an image link" :
                                            "Please provide a link to a song"
                                        }
                                        {...register(`${valType.toLowerCase()}Ref${i+1}`)}
                                        error={!!errors[`${valType.toLowerCase()}Ref${i+1}`]}
                                        helperText={errors[`${valType.toLowerCase()}Ref${i+1}`]?.message}
                                        sx={{ flex: "35%", marginBottom: "16px" }}
                                    />
                                })
                            }
                            <TextField multiline fullWidth label="Style Notes/Other Notes" rows={3} required
                                {...register(`${valType.toLowerCase()}Notes`)}
                                placeholder={`A general description of the style of ${ind === 0 ? "emote" : "song"} you're looking for`}
                            />
                        </Box>
                    </Box>{ind === 0 && <><br/><br/></>}
                </>
                    
            )}
                
            </Box> <br/><br/>
            <Paper sx={{padding: "20px 20px 20px 20px"}}>
                This form can be edited again at any time by returning to this page.<br/><br/>
                <Button variant="outlined" type="submit">Submit Form</Button>
            </Paper><br/><br/>
        </form>
    );
}