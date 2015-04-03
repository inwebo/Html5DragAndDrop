//<![CDATA[
;(function(window){
    /**
     *
     * @param id string Id du formulaire
     * @param action string Action du formulaire
     * @param maxFileSize string Upload maximum en octets
     * @param responseArrayName string Nom du tableau contenant les fichiers
     * @constructor
     */
    window.LibreJs.Upload.FormBuilder = function(id, action, maxFileSize, responseArrayName){

        var plugin = this;
        plugin.id;
        plugin.action;
        plugin.maxFileSize;
        plugin.responseArrayName;

        var init = function(id, action, maxFileSize, responseArrayName){
            plugin.id               = id;
            plugin.action           = action;
            plugin.maxFileSize      = maxFileSize || "300000";
            plugin.responseArrayName= responseArrayName;
        };

        plugin.get = function() {
            var form = document.createElement('form');
            form.setAttribute('id',plugin.id);
            form.setAttribute('action',plugin.action);
            form.setAttribute('method','POST');
            form.setAttribute('enctype','multipart/form-data');

            var maxFileSize = document.createElement('input');
            maxFileSize.setAttribute('type', 'hidden');
            maxFileSize.setAttribute('id', 'MAX_FILE_SIZE');
            maxFileSize.setAttribute('name', 'MAX_FILE_SIZE');
            maxFileSize.setAttribute('value', plugin.maxFileSize);
            form.appendChild(maxFileSize);

            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('name', plugin.responseArrayName + "[]");
            input.setAttribute('multiple', 'multiple');
            form.appendChild(input);
            return form;
        };

        init(id, action, maxFileSize, responseArrayName);

    };

    var FormBuilder = window.LibreJs.Upload.FormBuilder.prototype.constructor;
})(window);
//]]>