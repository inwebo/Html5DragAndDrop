//<![CDATA[
;(function(window){

    window.LibreJs.Upload.Display = function(list, event){
        var plugin   = this;
        plugin.list  = list;
        /**
         * @todo : Custom event
         */
        plugin.event = event;

        var init = function() {
            window.document.addEventListener(plugin.event,function(e){
                for(var item in e.detail) {
                    if(e.detail.hasOwnProperty(item)) {
                        var item = e.detail[item];
                        plugin.list.appendChild(item.element);
                    }
                };
            }, false);
        };

        init();
    };
    var Display = window.LibreJs.Upload.Display.prototype.constructor;
})(window);
//]]>