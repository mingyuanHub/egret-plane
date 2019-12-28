var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameGlobal = (function () {
    function GameGlobal() {
    }
    GameGlobal.initGame = function (main) {
        this._baseLayer = main;
        main.touchEnabled = false;
        this._gameLayer = new eui.UILayer();
        this._gameLayer.name = "gameLayer";
        main.addChild(this._gameLayer);
        this._gameLayer.touchThrough = true;
        this._gameLayer.touchEnabled = false;
        this._uiLayer = new eui.UILayer();
        this._uiLayer.name = "uiLayer";
        main.addChild(this._uiLayer);
        this._uiLayer.touchEnabled = false;
        this._uiLayer.touchThrough = true;
        this._uiLayer.$hitTest = function () { return null; };
        this._popLayer = new eui.UILayer();
        this._popLayer.name = "popLayer";
        main.addChild(this._popLayer);
        this._popLayer.touchThrough = true;
        this._popLayer.touchEnabled = false;
        this._popLayer.touchChildren = true;
        // PopupManager.getInstance().init(this._popLayer);
        this._tipsLayer = new eui.UILayer();
        this._tipsLayer.name = "tipsLayer";
        main.addChild(this._tipsLayer);
        this._tipsLayer.touchEnabled = false;
        this._tipsLayer.touchThrough = true;
        this.topLayer = new eui.UILayer();
        this.topLayer.name = "topLayer";
        main.addChild(this.topLayer);
        this.topLayer.touchThrough = true;
        this.topLayer.touchEnabled = false;
        this.toastLayer = new eui.UILayer();
        this.toastLayer.name = "toastLayer";
        main.addChild(this.toastLayer);
        this.toastLayer.touchThrough = true;
        this.toastLayer.touchEnabled = false;
        this._loadingLayer = new eui.UILayer();
        this._loadingLayer.name = "loadingLayer";
        this._loadingLayer.touchEnabled = this._loadingLayer.touchChildren = false;
        main.addChild(this._loadingLayer);
        this._loadingLayer.touchThrough = true;
        UpdateManager.init();
        UpdateManager.start();
        this.isComplete = true;
    };
    Object.defineProperty(GameGlobal, "gameLayer", {
        get: function () {
            return GameGlobal._gameLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "gameType", {
        get: function () {
            return this._gameType;
        },
        set: function (value) {
            this._gameType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "baseLayer", {
        get: function () {
            return this._baseLayer;
        },
        enumerable: true,
        configurable: true
    });
    GameGlobal.isComplete = false;
    GameGlobal.screenWidth = 720;
    GameGlobal.screenHeight = 1280;
    GameGlobal.offsetX = 0;
    GameGlobal.offsetY = 0;
    return GameGlobal;
}());
__reflect(GameGlobal.prototype, "GameGlobal");
//# sourceMappingURL=GameGlobal.js.map