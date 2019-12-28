class BaseView extends eui.Component implements IMediator{
    public isComplete:boolean;
    private _loadList:string[] = [];
    private _grpName:string = "";
    public isRegister:boolean = false;

    public get resource(): string {
        return "";
    }

    public get moduleName(): string {
        return ""
    }

    public notificationListeners(): Array<string> {
        return [];
    }

    public hideSelf() :void {
        this.visible = false
        Facade.removeNotifListeners(this);
    }

    public showSelf():void {
        this.visible = true;
    }

    public executeNotification(notificationName:string, obj:any, obj2:any) {

    }

    public constructor() {
        super()
        this.isComplete = false;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    protected onAdded(event:egret.Event) : void{
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this)
        this.readResourec()
    }

    protected readResourec() {
        if(this.resource.length > 0) {
            this._loadList = this.resource.split('|');
            this._grpName = this._loadList.shift()
            this.loadGroup();
        } else {
            this.loadComplete()
        }
    }

    protected loadGroup() {
        this.touchEnabled = false;
        this.touchChildren = false;

    }

    protected loadComplete():void {
        this.isComplete = true;
        if (this.moduleName != "") {
            this.skinName = this.moduleName;
        }
        Facade.registerNotifListeners(this)
    }

    protected onRemoved(event:egret.Event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this)
        this.removeChildren();
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }


}