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

    new Display(listValid, Config.events.dz.queued);
    new Display(listValid, Config.events.dz.filtered);

    n = function() {
        window.open("http://localhost/Html5DragAndDrop/", '_BLANK',
            'height=500,width=500,location=no,menubar=no,resizable=no,titlebar=no,toolbar=no'
        );
        window.moveTo(0,0);
    };

    function scrollElement(behavior) {
        var scrollContainer = document.getElementsByTagName("html")[0];
        scrollContainer.className = behavior;
        var scrollPosition = scrollContainer.scrollTop === 0 ? scrollContainer.scrollHeight : 0;
        scrollContainer.scrollTo(0, scrollPosition);
    }

    window.document.addEventListener("dz-items-queued",function(){
        scrollElement('smooth')
    });
    var top = document.getElementById('top');
    top.addEventListener("click",function(){
        scrollElement('smooth')
    });

})(window);
//]]>