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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this._loadList = [];
        _this._grpName = "";
        _this.isRegister = false;
        _this.isComplete = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        return _this;
    }
    Object.defineProperty(BaseView.prototype, "resource", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseView.prototype, "moduleName", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.notificationListeners = function () {
        return [];
    };
    BaseView.prototype.hideSelf = function () {
        this.visible = false;
        Facade.removeNotifListeners(this);
    };
    BaseView.prototype.showSelf = function () {
        this.visible = true;
    };
    BaseView.prototype.executeNotification = function (notificationName, obj, obj2) {
    };
    BaseView.prototype.onAdded = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.readResourec();
    };
    BaseView.prototype.readResourec = function () {
        if (this.resource.length > 0) {
            this._loadList = this.resource.split('|');
            this._grpName = this._loadList.shift();
            this.loadGroup();
        }
        else {
            this.loadComplete();
        }
    };
    BaseView.prototype.loadGroup = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
    };
    BaseView.prototype.loadComplete = function () {
        this.isComplete = true;
        if (this.moduleName != "") {
            this.skinName = this.moduleName;
        }
        Facade.registerNotifListeners(this);
    };
    BaseView.prototype.onRemoved = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.removeChildren();
    };
    BaseView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView", ["IMediator"]);
//# sourceMappingURL=BaseView.js.map