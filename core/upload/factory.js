//<![CDATA[
;(function(window){

    String.prototype.hash = function() {
        var hash = 0, i, chr, len;
        if (this.length == 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    /**
     *
     * @param {Element} element
     * @param {Array} allowedType
     * @param {Object} formConfig
     * @constructor
     */
    window.LibreJs.Upload.Factory = function(element, allowedType, formConfig, maxUpload){
        var plugin   = this;
        /**
         * @type {window.LibreJs.Upload.DropZone.prototype.constructor}
         */
        plugin.dropzone = null;

        plugin.formConfig = {
            /**
             * @type {String}
             */
            id                : formConfig.id,
            /**
             * @type {String}
             */
            action            : formConfig.action,
            /**
             * @type {int}
             */
            maxFileSize       : formConfig.maxFileSize,
            /**
             * @type {String}
             */
            responseArrayName : formConfig.responseArrayName
        };

        plugin.maxUpload = maxUpload || 5;

        /**
         * @type {Element}
         */
        plugin.form;

        plugin.queue;

        plugin.uploader;

        var init = function(element, allowedType) {
            plugin.dropzone = new DropZone(element, allowedType, plugin.formConfig.maxFileSize);
            plugin.form     = new FormBuilder(plugin.formConfig.id, plugin.formConfig.action, plugin.formConfig.maxFileSize, plugin.formConfig.responseArrayName);
            plugin.queue    = new HashTable();
            plugin.uploader = new UploadQueueManager(plugin.maxUpload);
            element.appendChild(plugin.form.get());
            addEventListener();
        };

        /**
         * Temp !
         * @todo : A affiner par des callbacks
         */
        var addEventListener = function() {

            window.document.addEventListener( Config.events.dz.valid, function(e){
                var hashTable = plugin.arrayToHashTable(e.detail, Config.status.init);
                toQueue(hashTable);
                var event = new CustomEvent(Config.events.dz.queued,{
                    'detail': hashTable
                });
                window.document.dispatchEvent(event);
            }, false);

            window.document.addEventListener(Config.events.dz.invalid,function(e){
                //console.log('filtered');
                var hashTable = plugin.arrayToHashTable(e.detail,Config.status.filtered);
                var event = new CustomEvent(Config.events.dz.filtered,{
                    'detail': hashTable
                });
                window.document.dispatchEvent(event);
            }, false);
        };

        /**
         * static
         * @param arrayFile
         * @returns {{}}
         */
        plugin.arrayToHashTable = function(arrayFile,state) {
            var i, j, buffer;
            i = 0;
            j = arrayFile.length;
            buffer = {};
            for(i;i<j;i++) {
                var current = arrayFile[i];
                var hashId = current.name.hash().toString();
                var element = FactoryElement(hashId,current,state);
                var queuedElement = FactoryQueuedElement(current,element, plugin.formConfig.action);
                buffer[hashId] = queuedElement;
            };
            return buffer;
        };

        var toQueue = function(hashTable) {
            for(var k in hashTable) {
                //console.log(hashTable[k]);
                if(hashTable.hasOwnProperty(k)) {
                    plugin.queue.set(k,hashTable[k]);
                }
            };
        };

        plugin.getByHash = function(id) {
            return plugin.data.queue.get(id);
        };

        init(element, allowedType);
    };


    var FactoryQueuedElement = window.LibreJs.Upload.Factory.prototype.factoryQueuedElement = function(file,element, action){
        var xhr = new XMLHttpRequest();
        xhr.open("POST",action, true);

        return new QueuedElement(file,element,xhr);
    };

    var FactoryElement = window.LibreJs.Upload.Factory.prototype.factoryElement = function(id, file, queuedElementStatus){
        var rootLi = document.createElement('li');
        rootLi.setAttribute('id', 'item-' + id);
        rootLi.setAttribute(Config.dataAttribute.listItem, '');

        var ul = document.createElement('ul');
        ul.setAttribute(Config.dataAttribute.listItemInfos, '');

        var li = document.createElement('li');
        li.setAttribute(Config.dataAttribute.item.name,'');
        li.innerHTML = file.name;
        ul.appendChild(li);

        var li = document.createElement('li');
        li.setAttribute(Config.dataAttribute.item.lastModified,'');
        li.innerHTML = (new Date(file.lastModifiedDate)).toDateString();
        ul.appendChild(li);

        var li = document.createElement('li');
        li.setAttribute(Config.dataAttribute.item.type,'');
        li.innerHTML = file.type;
        ul.appendChild(li);

        var li = document.createElement('li');
        li.setAttribute(Config.dataAttribute.item.size,'');
        li.innerHTML = file.size;
        ul.appendChild(li);

        var li = document.createElement('li');
        li.setAttribute(Config.dataAttribute.item.status, '');
        li.innerHTML = queuedElementStatus;
        ul.appendChild(li);


            var li = document.createElement('li');
            li.setAttribute(Config.dataAttribute.item.progress, '');
            if(queuedElementStatus !== Config.status.filtered ) {
                var progressBar = document.createElement('progress');
                progressBar.setAttribute('max','100');
                progressBar.setAttribute('value','0');
                li.appendChild(progressBar);
            }
        else {
                li.innerHTML='-';
            }
            ul.appendChild(li);

        rootLi.appendChild(ul);

        return rootLi;
    };
    var UploadQueueManager = window.LibreJs.Upload.UploadQueueManager.prototype.constructor;
    var FormBuilder = window.LibreJs.Upload.FormBuilder.prototype.constructor;
    var DropZone = window.LibreJs.Upload.DropZone.prototype.constructor;
    var HashTable = window.LibreJs.HashTable.prototype.constructor;
    var QueuedElement = window.LibreJs.Upload.QueuedElement.prototype.constructor;
    var Config = window.LibreJs.Upload.Config;
})(window);
//]]>