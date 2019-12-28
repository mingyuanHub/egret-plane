var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var XMLManager = (function () {
    function XMLManager() {
        this._jsZip = null; // 压缩包数据
        this._dicData = {};
        this._levelData = {}; // 关卡数据信息
        this._maxLevel = 1;
    }
    XMLManager.getInstance = function () {
        if (XMLManager._instance == null)
            XMLManager._instance = new XMLManager();
        return XMLManager._instance;
    };
    XMLManager.prototype.getDataByName = function (baseName) {
        return this._dicData[baseName];
    };
    /**
     * 读取json 数据
     */
    XMLManager.prototype.readJsZipJson = function (all_jsZip) {
        this._jsZip = new JSZip(all_jsZip);
        // 读取基础数据
        try {
            var pObj = JSON.parse(this._jsZip.file("all.json").asText());
            // 开始读取数据
            for (var key in pObj) {
                var cls = egret.getDefinitionByName(key + "Vo");
                if (!cls) {
                    continue;
                }
                // 读取配置数据
                var infoAry = pObj[key];
                var infoData = {};
                var vo = null;
                for (var i = 0; i < infoAry.length; ++i) {
                    vo = new cls(infoAry[i]);
                    infoData[vo.ID] = vo;
                }
                // 保存数据
                this._dicData[key] = infoData;
            }
        }
        catch (error) {
            // Log.out(this, "parse error " + error);
        }
    };
    return XMLManager;
}());
__reflect(XMLManager.prototype, "XMLManager");
//# sourceMappingURL=XMLManager.js.map