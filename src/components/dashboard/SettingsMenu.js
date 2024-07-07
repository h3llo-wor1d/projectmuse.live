import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material"
import Twemoji from "react-twemoji"
import styled from "styled-components"

const GridContainer = styled.div `
display: flex;
grid-template-columns: 18pt auto;
column-gap: 10px;
text-wrap: wrap;
align-items: center;
height: auto;
`
export default function SettingsMenu(props) {
    return (
        <div>
            <GridContainer>
                <span style={{fontSize: "18pt", fontWeight: "bold"}}>Advanced Options</span>
            </GridContainer>
            <FormGroup sx={{display: 'flex', flexDirection: "column", rowGap: "10px"}}>
                <FormControl>
                    <FormControlLabel control={<Checkbox />} label="Get Skipped Temporarily By Ball Bot"/>
                    <FormHelperText id="my-helper-text" sx={{marginLeft: "0", marginTop: '0'}}>Use if you will not be present at the start of the show<br/>(WARNING: You will not be picked or skipped until you uncheck this box)</FormHelperText>
                </FormControl>
            </FormGroup>
        </div>
        
    )
}