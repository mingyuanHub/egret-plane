class UIRocker extends BaseView{
    private _rect:eui.Rect;
    private _bgImg:eui.Image = new eui.Image();
    private _ball:eui.Image = new eui.Image();
    private _sp:egret.Sprite = new egret.Sprite();

    private _radius:number = 110;//移动半径 底半径
    private _ballRadius:number = 30;   //小球半径
    private _centerP:egret.Point = new egret.Point();
    private _movePoint: egret.Point = new egret.Point();//移动的位置
    private _restPoint: egret.Point;//重置的位置
    private _touchId: number=0;

    private _range:egret.Rectangle;
    
    private static _angle : number = 0;
    
    /**
     * @param  {egret.Rectangle} range 触发范围
     * @param  {string} bg? 背景资源
     * @param  {string} ball? 资源
     * @param  {isShowRange} 触发区域透明度 默认不显示
     */
    public constructor(range:egret.Rectangle,bg:string,ball:string,rangeAlpha:number=0) {
        super();
        this._range = range;
        this.initUI(bg,ball,rangeAlpha);
    }
    private async initUI(bg:string,ball:string,rangeAlpha:number=0){
        this._rect = new eui.Rect(this._range.width,this._range.height);
        this._rect.alpha = rangeAlpha;
        this._rect.x = this._range.x;
        this._rect.y = this._range.y;
        this.addChild(this._rect);
        
        this._bgImg.texture = await RES.getResAsync(bg);
        this._radius = this._bgImg.width>>1;
        this._bgImg.anchorOffsetX = this._radius;
        this._bgImg.anchorOffsetY = this._radius;
        this._ball.texture = await RES.getResAsync(ball);
        this._ballRadius = this._ball.width>>1;
        this._ball.anchorOffsetX = this._ball.anchorOffsetY = this._ballRadius;

        this._sp.addChild(this._bgImg);
        this._sp.addChild(this._ball);
        if(!this._restPoint){
            this._restPoint = new egret.Point(this._range.x+this._range.width*0.5,this._range.y+this._range.height*0.5)
        }
        this._sp.touchEnabled = this._sp.touchChildren = false;
        this._sp.visible = false;
    }
    //按下摇杆
    private touchBeginHandler(evt: egret.TouchEvent): void {
        if(this._touchId != 0){
            return;
        }
        this._sp.x = evt.stageX - GameGlobal.offsetX;
        this._sp.y = evt.stageY ;
        this._centerP.x = this._sp.x;
        this._centerP.y = this._sp.y;
        this.show();
        this._touchId = evt.touchPointID;
        // this._rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.touchMoveHandler(evt);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        GameGlobal.baseLayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
    }
    //摇杆移动
    private touchMoveHandler(evt: egret.TouchEvent): void {
        if(this._touchId != evt.touchPointID){
            return;
        }
        let tx:number = evt.stageX - GameGlobal.offsetX;
        let ty:number = evt.stageY ;
        this._movePoint.x = tx;
        this._movePoint.y = ty;
        let dist: number = egret.Point.distance(this._centerP, this._movePoint);
        UIRocker.angle = Math.atan2(ty - this._centerP.y, tx - this._centerP.x);
        if(dist >= this._radius){//超出范围
            let mx:number = Math.cos(UIRocker.angle)*this._radius;
            let my:number = Math.sin(UIRocker.angle)*this._radius;
            this._centerP.x = this._sp.x = tx - mx;
            this._centerP.y = this._sp.y = ty - my;
        }
        this._ball.x = tx - this._centerP.x;
        this._ball.y = ty - this._centerP.y;
        // console.log("  angle=> " + UIRocker.angle*180/Math.PI);
        if(dist < 10){
            RockerControl.getInstance().dirState.state = 0;
            return;
        }
        // // //计算方向上
        RockerControl.getInstance().dirState.state = RockerControl.judgeDir(-UIRocker.angle);
        RockerControl.getInstance().dirState.rotation = 90 + UIRocker.angle * 180 / Math.PI;
        // console.log("  angle=> " + -UIRocker.angle*180/Math.PI+"当前方向->>> "+BattleController.getInstance().dirState.state);
    }

    //取消摇杆
    private cancelHandler(evt: egret.TouchEvent): void {
        if(this._touchId == evt.touchPointID){
            this.reset();
            // this._rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
            GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
            UIRocker.angle = 0;
            RockerControl.getInstance().dirState.state = 0;
        }
    }
    public show():void{
        if(this._sp.x==0){
            this._sp.x = 360;
            this._sp.y = 1100;
        }
        !this._sp.parent && this.addChild(this._sp);
    }
    private reset():void{
        this._touchId = 0;
        this._ball.x = 0;
        this._ball.y = 0;
        this._sp.x = this._restPoint.x;
        this._sp.y = this._restPoint.y;
    }
    private hide():void{
        this._touchId = 0;
        this._sp.parent && this._sp.parent.removeChild(this._sp);
    }
    public start(){
        this._rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }
    //停止虚拟摇杆
    public stop(){
        RockerControl.getInstance().dirState.state = 0;
        this._rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        GameGlobal.baseLayer.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
    }
    protected onAdded(event: egret.Event): void {
        // super.onAdded(event);
        this.start();
    }
    protected onRemoved(event: egret.Event): void {
        // super.onRemoved(event);
        this.hide();
        this.stop();
    }
    /**
     * 当摇杆设置为一直显示时 手指抬起自动还原的位置坐标
     * @param  {egret.Point} p
     */
    public set startPoint(p:egret.Point){
        this._restPoint = p;
    }
    /**
     * 当前摇杆偏移的弧度值 
     * 取值范围[-π,π]
     * 角度值转换 angle*180/Math.PI
     * @returns number
     */
    public static get angle() : number {
        return this._angle;
    }
    public static set angle(v : number) {
        this._angle = v;
    }
}

