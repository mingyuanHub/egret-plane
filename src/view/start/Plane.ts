class Plane extends egret.Sprite {
    /**
     * 移动速度
     */
    public platMoveSpeed:number = 4;

    /**
     * 子弹间隔
     */
    public sendBulletDelta = 300;

    public _sendBulletDelta = 0;

    /**
     * 子弹速度
     */
    public bulletMoveSpeed = 5;

    public bulletDic:Array<Bullet> = []

    public isMe:boolean = true;

    public scaleV = 0.5;

    public constructor() {
        super();
        this._sendBulletDelta = this.sendBulletDelta;
        this.scaleX = this.scaleY = this.scaleV;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.added, this)
    }

    public added() {
        this.addChild(new egret.Bitmap(RES.getRes("hongZhaJi")));
    }

    public update(delta, battle:StartView) {
        this.sendBullets(delta, battle)
        this.movePlane(delta, battle);
        this.moveBullets()
    }

    public sendBullets(delta, battle:eui.Component):void {
        this._sendBulletDelta -= delta;

        if (this._sendBulletDelta < 0) {
            this._sendBulletDelta = this.sendBulletDelta;

            let bullet = new Bullet();
            this.bulletDic.push(bullet)
            battle.addChild(bullet)
            
            bullet.x = this.x + this.width / 4;
            bullet.y = this.y;
        }
    }

    public movePlane(delta, battle) {
        let dirState = RockerControl.getInstance().dirState
        if(dirState.state != 0 && this.isMe) {
            let speedX = this.platMoveSpeed * Math.cos((dirState.rotation - 90) * Math.PI / 180);
            let speedY = this.platMoveSpeed * Math.sin((dirState.rotation - 90) * Math.PI / 180);
            this.x += speedX;
            this.y += speedY;
            battle.sendWs({"type":2, "x": this.x, "y":this.y});
        }
    }

    public moveBullets():void{
        let bullet:Bullet;
        for (let i:number = 0; i < this.bulletDic.length ; i ++) {
            bullet = this.bulletDic[i]
            bullet.y -= this.bulletMoveSpeed;
        }
    }

    public changeFriendsPostion(params:Object):void {
        if (!this.isMe) {
            this.x = params['x'];
            this.y = params['y'];
        }
    }

}