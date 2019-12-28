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
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        var _this = _super.call(this) || this;
        /**
         * 移动速度
         */
        _this.platMoveSpeed = 4;
        /**
         * 子弹间隔
         */
        _this.sendBulletDelta = 300;
        _this._sendBulletDelta = 0;
        /**
         * 子弹间隔
         */
        _this.bulletMoveSpeed = 5;
        /**
         * 同步间隔
         */
        _this.wsDelta = 200;
        _this._wsDelta = 0;
        _this.bulletDic = [];
        _this.isMe = true;
        _this.scaleV = 0.5;
        _this._sendBulletDelta = _this.sendBulletDelta;
        _this.scaleX = _this.scaleY = _this.scaleV;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.added, _this);
        return _this;
    }
    Plane.prototype.added = function () {
        this.addChild(new egret.Bitmap(RES.getRes("hongZhaJi")));
    };
    Plane.prototype.update = function (delta, battle) {
        this.sendBullets(delta, battle);
        this.movePlane(delta, battle);
        this.moveBullets();
    };
    Plane.prototype.sendBullets = function (delta, battle) {
        this._sendBulletDelta -= delta;
        if (this._sendBulletDelta < 0) {
            this._sendBulletDelta = this.sendBulletDelta;
            var bullet = new Bullet();
            this.bulletDic.push(bullet);
            battle.addChild(bullet);
            bullet.x = this.x + this.width / 4;
            bullet.y = this.y;
        }
    };
    Plane.prototype.movePlane = function (delta, battle) {
        var dirState = RockerControl.getInstance().dirState;
        if (dirState.state != 0 && this.isMe) {
            var speedX = this.platMoveSpeed * Math.cos((dirState.rotation - 90) * Math.PI / 180);
            var speedY = this.platMoveSpeed * Math.sin((dirState.rotation - 90) * Math.PI / 180);
            this.x += speedX;
            this.y += speedY;
            // this._wsDelta -= delta;
            // if (this._wsDelta < 0) {
            //     this._wsDelta = this.wsDelta;
            battle.sendWs({ "type": 2, "x": this.x, "y": this.y });
            // }
        }
    };
    Plane.prototype.moveBullets = function () {
        var bullet;
        for (var i = 0; i < this.bulletDic.length; i++) {
            bullet = this.bulletDic[i];
            bullet.y -= this.bulletMoveSpeed;
        }
    };
    Plane.prototype.changeFriendsPostion = function (params) {
        if (!this.isMe) {
            this.x = params['x'];
            this.y = params['y'];
        }
    };
    return Plane;
}(egret.Sprite));
__reflect(Plane.prototype, "Plane");
//# sourceMappingURL=Plane.js.map