//<![CDATA[
;(function(window){
    window.LibreJs.HashTable = function(){
        var plugin       = this;
        plugin.data      = {};

        plugin.set = function(id, item) {
            plugin.data[id] = item;
        };

        plugin.get = function(id) {
            return plugin.data[id];
        };

        plugin.del = function(id) {
            if(plugin.data.hasOwnProperty(id)) {
                delete plugin.data[id];
            }
        };
    };
})(window);
//]]>