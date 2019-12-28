interface IMediator {
    isRegister:boolean;
    notificationListeners():Array<string>;
    executeNotification(notificationName:string, obj:any, obj2:any)

}