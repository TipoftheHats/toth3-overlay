(function() {
    'use strict';

    var $panel = $bundle.filter('.twitter');
    var $take = $panel.find('button[command="take"]');
    var $show = $panel.find('button[command="show"]');
    var $hide = $panel.find('button[command="hide"]');
    var $pulse = $panel.find('button[command="pulse"]');
    var $preview = $panel.find('.js-preview');
    var $program = $panel.find('.js-program');

    var tweet = nodecg.Replicant('tweet')
        .on('change', function(oldVal, newVal) {
            $program.find('.js-id').val(newVal.id);
            $program.find('.js-content').val(newVal.text);
        });

    var tweetShowing = nodecg.Replicant('tweetShowing')
        .on('change', function(oldVal, newVal) {
            $show.prop('disabled', newVal);
            $pulse.prop('disabled', newVal);
            $hide.prop('disabled', !newVal);

            // When this changes, disable the "take" button for a bit
            if ($take.data('cooldownTimer')) {
                clearTimeout($take.data('cooldownTimer'));
            }

            $take.prop('disabled', true);
            $take.data('cooldownTimer', setTimeout(function() {
                $take.prop('disabled', false);
            }, 1000));
        });

    nodecg.Replicant('tweetPulsing')
        .on('change', function(oldVal, newVal) {
            $hide.prop('disabled', !tweetShowing.value ? true : newVal);
        });

    $take.click(function () {
        nodecg.sendMessage('getTweet', $preview.find('.js-url').val());
    });

    $show.click(function () {
        tweetShowing.value = true;
    });

    $hide.click(function () {
        tweetShowing.value = false;
    });

    $pulse.click(function () {
        nodecg.sendMessage('pulseTweet', $(this).data('duration'));
    });
})();
