import { useEffect, useState } from "react";

export default function Redirect(props) {
    const [safe, setSafe] = useState("Please wait...");

    async function handleAuth() {
        let params = (new URL(document.location)).searchParams;
        const code = params.get("code");
        let f1 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/capture-discord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code
            })
        })
        let f2 = await f1.json();
        if (f1.status === 200) {
            console.log("Authenticated with backend successfully!");
            localStorage.setItem("discordtoken", f2.discordToken);
            localStorage.setItem("discordid", f2.discordID);
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
            window.opener.location.reload();
        }
    }, [])
    
    return (
        <div>
            {safe}
        </div>
    )
}