//<![CDATA[
;(function(window){
    window.LibreJs.Upload.QueuedElement = function(file, element, ajax){
        var plugin      = this;
        plugin.file     = file;
        plugin.element  = element;
        plugin.ajax     = ajax;
        plugin.status   = "queued";

        // init callbacks

        var init = function() {
            plugin.ajax.upload.addEventListener('progress',function(e){
                plugin.setPercentProgressTag(e);
            });
            plugin.ajax.addEventListener('load',function(e){
                //plugin.setStatus("done");
                if(plugin.ajax.status == 500) {
                    plugin.setStatus("Error : " + plugin.ajax.responseText);
                }
                else {
                    plugin.setStatus("Uploaded");
                }
            });
            plugin.ajax.addEventListener('error',function(e){
                plugin.setStatus("error");
            });

        };

        /**
         * @todo: le nom provient de la factory
         */
        plugin.send = function(fileArrayName) {
            var formData = new FormData();
            formData.append(fileArrayName, plugin.file);
            plugin.ajax.send(formData);
            plugin.setStatus("uploading");
        };

        plugin.isDone = function() {
            return plugin.ajax.readyState === 4;
        };

        plugin.getStatusTag = function() {
            var li = plugin.element.getElementsByTagName('li');
            var status = li[li.length-2];
            return status;
        };

        plugin.setStatus = function(_status) {
            var status = plugin.getStatusTag();
            status.innerHTML = _status;
        };

        plugin.getProgressTag = function(){
            return plugin.element.getElementsByTagName('progress')[0];
        };

        plugin.getPercent = function(e) {
            return Math.ceil(e.loaded / e.total * 100);
        };

        plugin.setPercentProgressTag = function(e) {
            plugin.getProgressTag().setAttribute('value',Math.ceil(plugin.getPercent(e)).toString());
        };

        init();

    };
    var QueuedElement = window.LibreJs.Upload.QueuedElement.prototype.constructor;
})(window);
//]]>