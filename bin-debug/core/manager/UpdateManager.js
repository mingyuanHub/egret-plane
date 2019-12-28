var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UpdateManager = (function () {
    function UpdateManager() {
    }
    UpdateManager.start = function () {
        this._started = true;
    };
    UpdateManager.stop = function () {
        this._started = false;
    };
    UpdateManager.init = function () {
        this._lastDelta = egret.getTimer();
        egret.startTick(this.update, this);
    };
    UpdateManager.update = function (timeStamp) {
        var delta = timeStamp - this._lastDelta;
        this._lastDelta = timeStamp;
        if (this._started) {
            for (var i = this._dicupdateable.length - 1; i >= 0; i--) {
                if (this._dicupdateable[i].deleted) {
                    this._dicupdateable.splice(i, 1);
                }
                else {
                    this._dicupdateable[i].update(delta);
                }
            }
        }
        return false;
    };
    UpdateManager.addUpdateable = function (up) {
        var index = this._dicupdateable.indexOf(up);
        up.deleted = false;
        if (index == -1) {
            this._dicupdateable.push(up);
        }
    };
    UpdateManager.delUpdateable = function (up) {
        var index = this._dicupdateable.indexOf(up);
        if (index > -1) {
            this._dicupdateable[index].deleted = true;
        }
    };
    UpdateManager._dicupdateable = [];
    UpdateManager._started = false;
    return UpdateManager;
}());
__reflect(UpdateManager.prototype, "UpdateManager");
//# sourceMappingURL=UpdateManager.js.map