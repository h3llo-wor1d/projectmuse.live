import { getItemJSON, setItem } from "./storageHandler";

export default async function getInitialData() {
    let f1 = await fetch("https://s3jyogzk1i.execute-api.eu-west-1.amazonaws.com/captureOrder", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({userID: getItemJSON("userData").id})
    })
    let f2 = await f1.json();
    if (f1.status === 200) {
        if (Object.keys(f2).indexOf("Item") !== -1) {
            //setItem('initialData', JSON.stringify(f2.Item));
            
            let content = f2.Item.content;
            
            let schemaFormatted = {
                artNotes: content.artData.styleNotes,
                artRef1: content.artData.refLinks[0],
                artRef2: content.artData.refLinks[1],
                artRef3: content.artData.refLinks[2],
                artRef4: content.artData.refLinks[3],
                songRef1: content.songData.refLinks[0],
                songRef2: content.songData.refLinks[1],
                songRef3: content.songData.refLinks[2],
                songRef4: content.songData.refLinks[3],
                songNotes: content.songData.styleNotes,
                displayName: content.identity.global_name,
                socialPlatform: content.identity.preferred_social,
                socialUsername: content.identity.social_url,
                pronouns: content.identity.pronouns
            }
            console.log(JSON.stringify(schemaFormatted, null, 4))
            return schemaFormatted;
        }
    }
    return false;
}