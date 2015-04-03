//<![CDATA[
;(function(window){
    /**
     * @param {String} name
     * @constructor
     */
    window.LibreJs.Patterns.Observer = function(name){
        var plugin   = this;
        plugin.name  = null;

        /**
         * @param {String} name
         */
        var init = function(name) {
            plugin.name = name;
        };

        /**
         *
         * @param {Event} event
         * @param {Array} parameters
         */
        plugin.update = function(event, parameters) {
            // Selong l'event une action
            // Mise à jour de la file d'attente des fichiers
            // Mise à jour de l'affichage des fichiers
            // Ajout dans la liste à uploader
            // Changement Upload
        };


        init(name);
    };

})(window);
//]]>