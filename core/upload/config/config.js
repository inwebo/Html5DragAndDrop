//<![CDATA[
;(function(window){
    window.LibreJs.Upload.Config = {
        /**
         * Events
         */
        events : {
            dz : {
                drop     : 'dz-drop',
                update   : 'dz-update',
                valid    : 'dz-items-valid',
                invalid  : 'dz-items-invalid',
                /**
                 *'dz-queued'
                 * Fichier valides ajoutés dans la queue
                 * e.detail =
                 */
                queued   : 'dz-items-queued',
                /**
                 * 'dz-filtered'
                 * Fichier invalides ajoutés dans la queue
                 */
                filtered : 'dz-items-filtered'
            },
            queuedItem : {
                init     : 'dz-item-init',
                idle     : 'dz-item-idle',
                error    : 'dz-item-error',
                done     : 'dz-item-done',
                uploading: 'dz-item-uploading',
                filtered : 'dz-item-filtered'
            },
            display : {
                queued   : 'dz-display-queued-update',
                filtered : 'dz-display-filtered-update'
            },
            uploadQueueManager : {
                added : 'dz-up-item-added',
                done  : 'dz-up-item-done'
            }
        },
        /**
         * Data attributes
         */
        dataAttribute : {
            /**
             * Drop zone
             */
            dz : 'data-dz',
            /**
             * Display list <ul>,<ol> HTMLElement
             */
            list         : 'data-dz-list',
            listItem     : 'data-dz-list-item',
            listItemInfos: 'data-dz-list-item-infos',
            /**
             * Item
             */
            item : {
                name        : 'data-dz-item-name',
                lastModified: 'data-dz-item-lastModified',
                type        : 'data-dz-item-type',
                size        : 'data-dz-item-size',
                status      : 'data-dz-item-status',
                progress    : 'data-dz-item-progress'
            }

        },
        /**
         * Status
         */
        status : {
            init     : 'init',
            idle     : 'idle',
            start    : 'start',
            stop     : 'stop',
            error    : 'error',
            done     : 'done',
            uploading: 'uploading',
            filtered : 'filtered'
        }
    };

})(window);
//]]>