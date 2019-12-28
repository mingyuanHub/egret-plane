enum GameViewType {
    None,
    Start,
    Battle
}

class GameView extends GameViewCE{

    private _classMap:Array<any> = [
        null,
        StartView,
        BattleView
    ]

    private _forceArray :Array<any> = [
        GameViewType.Battle
    ]

    private _forceDic:any = {}
    
    public constructor() {
        super()
    }

    public get resource():string {
        return "";
    }

    public notificationListeners(): Array<string> {
        return [
            GameEvent.OPEN_VIEW
        ]
    }

    public executeNotification(notificationName:string, obj:any, obj2:any) {
        if (notificationName == GameEvent.OPEN_VIEW) {
            let type = <GameViewType>obj;
            let isOpen:boolean = false;
            let flag:any = null;
            let c:any;
            let cls:any = this._classMap[type]
            if (obj2) {
                flag = obj2;
                if (obj2.type == "open" || obj2.openType == "open" || obj2 == "open") {
                    isOpen = true;
                }
            }
            if (type != GameGlobal.gameType) {
                GameGlobal.gameType = type;
                this.grp_container.removeChildren();
                for (var i: number = 0; i < this.grp_ForceView.numChildren; i++) {
                    (this.grp_ForceView.getChildAt(i) as BaseView).hideSelf();
                }
                if (this._forceArray.indexOf(type) >= 0) {
                    if (cls != null) {
                        let b: BaseView = this._forceDic[type]
                        if (b == null) {
                            let ns:any = new cls();
                            this._forceDic[type] = ns;
                            this.grp_container.addChild(ns)
                        }
                         else {
                            b.showSelf();
                        }
                    }
                } else {
                    if (cls != null) {
                        c = new cls();
                        this.grp_container.addChild(c)
                    }
                }
            }
        }
    }

    protected onAdded(event:egret.Event): void {
        super.onAdded(event);
    }

    protected loadComplete():void {
        super.loadComplete()
        GameGlobal.gameType = GameViewType.Start
        this.grp_container.addChild(new StartView())
    }
}