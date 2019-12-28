/**
 *
 * @author 
 *
 */
class XMLManager {
    private static _instance: XMLManager;
    private _jsZip: JSZip = null;// 压缩包数据
    private _dicData: any = {};
    private _levelData: any = {};// 关卡数据信息
    private _maxLevel: number = 1;
    
    public static getInstance(): XMLManager {
        if (XMLManager._instance == null)
            XMLManager._instance = new XMLManager();
        return XMLManager._instance;
    }

    public getDataByName(baseName: string): Object {
        return this._dicData[baseName];
    }


    /**
     * 读取json 数据
     */
    public readJsZipJson(all_jsZip: any): void {
        this._jsZip = new JSZip(all_jsZip);
        // 读取基础数据
        try {
            let pObj = JSON.parse(this._jsZip.file("all.json").asText());
            // 开始读取数据
            for (var key in pObj) {
                var cls: any = egret.getDefinitionByName(key + "Vo");
                if(!cls) {
                    continue;
                }
                // 读取配置数据
                let infoAry = pObj[key];
                let infoData = {};
                var vo: any = null;
                for (var i: number = 0; i < infoAry.length; ++i) {
                    vo = new cls(infoAry[i]);
                    infoData[vo.ID] = vo;
                }
                // 保存数据
                this._dicData[key] = infoData;
            }
        } catch (error) {
            // Log.out(this, "parse error " + error);
        }
    }
}
