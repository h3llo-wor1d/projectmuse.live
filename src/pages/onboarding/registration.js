import RegistrationForm from "../../components/onboarding/RegistrationForm";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import MuseLogo from '../../images/icon_color.png';
import styled from "styled-components";
import { NavigateNext } from "@mui/icons-material";

const Page = styled.div `
    padding: 30px 30px 30px 30px;
`

export default function Registration() {

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
        <div>
            <Page>
                <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 999,
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
                    <RegistrationForm />
                </Box>
            </Page>
        </div>
    )
}