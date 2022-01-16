'use strict';
$(document).ready(function() {
    $(".date").inputmask({
        mask: "99/99/9999"
    });

    $(".date2").inputmask({
        mask: "99-99-9999"
    });

    $(".hour").inputmask({
        mask: "99:99:99"
    });

    $(".dateHour").inputmask({
        mask: "99/99/9999 99:99:99"
    });

    $(".mob_no").inputmask({
        mask: "9999-999-999"
    });

    $(".phone").inputmask({
        mask: "9999-9999"
    });

    $(".telphone_with_code").inputmask({
        mask: "(99) 9999-9999"
    });

    $(".us_telephone").inputmask({
        mask: "(999) 999-9999"
    });

    $(".ip").inputmask({
        mask: "999.999.999.999"
    });

    $(".ipv4").inputmask({
        mask: "999.999.999.9999"
    });

    $(".ipv6").inputmask({
        mask: "9999:9999:9999:9:999:9999:9999:9999"
    });

    $('.autonumber').autoNumeric('init');

});
