//<![CDATA[
;(function(window){
    window.LibreJs.Upload.QueuedElement = function(file, element, ajax){
        var plugin      = this;
        plugin.file     = file;
        plugin.element  = element;
        plugin.ajax     = ajax;
        plugin.status   = Config.status.init;

        // init callbacks

        var init = function() {

            plugin.ajax.upload.addEventListener('progress', function(e){
                plugin.setProgressTagValue(e);
            });
            plugin.ajax.addEventListener('load',function(e){

                if(plugin.ajax.status == 500) {
                    plugin.setStatus(Config.status.error + ' : ' + plugin.ajax.responseText);
                }
                else {
                    // Event done
                    var event = new CustomEvent(Config.events.queuedItem.done,{
                        'detail':plugin
                    });
                    plugin.status = Config.status.done;
                    window.document.dispatchEvent(event);
                    plugin.setStatus(Config.status.done);
                }
            });
            plugin.ajax.addEventListener('error',function(e){
                plugin.setStatus(Config.status.error);
            });

        };

        plugin.send = function(fileArrayName) {
            fileArrayName = fileArrayName || 'File';
            var formData = new FormData();
            formData.append(fileArrayName, plugin.file);
            plugin.ajax.send(formData);
            plugin.setStatus(Config.status.uploading);
        };

        plugin.isDone = function() {
            return plugin.ajax.readyState === 4;
        };

        plugin.getStatusTag = function() {
            var items = plugin.getElementsByAttribute(Config.dataAttribute.item.status);
            return items[items.length-1];
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

        plugin.setProgressTagValue = function(e) {
            plugin.getProgressTag().setAttribute('value',Math.ceil(plugin.getPercent(e)).toString());
        };

        plugin.getElementsByAttribute = function(attribute){
            var matchingElements = [];
            var allElements = plugin.element.getElementsByTagName('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].getAttribute(attribute) !== null)
                {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }

        init();

    };
    var Config = window.LibreJs.Upload.Config;
})(window);
//]]>