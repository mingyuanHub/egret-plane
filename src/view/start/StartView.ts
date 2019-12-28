class StartView extends BaseView implements IUpdateable {
    public deleted: boolean;

    public bgImg0:eui.Image;
    public bgImg1:eui.Image;
    public bgImg2:eui.Image;

    /**
     * 主机
     */
    public _MasterPlane:Plane;

    /**
     * 僚机
     */
    public _SlaverPlane:Plane;

    public sock:egret.WebSocket;
    public fdText:egret.TextField;

    public constructor() {
        super()
    }

    public notificationListerners():Array<string> {
        return [
        ]
    }

    public executeNotification(notificationName:string, obj:any, any2:any) {

    }

    public get moduleName(): string {
		return "BattleViewSkin";
	}

    protected loadComplete() {
        super.loadComplete()
        this.init()
        this.connetWsHttp();
        UpdateManager.addUpdateable(this);
    }

    public init() {
        let rockerBar = new UIRocker(new egret.Rectangle(0, 0, 720, 1280), "ctrl_direction_1_png", "ctrl_direction_2_png");
        rockerBar.startPoint = new egret.Point(360, 1100);
        this.addChildAt(rockerBar, this.numChildren - 6);
        
        this._MasterPlane = new Plane();
        this._MasterPlane.x = 100;
        this._MasterPlane.y = GameGlobal.screenHeight - this._MasterPlane.height - 300;
        this.addChild(this._MasterPlane)

        this._SlaverPlane = new Plane();
        this._SlaverPlane.x = 450;
        this._SlaverPlane.y = GameGlobal.screenHeight - this._SlaverPlane.height - 300;
        this._SlaverPlane.isMe = false;
        this.addChild(this._SlaverPlane)

        this.fdText = new egret.TextField();
        this.addChild(this.fdText)
    }

    public update(delta: number): void {
        this._MasterPlane.update(delta, this);
        this._SlaverPlane.update(delta, this);

        this.updateBgMap();
    }

    public connetWsHttp() {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this );
        this.sock.addEventListener( egret.Event.CONNECT, this.onSocketOpen, this );
        this.sock.connect("39.100.133.182", 9502);
    }

    public onReceiveMessage(event:egret.Event) {
        var msg = this.sock.readUTF();
        let params = JSON.parse(msg);
        switch (params.type) {
            case 1:
                let isMaster = params.isMaster;
                if (0 == isMaster) {
                    this._MasterPlane.isMe = false;
                    this._SlaverPlane.isMe = true;
                }
                this.fdText.text = "FD_ID:" + params.fd
                break;
            case 2:
                this._MasterPlane.changeFriendsPostion(params)
                this._SlaverPlane.changeFriendsPostion(params)
                break;
        }

        console.log("收到数据：" + msg);
    }

    public onSocketOpen(event:egret.Event) {
        var cmd = "Hello Egret WebSocket";    
        console.log("连接成功，发送数据：" + cmd);
    }

    public sendWs(params: Object) {
        let str:string = JSON.stringify(params)
        this.sock.writeUTF(str);
    }

    public updateBgMap() {
        this.bgImg0.y +=2;
        this.bgImg1.y +=2;
        this.bgImg2.y +=2;

        if (this.bgImg0.y >= egret.MainContext.instance.stage.stageHeight)
			this.bgImg0.y = this.bgImg1.y - 1280;
		if (this.bgImg1.y >= egret.MainContext.instance.stage.stageHeight)
			this.bgImg1.y = this.bgImg2.y - 1280;
		if (this.bgImg2.y >= egret.MainContext.instance.stage.stageHeight)
			this.bgImg2.y = this.bgImg0.y - 1280;
    }

}