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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UIRocker = (function (_super) {
    __extends(UIRocker, _super);
    /**
     * @param  {egret.Rectangle} range 触发范围
     * @param  {string} bg? 背景资源
     * @param  {string} ball? 资源
     * @param  {isShowRange} 触发区域透明度 默认不显示
     */
    function UIRocker(range, bg, ball, rangeAlpha) {
        if (rangeAlpha === void 0) { rangeAlpha = 0; }
        var _this = _super.call(this) || this;
        _this._bgImg = new eui.Image();
        _this._ball = new eui.Image();
        _this._sp = new egret.Sprite();
        _this._radius = 110; //移动半径 底半径
        _this._ballRadius = 30; //小球半径
        _this._centerP = new egret.Point();
        _this._movePoint = new egret.Point(); //移动的位置
        _this._touchId = 0;
        _this._range = range;
        _this.initUI(bg, ball, rangeAlpha);
        return _this;
    }
    UIRocker.prototype.initUI = function (bg, ball, rangeAlpha) {
        if (rangeAlpha === void 0) { rangeAlpha = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._rect = new eui.Rect(this._range.width, this._range.height);
                        this._rect.alpha = rangeAlpha;
                        this._rect.x = this._range.x;
                        this._rect.y = this._range.y;
                        this.addChild(this._rect);
                        _a = this._bgImg;
                        return [4 /*yield*/, RES.getResAsync(bg)];
                    case 1:
                        _a.texture = _c.sent();
                        this._radius = this._bgImg.width >> 1;
                        this._bgImg.anchorOffsetX = this._radius;
                        this._bgImg.anchorOffsetY = this._radius;
                        _b = this._ball;
                        return [4 /*yield*/, RES.getResAsync(ball)];
                    case 2:
                        _b.texture = _c.sent();
                        this._ballRadius = this._ball.width >> 1;
                        this._ball.anchorOffsetX = this._ball.anchorOffsetY = this._ballRadius;
                        this._sp.addChild(this._bgImg);
                        this._sp.addChild(this._ball);
                        if (!this._restPoint) {
                            this._restPoint = new egret.Point(this._range.x + this._range.width * 0.5, this._range.y + this._range.height * 0.5);
                        }
                        this._sp.touchEnabled = this._sp.touchChildren = false;
                        this._sp.visible = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    //按下摇杆
    UIRocker.prototype.touchBeginHandler = function (evt) {
        if (this._touchId != 0) {
            return;
        }
        this._sp.x = evt.stageX - GameGlobal.offsetX;
        this._sp.y = evt.stageY;
        this._centerP.x = this._sp.x;
        this._centerP.y = this._sp.y;
        this.show();
        this._touchId = evt.touchPointID;
        // this._rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.touchMoveHandler(evt);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
    };
    //摇杆移动
    UIRocker.prototype.touchMoveHandler = function (evt) {
        if (this._touchId != evt.touchPointID) {
            return;
        }
        var tx = evt.stageX - GameGlobal.offsetX;
        var ty = evt.stageY;
        this._movePoint.x = tx;
        this._movePoint.y = ty;
        var dist = egret.Point.distance(this._centerP, this._movePoint);
        UIRocker.angle = Math.atan2(ty - this._centerP.y, tx - this._centerP.x);
        if (dist >= this._radius) {
            var mx = Math.cos(UIRocker.angle) * this._radius;
            var my = Math.sin(UIRocker.angle) * this._radius;
            this._centerP.x = this._sp.x = tx - mx;
            this._centerP.y = this._sp.y = ty - my;
        }
        this._ball.x = tx - this._centerP.x;
        this._ball.y = ty - this._centerP.y;
        // console.log("  angle=> " + UIRocker.angle*180/Math.PI);
        if (dist < 10) {
            RockerControl.getInstance().dirState.state = 0;
            return;
        }
        // // //计算方向上
        RockerControl.getInstance().dirState.state = RockerControl.judgeDir(-UIRocker.angle);
        RockerControl.getInstance().dirState.rotation = 90 + UIRocker.angle * 180 / Math.PI;
        // console.log("  angle=> " + -UIRocker.angle*180/Math.PI+"当前方向->>> "+BattleController.getInstance().dirState.state);
    };
    //取消摇杆
    UIRocker.prototype.cancelHandler = function (evt) {
        if (this._touchId == evt.touchPointID) {
            this.reset();
            // this._rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
            UIRocker.angle = 0;
            RockerControl.getInstance().dirState.state = 0;
        }
    };
    UIRocker.prototype.show = function () {
        if (this._sp.x == 0) {
            this._sp.x = 360;
            this._sp.y = 1100;
        }
        !this._sp.parent && this.addChild(this._sp);
    };
    UIRocker.prototype.reset = function () {
        this._touchId = 0;
        this._ball.x = 0;
        this._ball.y = 0;
        this._sp.x = this._restPoint.x;
        this._sp.y = this._restPoint.y;
    };
    UIRocker.prototype.hide = function () {
        this._touchId = 0;
        this._sp.parent && this._sp.parent.removeChild(this._sp);
    };
    UIRocker.prototype.start = function () {
        this._rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    //停止虚拟摇杆
    UIRocker.prototype.stop = function () {
        RockerControl.getInstance().dirState.state = 0;
        this._rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
    };
    UIRocker.prototype.onAdded = function (event) {
        // super.onAdded(event);
        this.start();
    };
    UIRocker.prototype.onRemoved = function (event) {
        // super.onRemoved(event);
        this.hide();
        this.stop();
    };
    Object.defineProperty(UIRocker.prototype, "startPoint", {
        /**
         * 当摇杆设置为一直显示时 手指抬起自动还原的位置坐标
         * @param  {egret.Point} p
         */
        set: function (p) {
            this._restPoint = p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIRocker, "angle", {
        /**
         * 当前摇杆偏移的弧度值
         * 取值范围[-π,π]
         * 角度值转换 angle*180/Math.PI
         * @returns number
         */
        get: function () {
            return this._angle;
        },
        set: function (v) {
            this._angle = v;
        },
        enumerable: true,
        configurable: true
    });
    UIRocker._angle = 0;
    return UIRocker;
}(BaseView));
__reflect(UIRocker.prototype, "UIRocker");
var DirState = (function () {
    function DirState() {
        this._state = 0;
        this._rotation = 0; //旋转
    }
    Object.defineProperty(DirState.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state != value) {
                this._state = value;
                switch (this._state) {
                    case 1:
                        this._rotation = 225;
                        break;
                    case 2:
                        this._rotation = 180;
                        break;
                    case 3:
                        this._rotation = 135;
                        break;
                    case 4:
                        this._rotation = 270;
                        break;
                    case 6:
                        this._rotation = 90;
                        break;
                    case 7:
                        this._rotation = 315;
                        break;
                    case 8:
                        this._rotation = 0;
                        break;
                    case 9:
                        this._rotation = 45;
                        break;
                    default:
                        this._rotation = 0;
                }
            }
            this._isChanged = (value > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirState.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (v) {
            this._rotation = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirState.prototype, "isChanged", {
        get: function () {
            return this._isChanged;
        },
        enumerable: true,
        configurable: true
    });
    return DirState;
}());
__reflect(DirState.prototype, "DirState");
var RockerControl = (function () {
    function RockerControl() {
        this.dirState = new DirState();
        this.isBattle = true;
        this.keys = "";
    }
    RockerControl.getInstance = function () {
        if (RockerControl.instance == null) {
            RockerControl.instance = new RockerControl();
        }
        return RockerControl.instance;
    };
    /**
     *判断两点之间的8方向
    * @param px 开始位置x
    * @param py 开始位置y
    * @param tx 结束位置x
    * @param ty 结束位置y
    * @return
    *
    */
    RockerControl.judgeDir = function (a) {
        var dir;
        var angle = a * 180 / Math.PI;
        if (angle > -157.5 && angle < -112.5) {
            dir = 1;
        }
        else if (angle > -112.5 && angle <= -67.5) {
            dir = 2;
        }
        else if (angle > -67.5 && angle <= -22.5) {
            dir = 3;
        }
        else if (angle > -22.5 && angle <= 22.5) {
            dir = 6;
        }
        else if (angle > 22.5 && angle <= 67.5) {
            dir = 9;
        }
        else if (angle > 67.5 && angle <= 112.5) {
            dir = 8;
        }
        else if (angle > 112.5 && angle <= 157.5) {
            dir = 7;
        }
        else {
            dir = 4;
        }
        return dir;
    };
    return RockerControl;
}());
__reflect(RockerControl.prototype, "RockerControl");
//# sourceMappingURL=UIRocker.js.map