(function() {
    'use strict';

    var $panel = $bundle.filter('.brb');
    var $take = $panel.find('button[command="take"]');
    var $preview = $panel.find('.js-preview');
    var $program = $panel.find('.js-program');

    var upNext = nodecg.Replicant('upNext')
        .on('change', function(oldVal, newVal) {
            $program.find('.js-upNext').val(newVal);
        });

    $take.click(function () {
        upNext.value = $preview.find('.js-upNext').val();
    });
})();
