'use strict';
$(document).ready(function() {
    setTimeout(function() {
        // [ Smart Wizard ] start
        $('#smartwizard').smartWizard({
            theme: 'default',
            transitionEffect: 'fade',
            autoAdjustHeight: false,
            useURLhash: false,
            showStepURLhash: false
        });
    }, 700);
    $("#theme_selector").on("change", function() {
        $('#smartwizard').smartWizard("theme", $(this).val());
        return true;
    });
    $('#smartwizard .sw-toolbar').appendTo($('#smartwizard .sw-container'));
    $("#theme_selector").change();

    // [ smart Vartical-left wizard ] start
    setTimeout(function() {
        $('#smartwizard-left').smartWizard({
            theme: 'default',
            transitionEffect: 'fade',
            showStepURLhash: true,
            autoAdjustHeight: false,
            useURLhash: false,
            showStepURLhash: false
        });
        $('#smartwizard-left .sw-toolbar').appendTo($('#smartwizard-left .sw-container'));
    }, 700);

    //  [ smart Vartical-right wizard ] start
    setTimeout(function() {
        $('#smartwizard-right').smartWizard({
            theme: 'default',
            transitionEffect: 'fade',
            showStepURLhash: true,
            autoAdjustHeight: false,
            useURLhash: false,
            showStepURLhash: false
        });
        $('#smartwizard-right .sw-toolbar').appendTo($('#smartwizard-right .sw-container'));
    }, 700);
});
