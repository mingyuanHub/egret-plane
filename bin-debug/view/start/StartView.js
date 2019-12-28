var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        return _super.call(this) || this;
    }
    StartView.prototype.notificationListerners = function () {
        return [];
    };
    StartView.prototype.executeNotification = function (notificationName, obj, any2) {
    };
    Object.defineProperty(StartView.prototype, "moduleName", {
        get: function () {
            return "BattleViewSkin";
        },
        enumerable: true,
        configurable: true
    });
    StartView.prototype.loadComplete = function () {
        _super.prototype.loadComplete.call(this);
        this.init();
        UpdateManager.addUpdateable(this);
        this.connetWsHttp();
    };
    StartView.prototype.init = function () {
        // this.testWsHttp();
        var rockerBar = new UIRocker(new egret.Rectangle(0, 0, 720, 1280), "ctrl_direction_1_png", "ctrl_direction_2_png");
        rockerBar.startPoint = new egret.Point(360, 1100);
        this.addChildAt(rockerBar, this.numChildren - 6);
        this._MasterPlane = new Plane();
        this._MasterPlane.x = 100;
        this._MasterPlane.y = GameGlobal.screenHeight - this._MasterPlane.height - 300;
        this.addChild(this._MasterPlane);
        this._SlaverPlane = new Plane();
        this._SlaverPlane.x = 450;
        this._SlaverPlane.y = GameGlobal.screenHeight - this._SlaverPlane.height - 300;
        this._SlaverPlane.isMe = false;
        this.addChild(this._SlaverPlane);
        this.fdText = new egret.TextField();
        this.addChild(this.fdText);
    };
    StartView.prototype.update = function (delta) {
        this._MasterPlane.update(delta, this);
        this._SlaverPlane.update(delta, this);
        this.updateBgMap();
    };
    StartView.prototype.connetWsHttp = function () {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.sock.connect("39.100.133.182", 9502);
    };
    StartView.prototype.onReceiveMessage = function (event) {
        var msg = this.sock.readUTF();
        var params = JSON.parse(msg);
        switch (params.type) {
            case 1:
                var isMaster = params.isMaster;
                if (0 == isMaster) {
                    this._MasterPlane.isMe = false;
                    this._SlaverPlane.isMe = true;
                }
                this.fdText.text = "FD_ID:" + params.fd;
                break;
            case 2:
                this._MasterPlane.changeFriendsPostion(params);
                this._SlaverPlane.changeFriendsPostion(params);
                break;
        }
        console.log("收到数据：" + msg);
    };
    StartView.prototype.onSocketOpen = function (event) {
        var cmd = "Hello Egret WebSocket";
        console.log("连接成功，发送数据：" + cmd);
    };
    StartView.prototype.sendWs = function (params) {
        var str = JSON.stringify(params);
        this.sock.writeUTF(str);
    };
    StartView.prototype.updateBgMap = function () {
        this.bgImg0.y += 2;
        this.bgImg1.y += 2;
        this.bgImg2.y += 2;
        if (this.bgImg0.y >= egret.MainContext.instance.stage.stageHeight)
            this.bgImg0.y = this.bgImg1.y - 1280;
        if (this.bgImg1.y >= egret.MainContext.instance.stage.stageHeight)
            this.bgImg1.y = this.bgImg2.y - 1280;
        if (this.bgImg2.y >= egret.MainContext.instance.stage.stageHeight)
            this.bgImg2.y = this.bgImg0.y - 1280;
    };
    return StartView;
}(BaseView));
__reflect(StartView.prototype, "StartView", ["IUpdateable"]);
//# sourceMappingURL=StartView.js.map