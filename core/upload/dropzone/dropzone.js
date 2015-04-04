//<![CDATA[
;(function(window){

    if (!Array.prototype.contains) {
        Array.prototype.contains = function(string) { return this.indexOf(string) != -1; };
    }
    if (!Array.prototype.diff) {
        Array.prototype.diff = function (a) {
            return this.filter(function (i) {
                return a.indexOf(i) < 0;
            });
        };
    }
    /**
     * @param {Element} element The drop zone
     * @param {Array} allowedType Allowed mime-type
     * @param {int} maxFileSize Maxe size octets
     * @constructor
     */
    window.LibreJs.Upload.DropZone = function(element, allowedType, maxFileSize){

        var plugin          = this;
        plugin.dropzone     = null;
        plugin.allowedType  = null;
        plugin.maxFileSize  = null;

        /**
         * @param {Element} element
         */
        var init = function(element, allowedType, maxFileSize){
            if( !isCompatible() ) {
                throw "Browser does not support File, FileList & FileReader objects, update it.";
            }
            plugin.dropzone     = element;
            plugin.allowedType  = allowedType || [];
            plugin.maxFileSize  = maxFileSize || 2097152;
            addEventListeners();
        };

        /**
         * @returns {boolean}
         */
        var isCompatible = function() {
            return (window.File && window.FileList && window.FileReader);
        };

        var addEventListeners = function() {
            plugin.dropzone.addEventListener("dragenter",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("dragstart",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("dragend",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("dragleave",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("dragover",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("drag",function(e){e.preventDefault();}, false);
            plugin.dropzone.addEventListener("drop",dropHandler, false);
        };

        /**
         * @param {Event} e
         */
        var dropHandler = function(e){
            e.preventDefault();
            filter(e.target.files || e.dataTransfer.files);
        };

        /**
         * @param {FileList} fileList
         */
        var filter = function(fileList) {
            var filterIterator = new FilterIterator(function(file){
                return ((plugin.allowedType.contains(file.type)) && (file.size < plugin.maxFileSize));
            });
            var accepted = filterIterator.accept(fileList);
            dispatcher(accepted, filterIterator.toArray(fileList));
        };

        var dispatcher = function(accepted, fileList) {
            if(accepted.length > 0) {
                var event = new CustomEvent('dz-update', {
                    'detail': accepted
                });
                window.document.dispatchEvent(event);
            }

            var filtered = fileList.diff(accepted);
            if(filtered.length >0) {
                var event = new CustomEvent('dz-filtered', {
                    'detail': filtered
                });
                window.document.dispatchEvent(event);
            }


        };

        init(element, allowedType, maxFileSize);
    };

    var DropZone = window.LibreJs.Upload.DropZone.prototype.constructor;
    var FormBuilder = window.LibreJs.Upload.FormBuilder.prototype.constructor;
    var FilterIterator = window.LibreJs.Upload.FileListFilterIterator.prototype.constructor;
})(window);
//]]>