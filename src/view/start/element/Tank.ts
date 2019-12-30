class Tank extends egret.Sprite {
    public scaleV = 0.02

    public hp:number;
    
    public constructor() {
        super();
        this.scaleX = this.scaleY = this.scaleV;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.added, this)
    }

    public added() {
        var data = RES.getRes("b_json");
        var tex = RES.getRes("b_png");
        let mcf = new egret.MovieClipDataFactory(data,tex);
        let mc = new egret.MovieClip(mcf.generateMovieClipData("timg"));
        this.addChild(mc);
        mc.play(10);
    }
}