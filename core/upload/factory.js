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
    window.LibreJs.Upload.Factory = function(element, allowedType, formConfig){
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

        /**
         * @type {Element}
         */
        plugin.form;

        plugin.queue;

        var init = function(element, allowedType) {
            plugin.dropzone = new DropZone(element, allowedType, plugin.formConfig.maxFileSize);
            plugin.form     = new FormBuilder(plugin.formConfig.id, plugin.formConfig.action, plugin.formConfig.maxFileSize, plugin.formConfig.responseArrayName);
            plugin.queue    = new HashTable();
            element.appendChild(plugin.form.get());
            addEventListener();
        };

        /**
         * Temp !
         * @todo : A affiner par des callbacks
         */
        var addEventListener = function() {
            window.document.addEventListener('dz-update',function(e){
                //console.log('ok');
                //console.log(e.detail);
                var hashTable = plugin.arrayToHashTable(e.detail);
                toQueue(hashTable);
                console.log(plugin.queue, hashTable);

                var event = new CustomEvent('dz-queued',{
                    'detail': hashTable
                });
                window.document.dispatchEvent(event);
            }, false);
            window.document.addEventListener('dz-filtered',function(e){
                //console.log('filtered');
                //console.log(e.detail);
                var hashTable = plugin.arrayToHashTable(e.detail);
                var event = new CustomEvent('dz-filtered-queued',{
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
        plugin.arrayToHashTable = function(arrayFile) {
            var i, j, buffer;
            i = 0;
            j = arrayFile.length;
            buffer = {};
            for(i;i<j;i++) {
                var current = arrayFile[i];
                var hashId = current.name.hash().toString();
                //buffer.push([hashId,current]);
                var element = FactoryElement(hashId,current);
                var queuedElement = FactoryQueuedElement(current,element, plugin.formConfig.action);
                buffer[hashId] = queuedElement;

            };
            //console.log(buffer);
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
        xhr.setRequestHeader('File',JSON.stringify({
            name:file.name,
            lastModified:file.lastModified,
            size:file.size,
            type:file.type
        }));
        return new QueuedElement(file,element,xhr);
    };

    var FactoryElement = window.LibreJs.Upload.Factory.prototype.factoryElement = function(id, file){
        var rootLi = document.createElement('li');
        var state = 'queued';
        rootLi.setAttribute('id','item-'+ id);
        rootLi.setAttribute('data-status',state);
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        rootLi.setAttribute('data-name',file.name);
        li.innerHTML = file.name;
        ul.appendChild(li);
        var li = document.createElement('li');
        li.innerHTML = (new Date(file.lastModified)).toDateString();
        rootLi.setAttribute('data-lastModified',file.lastModified);
        ul.appendChild(li);
        var li = document.createElement('li');
        li.innerHTML = file.size;
        ul.appendChild(li);

        var li = document.createElement('li');
        li.innerHTML = state;
        ul.appendChild(li);

        var li = document.createElement('li');
        var progressBar = document.createElement('progress');
        progressBar.setAttribute('max','100');
        progressBar.setAttribute('value','0');
        li.appendChild(progressBar);
        ul.appendChild(li);
        rootLi.appendChild(ul);
        return rootLi;
    };


    /**
     * Objet file en dom node
     */
    window.LibreJs.Upload.Factory.prototype.fileToElement = function(){};
    /**
     * Wrapper d'objet file, ajoute la représentation en mémoire d'un dom node, et d'un objet ajax prêt
     */
    window.LibreJs.Upload.Factory.prototype.fileToQueuedElement  = function(){};
    /**
     * Ajoute le QueuedElement dans la liste d'attente principale
     */
    window.LibreJs.Upload.Factory.prototype.arrayFileToQueued  = function(){};

    var FormBuilder = window.LibreJs.Upload.FormBuilder.prototype.constructor;
    var DropZone = window.LibreJs.Upload.DropZone.prototype.constructor;
    var HashTable = window.LibreJs.HashTable.prototype.constructor;
    var QueuedElement = window.LibreJs.Upload.QueuedElement.prototype.constructor;
})(window);
//]]>