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
var GameViewType;
(function (GameViewType) {
    GameViewType[GameViewType["None"] = 0] = "None";
    GameViewType[GameViewType["Start"] = 1] = "Start";
    GameViewType[GameViewType["Battle"] = 2] = "Battle";
})(GameViewType || (GameViewType = {}));
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this._classMap = [
            null,
            StartView,
            BattleView
        ];
        _this._forceArray = [
            GameViewType.Battle
        ];
        _this._forceDic = {};
        return _this;
    }
    Object.defineProperty(GameView.prototype, "resource", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    GameView.prototype.notificationListeners = function () {
        return [
            GameEvent.OPEN_VIEW
        ];
    };
    GameView.prototype.executeNotification = function (notificationName, obj, obj2) {
        if (notificationName == GameEvent.OPEN_VIEW) {
            var type = obj;
            var isOpen = false;
            var flag = null;
            var c = void 0;
            var cls = this._classMap[type];
            if (obj2) {
                flag = obj2;
                if (obj2.type == "open" || obj2.openType == "open" || obj2 == "open") {
                    isOpen = true;
                }
            }
            if (type != GameGlobal.gameType) {
                GameGlobal.gameType = type;
                this.grp_container.removeChildren();
                for (var i = 0; i < this.grp_ForceView.numChildren; i++) {
                    this.grp_ForceView.getChildAt(i).hideSelf();
                }
                if (this._forceArray.indexOf(type) >= 0) {
                    if (cls != null) {
                        var b = this._forceDic[type];
                        if (b == null) {
                            var ns = new cls();
                            this._forceDic[type] = ns;
                            this.grp_container.addChild(ns);
                        }
                        else {
                            b.showSelf();
                        }
                    }
                }
                else {
                    if (cls != null) {
                        c = new cls();
                        this.grp_container.addChild(c);
                    }
                }
            }
        }
    };
    GameView.prototype.onAdded = function (event) {
        _super.prototype.onAdded.call(this, event);
    };
    GameView.prototype.loadComplete = function () {
        _super.prototype.loadComplete.call(this);
        GameGlobal.gameType = GameViewType.Start;
        this.grp_container.addChild(new StartView());
    };
    return GameView;
}(GameViewCE));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map