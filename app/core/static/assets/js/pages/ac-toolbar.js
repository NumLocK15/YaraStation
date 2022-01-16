'use strict';
$(window).on('load', function() {
    // [ Light-toolbar ]
    $('#light-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'light'
    });

    // [ dark-toolbar ]
    $('#dark-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'dark'
    });

    // [ Primary-toolbar ]
    $('#primary-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'primary'
    });

    // [ Success-toolbar ]
    $('#success-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'success'
    });

    // [ Info-toolbar ]
    $('#info-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'info'
    });

    // [ warning-toolbar ]
    $('#warning-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'warning'
    });

    // [ danger-toolbar ]
    $('#danger-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'danger'
    });

    // [ Top-toolbar ]
    $('#top-toolbar').toolbar({
        content: '#toolbar-options',
        position: 'top',
        style: 'primary'
    });

    // [ Left-toolbar ]
    $('#left-toolbar').toolbar({
        content: '#toolbar-options',
        position: 'left',
        style: 'success'
    });

    // [ Bottom-toolbar ]
    $('#bottom-toolbar').toolbar({
        content: '#toolbar-options',
        position: 'bottom',
        style: 'info'
    });

    // [ Right-toolbar ]
    $('#right-toolbar').toolbar({
        content: '#toolbar-options',
        position: 'right',
        style: 'warning'
    });

    // [ Click-toolbar ]
    $('#click-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'danger',
        event: 'click'
    });

    // [ standard-toolbar ]
    $('#standard-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'primary',
        animation: 'standard',
    });

    // [ flip-toolbar ]
    $('#flip-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'success',
        animation: 'flip',
    });

    // [ grow-toolbar ]
    $('#grow-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'info',
        animation: 'grow',
    });

    // [ flyin-toolbar ]
    $('#flyin-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'warning',
        animation: 'flyin',
    });

    // [ bounce-toolbar ]
    $('#bounce-toolbar').toolbar({
        content: '#toolbar-options',
        style: 'danger',
        animation: 'bounce',
    });

});
