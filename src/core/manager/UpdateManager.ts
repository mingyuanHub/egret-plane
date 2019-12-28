/**
 *
 * @author 
 *
 */
class UpdateManager 
{
    private static _dicupdateable: Array<IUpdateable> = [];
    private static _lastDelta:number;
    private static _started: Boolean = false;
	public constructor() 
	{
	}
	
    public static start(): void
    {
        this._started = true;
    }
    
    public static stop(): void
    {
        this._started = false;
    }
    
    public static init(): void
    {
        this._lastDelta = egret.getTimer();
        egret.startTick(this.update,this);
    }
    

    public static update(timeStamp:number): boolean
    {
        let delta:number = timeStamp - this._lastDelta;
        this._lastDelta = timeStamp;
        if(this._started)
        {
            for(var i: number = this._dicupdateable.length-1;i >=0;i--)
            { 
                if(this._dicupdateable[i].deleted) 
                {
                    this._dicupdateable.splice(i,1);
                }
                else 
                {
                    this._dicupdateable[i].update(delta);
                }
            }
        }
        return false;
    }
	
    public static addUpdateable(up: IUpdateable): void
    {
        var index: any = this._dicupdateable.indexOf(up);
        up.deleted = false;
        if(index == -1)
        {
            this._dicupdateable.push(up);
        }
    }
    
    public static delUpdateable( up: IUpdateable): void
    { 
        var index: any = this._dicupdateable.indexOf(up);
        if(index > -1)
        { 
            this._dicupdateable[index].deleted = true;
        }
    }
}
