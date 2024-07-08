export default class BallBotListener {
    webSocket = false;
    eventHandler;

    heartbeat = () => {
        if (!this.webSocket) return;
        if (this.webSocket.readyState !== 1) return;
        this.webSocket.send("heartbeat");
        setTimeout(this.heartbeat, 500);
     }
    
    close = () => {
        try {
            this.webSocket.close();
        } catch {}
    }

    start = () => {
        if (this.webSocket !== false) {
            this.webSocket.close();
        }
        this.webSocket = new WebSocket(
            window.location.origin === "http://localhost:3000" ?
            "ws://localhost:3030" :
            "wss://ballbot.projectmuse.live:3030"
        );
        this.webSocket.onopen = () => {
            this.heartbeat();
            console.log("WebSocket Client Started")
        }
        this.webSocket.onmessage = (event) => {
            console.log(event.data)
        let data = JSON.parse(event.data);
        this.eventHandler(data.type, data.content);
        };
    
        this.webSocket.onclose = () => {
        console.log("Socket closed.");
        this.webSocket = false;
        }
    }
}