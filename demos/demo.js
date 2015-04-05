//<![CDATA[
(function(window) {
    var Factory = window.LibreJs.Upload.Factory.prototype.constructor;
    var Display = window.LibreJs.Upload.Display.prototype.constructor;
    var Config = window.LibreJs.Upload.Config;
    var allowedType = ['image/png','images/jpg'];
    var dropZone          = window.document.getElementById('drop-zone');
    var listValid         = window.document.getElementById('display-valid');
    var listInvalid       = window.document.getElementById('display-invalid');

    var app = new Factory(dropZone, allowedType,{
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
    },
   /**
    * Max upload
    */
    5);

    var display = new Display(listValid, Config.events.dz.queued);
    var displayFiltered = new Display(listInvalid, Config.events.dz.filtered);

})(window);
//]]>