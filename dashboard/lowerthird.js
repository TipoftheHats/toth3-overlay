'use strict';

var $panel = $bundle.filter('.lowerthird');
var $take = $panel.find('button[command="take"]');
var $show = $panel.find('button[command="show"]');
var $hide = $panel.find('button[command="hide"]');
var $pulse = $panel.find('button[command="pulse"]');
var $preview = $panel.find('.js-preview');
var $program = $panel.find('.js-program');

var texts = nodecg.Replicant('texts')
    .on('change', function(oldVal, newVal) {
        $program.find('.js-title').val(newVal.title);
        $program.find('.js-body').val(newVal.body);
    });

var isShowing = nodecg.Replicant('isShowing')
    .on('change', function(oldVal, newVal) {
        $show.prop('disabled', newVal);
        $pulse.prop('disabled', newVal);
        $hide.prop('disabled', !newVal);
    });

nodecg.Replicant('isPulsing')
    .on('change', function(oldVal, newVal) {
        $hide.prop('disabled', !isShowing.value ? true : newVal);
    });

$take.click(function () {
    texts.value = {
        title: $preview.find('.js-title').val(),
        body: $preview.find('.js-body').val()
    };
});

$show.click(function () {
    isShowing.value = true;
});

$hide.click(function () {
    isShowing.value = false;
});

$pulse.click(function () {
    nodecg.sendMessage('pulse', $(this).data('duration'));
});
