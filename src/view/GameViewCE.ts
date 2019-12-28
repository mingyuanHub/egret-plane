class GameViewCE extends BaseView{
    protected grp_container: eui.Group;
    protected grp_ForceView: eui.Group;

    public constructor() {
        super()
        this.grp_container = new eui.Group();
        this.grp_container.width = 720
        this.grp_container.height = 1280
        this.addChild(this.grp_container)
    }

    public get moduleName():string {
        return "GameViewSkin";
    }
    
}