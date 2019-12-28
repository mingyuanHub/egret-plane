var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket() {
    }
    Socket.prototype.testWsHttp = function () {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.sock.connect("127.0.0.1", 9502);
    };
    Socket.prototype.onReceiveMessage = function (event) {
        var msg = this.sock.readUTF();
        console.log("收到数据：" + msg);
    };
    Socket.prototype.onSocketOpen = function (event) {
        var cmd = "Hello Egret WebSocket";
        console.log("连接成功，发送数据：" + cmd);
        this.sock.writeUTF(cmd);
    };
    Socket.prototype.sendWs = function (event) {
        var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
        this.sock.writeUTF(cmd);
    };
    return Socket;
}());
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map