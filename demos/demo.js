//<![CDATA[
(function(window) {
    var Factory = window.LibreJs.Upload.Factory.prototype.constructor;
    var Display = window.LibreJs.Upload.Display.prototype.constructor;


    var allowedType = ['image/png'];
    var dropZone          = window.document.getElementById('drop-zone');
    var listValid         = window.document.getElementById('display-valid');
    var listInvalid       = window.document.getElementById('display-invalid');

    app = new Factory(dropZone, allowedType,{
        /**
         * @type {String}
         */
        id                : 'demoBuilder',
        /**
         * @type {String}
         */
        action            : 'php/uploader.php',
        /**
         * @type {int}
         */
        maxFileSize       : 2097152,
        /**
         * @type {String}
         */
        responseArrayName : 'FilesToUpload'
    });

    var display = new Display(listValid, 'dz-queued');

    var displayFiltered = new Display(listInvalid, 'dz-filtered-queued');

    //var upload = new Uploader(5);

})(window);
//]]>