class Facade {
    private static _dicmediator :Array<Array<IMediator>> = new Array<Array<IMediator>>();
    public constructor () {

    }

    public static sendNotification(notificationName:string, obj:any, obj2:any) {
        var arr:Array<IMediator> = Facade._dicmediator[notificationName];
        if (arr != null) {
            for (let i :number = 0; i < arr.length; i ++) {
                arr[i].executeNotification(notificationName, obj, obj2)
            }
        }
    }

    public static registerNotifListeners(mediator:IMediator):void {
        if (mediator.isRegister) {
            return
        }
        mediator.isRegister = true;
        var notifications:Array<string> = mediator.notificationListeners();
        var length:any = notifications.length;

        for(let i :number = 0; i < length; i ++) {
            var arr:Array<IMediator> = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                arr.push(mediator)
            } else {
                arr = new Array<IMediator>();
                arr.push(mediator)
                Facade._dicmediator[notifications[i]] = arr;
            }
        }
    }

    public static removeNotifListeners(mediator:IMediator) {

    }
}