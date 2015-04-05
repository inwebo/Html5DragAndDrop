//<![CDATA[
;(function(window){
    /**
     *
     * @param {string} name
     * @param detail
     * @returns {CustomEvent}
     * @constructor
     */
    window.LibreJs.Upload.EventFactory = function( name, detail) {
        return new CustomEvent(name,{
            'detail':detail
        });
    };
})(window);
//]]>