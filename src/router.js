
/**
 * 路由器
 * @author : yu.yuy
 * @createTime : 2012-07-21
 */
(function(){
    var homepage = require("./app/controllers/homepage.js"),
    javascript = require("./app/controllers/javascript.js"),
    css = require("./app/controllers/css.js"),
    html = require("./app/controllers/html.js");
    tools = require("./app/controllers/tools.js");
    module.exports = function(app){
    	//JS组件
    	app.get('/js', function(req, res){
            javascript.init(req, res);
        });
        //css基础
    	app.get('/css', function(req, res){
            css.init(req, res);
        });
        //HTML基础
        app.get('/html', function(req, res){
            html.init(req, res);
        });
        //工具
        app.get('/tools', function (req, res) {
            tools.init(req, res);
        });
    };
})();