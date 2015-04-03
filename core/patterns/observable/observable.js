//<![CDATA[
;(function(window){
    window.LibreJs.Patterns.Observable = function(){
        var plugin       = this;
        plugin.observers = [];

        /**
         * @param {window.LibreJs.Patterns.Observer} observer
         */
        plugin.attachObserver = function(observer) {
            plugin.observers.push(observer);
        };

        /**
         * @param {Event} event
         * @param {Array} parameters
         */
        plugin.notify = function(event, parameters){
            var observer;
            for(observer in plugin.observers) {
                observer.update(event, parameters)
            };
        };
    };
})(window);
//]]>