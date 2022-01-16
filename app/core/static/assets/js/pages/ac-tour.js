'use strict';
$(document).ready(function() {
    setTimeout(function() {
        var enjoyhint_instance = new EnjoyHint({});
        var enjoyhint_script_steps = [{
            'next .step1': 'Click hear Customize Basic Card Layout',
        }, {
            'click .step2': 'click hear open Card Option',
            'radius': 30,
            'shape': 'circle',
        }, {
            'click .step3': 'click Chat open chat Conversation',
            'radius': 30,
            'shape': 'circle',
        }, {
            'click .step4': 'click hear open Conversation'
        }, {
            'next .step5': 'Type hear to start Conversation'
        }, ];
        enjoyhint_instance.set(enjoyhint_script_steps);
        enjoyhint_instance.run();
    }, 500);
});
