'use strict';
$(document).ready(function() {
    $('#date').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false
    });

    $('#time').bootstrapMaterialDatePicker({
        date: false,
        format: 'HH:mm'
    });

    $('#date-format').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm'
    });

    $('#date-fr').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        lang: 'fr',
        weekStart: 1,
        cancelText: 'ANNULER'
    });

    $('#min-date').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        minDate: new Date()
    });

    $('#date-end').bootstrapMaterialDatePicker({
        weekStart: 0,
        format: 'dddd DD MMMM YYYY - HH:mm'
    });
    $('#date-start').bootstrapMaterialDatePicker({
        weekStart: 0,
        format: 'dddd DD MMMM YYYY - HH:mm'
    }).on('change', function(e, date) {
        $('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
    });

    $('.demo').each(function() {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom',
            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
            change: function(value, opacity) {
                if (!value) return;
                if (opacity) value += ', ' + opacity;
                if (typeof console === 'object') {
                }
            },
            theme: 'bootstrap'
        });
    });
});
