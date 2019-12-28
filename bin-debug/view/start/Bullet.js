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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this) || this;
        _this.scaleV = 0.02;
        _this.scaleX = _this.scaleY = _this.scaleV;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.added, _this);
        return _this;
    }
    Bullet.prototype.added = function () {
        var data = RES.getRes("b_json");
        var tex = RES.getRes("b_png");
        var mcf = new egret.MovieClipDataFactory(data, tex);
        var mc = new egret.MovieClip(mcf.generateMovieClipData("timg"));
        this.addChild(mc);
        mc.play(10);
    };
    return Bullet;
}(egret.Sprite));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map