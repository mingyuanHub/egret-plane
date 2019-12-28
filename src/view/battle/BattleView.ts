class BattleView extends BaseView implements IUpdateable {
    public deleted: boolean;

    public constructor() {
        super()
    }

    public notificationListerners():Array<string> {
        return [

        ]
    }

    public executeNotification(notificationName:string, obj:any, any2:any) {

    }

    public get moduleName(): string {
		return "StartViewSkin";
	}

    protected loadComplete() {
        super.loadComplete()
    }

    public update(delta: number): void {

    }

}