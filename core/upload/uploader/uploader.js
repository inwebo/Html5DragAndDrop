//<![CDATA[
;(function(window){

    /**
     * Events à lancer
     *
     */


    /**
     * Events à attraper
     * File queued
     */

    /**
     * A chaque ajout d'elements dans la file d'attente. Traite la file d'attente.
     * // les uploads
     * @constructor
     */
    window.LibreJs.Upload.Uploader = function(max, fileArrayName){
        var plugin        = this;
        plugin.maxUploads = max;
        plugin.running    = false;
        plugin.threads    = 0;
        plugin.fileArrayName = fileArrayName || 'File';
        plugin.toUpload   = [];

        var init = function() {
            window.document.addEventListener('dz-queued',function(e){
                //console.log(e.detail);
                plugin.start(e.detail);
            }, false);

            // Ajout event listener
                // Il y a t'il un observer
                    // Non
                        // Creation de l'observer

                    // Oui
                        // Est il en cours
                            // Non start()
                            // Oui
                                // Thread disponible ?
                                // Non attente
                                // Oui
                                    // Pour toute la place libre ajout d'un upload
            
        };

        /**
         * Métier
         */
        plugin.observer = function() {
            if(plugin.freeThreadRoom()) {

            }
        };
        /**
         * Clean interval
         */
        plugin.cleanObserver = function() {

        };

        plugin.isReady = function(){

        };

        plugin.toUpload = function(queuedElements) {
            for(var k in queuedElements) {
                if(queuedElements.hasOwnProperty(k)) {
                    var current = queuedElements[k];
                    plugin.toUpload.push(current);
                }
            };
        };

        plugin.freeThreadRoom = function() {
            return plugin.threads < plugin.maxUploads;
        };

        plugin.isRunning = function() {
            return plugin.running;
        };

        plugin.start = function(queuedElements){
            for(var k in queuedElements) {
                if(queuedElements.hasOwnProperty(k)) {
                    var current = queuedElements[k];
                    current.send(plugin.fileArrayName);
                }
            };
        };

        init();
    };
    var Uploader = window.LibreJs.Upload.Uploader.prototype.constructor;

    var EventFactory = window.LibreJs.Upload.Uploader.prototype.eventFactory = function(name, details) {
        return new CustomEvent(name,details);
    };
})(window);
//]]>