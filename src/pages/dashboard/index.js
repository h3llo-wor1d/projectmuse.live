
import styled from "styled-components"
import SettingsMenu from "../../components/dashboard/SettingsMenu";
import SupportButton from "../../components/SupportButton";
import RegistrationEdit from "./registration";

const Page = styled.div `
padding: 20px 20px 20px 20px;
display: flex;
`

const PageItem = styled.div `
flex: 45%;
position: relative;
`

const PageItemWrapper = styled.div `
position: fixed;
width: 45%;
padding-top: 50px;
padding-left: 50px;
padding-right: 50px;
top: 0;
`
export default function Dashboard(props) {
    return (
        <Page>
            <PageItem>
                <PageItemWrapper>
                    <SettingsMenu />
                </PageItemWrapper>  
            </PageItem>
            <PageItem>
                <RegistrationEdit />
            </PageItem>
            
        </Page>
    )
}