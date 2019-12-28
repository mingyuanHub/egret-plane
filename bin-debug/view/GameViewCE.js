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
var GameViewCE = (function (_super) {
    __extends(GameViewCE, _super);
    function GameViewCE() {
        var _this = _super.call(this) || this;
        _this.grp_container = new eui.Group();
        _this.grp_container.width = 720;
        _this.grp_container.height = 1280;
        _this.addChild(_this.grp_container);
        return _this;
    }
    Object.defineProperty(GameViewCE.prototype, "moduleName", {
        get: function () {
            return "GameViewSkin";
        },
        enumerable: true,
        configurable: true
    });
    return GameViewCE;
}(BaseView));
__reflect(GameViewCE.prototype, "GameViewCE");
//# sourceMappingURL=GameViewCE.js.map