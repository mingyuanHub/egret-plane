class GameGlobal {
    private static _baseLayer: egret.DisplayObjectContainer;

    private static _gameLayer: eui.UILayer;
    private static _uiLayer: eui.UILayer;
    private static _popLayer: eui.UILayer;
    private static _tipsLayer: eui.UILayer;
    public static topLayer: eui.UILayer;
    public static toastLayer: eui.UILayer;
    private static _loadingLayer: eui.UILayer;

    public static isComplete: boolean = false;

    public static screenWidth: number = 720;
    public static screenHeight: number = 1280;

    public static offsetX: number = 0;
    public static offsetY: number = 0;

    public static _gameType:GameViewType;

    
    public static initGame(main: egret.DisplayObjectContainer):void {
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
        this._uiLayer.$hitTest = () => { return null };

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
    }

    public static get gameLayer(): eui.UILayer {
        return GameGlobal._gameLayer;
    }

    public static set gameType(value:GameViewType) {
        this._gameType = value;
    }

    public static get gameType():GameViewType {
        return this._gameType;
    }

    public static get baseLayer():egret.DisplayObjectContainer {
        return this._baseLayer;
    }
}