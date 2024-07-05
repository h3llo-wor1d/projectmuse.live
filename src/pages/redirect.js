import { useEffect, useState } from "react";

export default function Redirect(props) {
    const [safe, setSafe] = useState("Please wait...");

    async function handleAuth() {
        let params = (new URL(document.location)).searchParams;
        const code = params.get("code");
        let f1 = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
              'Content-Type': "application/x-www-form-urlencoded",
              "Authorization": `Basic MTAyMzY5NDg2Nzc5ODQ0MTk4NDo1TUc2a1hiVGhSdHBYUFBOUFE2aVZZclBUOElaN2YwTg==`
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect`
        })
        let f2 = await f1.json();
        if (f1.status === 200) {
            console.log("Authenticated with backend successfully!");
            console.log(`Bearer ${f2.access_token}`)
            let f3 = await fetch("http://localhost:8080/profile", {
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
            console.log("Successfully set token in local storage. User may now close the window.");
            setSafe("You may now close this window.");
        } else {
            setSafe("Invalid User Authorization. Please Try Again.");
        }
    }

    useEffect(() => {
        handleAuth();
        window.onunload = refreshParent;
        function refreshParent() { 
            window.location.reload();
        }
    }, [])
    
    return (
        <div>
            {safe}
        </div>
    )
}