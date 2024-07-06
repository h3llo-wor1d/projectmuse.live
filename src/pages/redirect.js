import { useEffect, useState } from "react";

export default function Redirect(props) {
    const [safe, setSafe] = useState("Please wait...");
    const redirectURI = window.location.origin === "http://localhost:3000" ? 
    "http%3A%2F%2Flocalhost%3A3000%2Fredirect" :
    "https%3A%2F%2Fprojectmuse.live%2Fredirect";


    async function handleAuth() {
        let params = (new URL(document.location)).searchParams;
        const code = params.get("code");
        let f1 = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
              'Content-Type': "application/x-www-form-urlencoded",
              "Authorization": `Basic MTAyMzY5NDg2Nzc5ODQ0MTk4NDo1TUc2a1hiVGhSdHBYUFBOUFE2aVZZclBUOElaN2YwTg==`
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}`
        })
        let f2 = await f1.json();
        if (f1.status === 200) {
            let f3 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/userprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: `Bearer ${f2.access_token}`
                })
            })
            let f4 = await f3.json();
            localStorage.setItem("userData", JSON.stringify(f4))
            localStorage.setItem("discordtoken", f2.access_token);
            setSafe("You may now close this window.");
        } else {
            setSafe("Invalid User Authorization. Please Try Again.");
        }
    }

    const onUnload = e => {
        e.preventDefault();
        e.returnValue = '';
        window.opener.location.reload(true);
        window.location.reload();
    }

    useEffect(() => {
        handleAuth();
        window.onbeforeunload = onUnload;
    }, [])
    
    return (
        <div>
            {safe}
        </div>
    )
}