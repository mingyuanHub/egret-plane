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
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView() {
        return _super.call(this) || this;
    }
    BattleView.prototype.notificationListerners = function () {
        return [];
    };
    BattleView.prototype.executeNotification = function (notificationName, obj, any2) {
    };
    Object.defineProperty(BattleView.prototype, "moduleName", {
        get: function () {
            return "StartViewSkin";
        },
        enumerable: true,
        configurable: true
    });
    BattleView.prototype.loadComplete = function () {
        _super.prototype.loadComplete.call(this);
    };
    BattleView.prototype.update = function (delta) {
    };
    return BattleView;
}(BaseView));
__reflect(BattleView.prototype, "BattleView", ["IUpdateable"]);
//# sourceMappingURL=BattleView.js.map