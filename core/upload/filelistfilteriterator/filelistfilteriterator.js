//<![CDATA[
;(function(window){
    // https://developer.mozilla.org/fr/docs/Web/API/NodeFilter
    // https://developer.mozilla.org/fr/docs/Web/API/File
    /**
     *
     * @param callback Closure retournant true|false
     * @constructor
     */
    window.LibreJs.Upload.FileListFilterIterator = function(callback){
        var plugin   = this;
        plugin.callback = callback;
        /**
         *
         * @param filesList FileList
         * @returns {Array} Filtered files
         */
        plugin.accept = function(filesList) {
            var buffer = [];
            var i, j;
            i = 0;
            j = filesList.length;

            for(i;i<j;i++) {
                var file = filesList[i];
                if(plugin.callback.call(this, file)) {
                    buffer.push(file);
                }
            }
            return buffer;
        };

        plugin.toArray = function(filesList) {
            var buffer = [];
            var i, j;
            i = 0;
            j = filesList.length;

            for(i;i<j;i++) {
                var file = filesList[i];
                buffer.push(file);
            }
            return buffer;
        };

    };

    var FilterIterator = window.LibreJs.Upload.FileListFilterIterator.prototype.constructor;

})(window);
//]]>