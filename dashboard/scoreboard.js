'use strict';

var $panel = $bundle.filter('.scoreboard');
var $show = $panel.find('button[command="show"]');
var $hide = $panel.find('button[command="hide"]');

var scoreboardShowing = nodecg.Replicant('scoreboardShowing')
    .on('change', function(oldVal, newVal) {
        $show.prop('disabled', newVal);
        $hide.prop('disabled', !newVal);
    });

$show.click(function () {
    scoreboardShowing.value = true;
});

$hide.click(function () {
    scoreboardShowing.value = false;
});
