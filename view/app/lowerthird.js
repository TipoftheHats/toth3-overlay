/* global Snap */
(function() {
    'use strict';

    var s = Snap('#layout');
    Snap.load('img/toth_layout.svg', function (layout) {
        s.append(layout);
    });
})();
