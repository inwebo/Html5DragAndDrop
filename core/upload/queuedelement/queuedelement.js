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
                //console.log('Done');
                //plugin.status = "done";
                plugin.setStatus("done");
            });
        };

        plugin.send = function() {
            var formData = new FormData();
            formData.append('File', plugin.file);
            plugin.ajax.send(formData);
            plugin.setStatus("uploading");
        };

        plugin.getStatusTag = function() {
            var li = plugin.element.getElementsByTagName('li');
            var status = li[li.length-2];
            console.log(status);
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