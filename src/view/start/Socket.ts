class Socket {
    public sock:egret.WebSocket;

    public testWsHttp() {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this );
        this.sock.addEventListener( egret.Event.CONNECT, this.onSocketOpen, this );
        this.sock.connect("127.0.0.1", 9502);
    }

    public onReceiveMessage(event:egret.Event) {
        var msg = this.sock.readUTF();
        console.log("收到数据：" + msg);
    }

    public onSocketOpen(event:egret.Event) {
        var cmd = "Hello Egret WebSocket";    
        console.log("连接成功，发送数据：" + cmd);    
        this.sock.writeUTF(cmd);
    }

    public sendWs(event:egret.Event) {
        var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
        this.sock.writeUTF(cmd);
    }
}