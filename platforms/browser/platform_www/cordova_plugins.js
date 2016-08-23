cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/admob/www/admob.js",
        "id": "admob.admob",
        "pluginId": "admob",
        "clobbers": [
            "window.admob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "admob": "5.4.2"
}
// BOTTOM OF METADATA
});