var testDonation;
$(function () {
    'use strict';

    var $tothDonation = $('toth-donation');

    setTimeout(function () {
        $tothDonation.attr('tag', 'Total');
        $tothDonation.attr('body', '$106,522');
    }, 1000);

    testDonation = function () {
        $tothDonation.attr('tag', '$25');
        $tothDonation.attr('body', 'TwentyFiveCharactersWWWWW');

        setTimeout(function () {
            $tothDonation.attr('tag', 'Total');
            $tothDonation.attr('body', '$106,522');
        }, 3000);
    };
});
