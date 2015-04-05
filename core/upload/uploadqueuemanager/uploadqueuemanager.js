//<![CDATA[
;(function(window){
    window.LibreJs.Upload.UploadQueueManager = function(max){

        /**
         * Alias window.document.addEventListener;
         * @param name
         * @param callback
         */
        var addEventListener = function(name, callback) {
            window.document.addEventListener(name, callback, false);
        };

        var plugin        = this;
        plugin.max        = max || 5;
        plugin.threads    = 0;
        /**
         * Index courant la file d'attente
         * @type {number}
         */
        plugin.index      = 0;
        plugin.status     = Config.status.init;
        plugin.observer   = null;
        plugin.queue      = [];

        var init = function() {
            addListeners();
        };

        var addListeners = function(){

            addEventListener(Config.events.dz.queued, function(e){
                toQueue(e.detail);
                if( isStarted() === false ) {
                    plugin.observer = addObserver();
                }
            }, false);

            addEventListener(Config.events.uploadQueueManager.added,function(e){
                e.detail.send();
            }, false);

            addEventListener(Config.events.queuedItem.done,function(e){
                plugin.threads--;
            }, false);

        };

        //region Helpers
        var toQueue = function(queuedElements){
            for(var k in queuedElements) {
                if(queuedElements.hasOwnProperty(k)) {
                    var current = queuedElements[k];
                    plugin.queue.push(current);
                }
            };
        };
        var isStarted = function(){
            return !(plugin.observer === null);
        };
        var addObserver = function(){
            return setInterval(observer, 100);
        };
        var cleanObserver = function() {
            clearInterval( plugin.observer );
            plugin.observer = null;
            plugin.status   = Config.status.stop;
        };
        var gotFreeThreadRoom = function() {
            return plugin.threads < plugin.max;
        };
        var getFreeThreadRoom = function() {
            return plugin.max - plugin.threads;
        };
        // endregion

        var observer = function(){
            plugin.status = Config.status.start;
            if( gotFreeThreadRoom() ) {
                var i, j;
                i = 0;
                j = getFreeThreadRoom();

                for(i;i<j;++i) {
                    if( isItem() ) {
                        newThread();
                    }
                };
            }

            if( queueEnd() ) {
                cleanObserver();
            }
        };

        var next = function() {
            plugin.index++;
        }

        var isItem =function() {
            return plugin.queue[plugin.index] !== undefined;
        };

        var queueEnd = function() {
            return plugin.queue.length === plugin.index;
        };

        var newThread = function(){
            var queuedElement = plugin.queue[plugin.index];
            next();
            plugin.threads++;
            var event = new CustomEvent(Config.events.uploadQueueManager.added, {
                'detail': queuedElement
            });
            window.document.dispatchEvent(event);
        };

        init();
    };
    var Config = window.LibreJs.Upload.Config;
})(window);
//]]>