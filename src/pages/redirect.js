import { useEffect, useState } from "react";

export default function Redirect(props) {
    const [safe, setSafe] = useState("Please wait...");

    async function handleAuth() {
        let token = window.location.hash.split("=")[2].split("&")[0];
        console.log(token)
        let f1 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/capture-discord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: token
            })
        })
        if (f1.status === 200) {
            console.log("Authenticated with backend successfully!");
            localStorage.setItem("discordtoken", token);
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
    })
    
    return (
        <div>
            {safe}
        </div>
    )
}