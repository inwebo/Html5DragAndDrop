//<![CDATA[
;(function(window){
    /**
     * A chaque ajout d'elements dans la file d'attente. Traite la file d'attente.
     * // les uploads
     * A chaque changement lors d'un upload event affichage mis à jour
     * @constructor
     */
    window.LibreJs.Upload.Uploader = function(max){
        var plugin   = this;
        plugin.max   = max;
        var count  = 0;

        var init = function() {
            window.document.addEventListener('dz-queued',function(e){
                //console.log(e.detail);
                plugin.start(e.detail);
            }, false);
        };

        plugin.start = function(queuedElements){
            //console.log(queuedElements);
            // Il y a t il de la place
            for(var k in queuedElements) {
                if(queuedElements.hasOwnProperty(k)) {
                    var current = queuedElements[k];
                    current.send();
                }


            };
                // Oui pointe vers le premier element de la queue

                    // Ajout des listeners
                        // progress
                        // load
                        // error
                        // abort
        };



        init();
    };
    var Uploader = window.LibreJs.Upload.Uploader.prototype.constructor;
})(window);
//]]>