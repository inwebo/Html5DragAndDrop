//<![CDATA[
(function(window) {
    var Factory = window.LibreJs.Upload.Factory.prototype.constructor;
    var Display = window.LibreJs.Upload.Display.prototype.constructor;
    var HashTable = window.LibreJs.HashTable.prototype.constructor;
    var Uploader = window.LibreJs.Upload.Uploader.prototype.constructor;

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
        action            : 'up.php',
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

    var node =document.createElement('h1');
    node.innerHTML = 'Test';
    var html = window.document.getElementsByTagName('body')[0];
    html.appendChild(node);
    node.innerHTML = 'Test+';
    var upload = new Uploader(5);
    //upload.st();

    /*
     window.document.addEventListener('dz-update',function(e){

     }, false);

     window.document.addEventListener('dz-filtered',function(e){

     }, false);
     */
})(window);
//]]>