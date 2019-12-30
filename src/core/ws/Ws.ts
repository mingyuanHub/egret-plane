class Ws {
    public static _instance: Ws;

    public static getInstance():   Ws{
        if (Ws._instance == null)
            Ws._instance = new Ws();
        return Ws._instance;
    }

    public sock:egret.WebSocket;

    public connect() {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this );
        this.sock.addEventListener( egret.Event.CONNECT, this.onSocketOpen, this );
        this.sock.connect("39.100.133.182", 9502);
    }

    public onReceiveMessage(event:egret.Event) {
        var msg = this.sock.readUTF();
        let params = JSON.parse(msg);
        if (params['type'] == 1 || params['type'] == 2) {
            Facade.sendNotification(GameEvent.WS_RECEIVE, params, "")
        }
        console.log("收到数据：" + msg);
    }

    public onSocketOpen(event:egret.Event) {
        var cmd = "Hello Egret WebSocket";    
        console.log("连接成功，发送数据：" + cmd);
    }

    public sendMessage(params: Object) {
        let str:string = JSON.stringify(params)
        this.sock.writeUTF(str);
    }
}