class DirState {
	public constructor() {
	}
	private _state:number = 0;
	private _isChanged:boolean;
	private _rotation:number = 0;//旋转

	public set state(value:number) {
		if (this._state != value) {
			this._state=value;

				switch (this._state) {
					case 1:
						this._rotation=225;
						break;
					case 2:
						this._rotation=180;
						break;
					case 3:
						this._rotation=135;
						break;
					case 4:
						this._rotation=270;
						break;
					case 6:
						this._rotation=90;
						break;
					case 7:
						this._rotation=315;
						break;
					case 8:
						this._rotation=0;
						break;
					case 9:
						this._rotation=45;
						break;
					default:
						this._rotation = 0;
				}
		}
		this._isChanged = (value>0);
	}

	public get state():number {
		return this._state;
	}
	public get rotation():number {
		return this._rotation;
	}
	public set rotation(v:number) {
		this._rotation = v;
	}
	public get isChanged():boolean {
		return this._isChanged;
	}
}

class RockerControl {
    private static instance: RockerControl; // 主页control

	public dirState:DirState = new DirState();
	public isBattle:boolean = true;
    public static getInstance():RockerControl {
        if (RockerControl.instance == null) {
            RockerControl.instance = new RockerControl();
        }
        return RockerControl.instance;
    }
	private keys:string = "";
	public constructor() {

    }

    /**
	 *判断两点之间的8方向
	* @param px 开始位置x
	* @param py 开始位置y
	* @param tx 结束位置x
	* @param ty 结束位置y
	* @return
	*
	*/
	public static judgeDir(a: number): number {
		var dir: number;
		var angle: number = a * 180 / Math.PI;
		if (angle > -157.5 && angle < -112.5) {
			dir = 1;
		} else if (angle > -112.5 && angle <= -67.5) {
			dir = 2;
		} else if (angle > -67.5 && angle <= -22.5) {
			dir = 3;
		} else if (angle > -22.5 && angle <= 22.5) {
			dir = 6;
		} else if (angle > 22.5 && angle <= 67.5) {
			dir = 9;
		} else if (angle > 67.5 && angle <= 112.5) {
			dir = 8;
		} else if (angle > 112.5 && angle <= 157.5) {
			dir = 7;
		} else {
			dir = 4;
		}
		return dir;
	}

}