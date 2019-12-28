var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Facade = (function () {
    function Facade() {
    }
    Facade.sendNotification = function (notificationName, obj, obj2) {
        var arr = Facade._dicmediator[notificationName];
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].executeNotification(notificationName, obj, obj2);
            }
        }
    };
    Facade.registerNotifListeners = function (mediator) {
        if (mediator.isRegister) {
            return;
        }
        mediator.isRegister = true;
        var notifications = mediator.notificationListeners();
        var length = notifications.length;
        for (var i = 0; i < length; i++) {
            var arr = Facade._dicmediator[notifications[i]];
            if (arr != null) {
                arr.push(mediator);
            }
            else {
                arr = new Array();
                arr.push(mediator);
                Facade._dicmediator[notifications[i]] = arr;
            }
        }
    };
    Facade.removeNotifListeners = function (mediator) {
    };
    Facade._dicmediator = new Array();
    return Facade;
}());
__reflect(Facade.prototype, "Facade");
//# sourceMappingURL=Facade.js.map