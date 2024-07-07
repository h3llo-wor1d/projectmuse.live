import { Button, FormGroup, Input, Paper, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const DonationGrid = styled.div `
display: flex;
flex-direction: row;
column-gap: 20px;
`
export default function SupportButton(props) {
    const [alignment, setAlignment] = useState(5);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <Paper sx={{padding: "20px 20px 20px 20px", width: "100%"}}>
            Project Muse is a huge undertaking for myself and Neptune, anywhere from code maintenance to the art itself.<br/>
            Obviously, we do not expect that every single person who has entered would be able to help, but if you would like to support our colossal effort to 
            run this show once every 2 weeks, we take donations!<br/><br/>Just use the buttons below to select an amount and press the PayPal button to donate it!<br/><br/>
            <FormGroup>
                <DonationGrid>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value={5}>$5.00</ToggleButton>
                        <ToggleButton value={10}>$10.00</ToggleButton>
                        <ToggleButton value={15}>$15.00</ToggleButton>
                        z
                    </ToggleButtonGroup>
                    <TextField variant="outlined" label="Other Value" fullWidth></TextField>
                </DonationGrid> 
            </FormGroup><br/>
            <Button variant="outlined" size="large">
                Donate Now
            </Button>
        </Paper>
    )
}