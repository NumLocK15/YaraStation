'use strict';
$(document).ready(function() {
    // [ Zero-configuration ] start
    $('#zero-configuration').DataTable();

    // [ HTML5-Export ] start
    $('#key-act-button').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5'
        ]
    });

    // [ Columns-Reorder ] start
    $('#col-reorder').DataTable({
        colReorder: true,
        scrollX: true
    });

    // [ Fixed-Columns ] start
    $('#fixed-columns-left').DataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: true,
    });
    $('#fixed-columns-left-right').DataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: true,
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 1
        }
    });
    $('#fixed-header').DataTable({
        fixedHeader: true
    });

    // [ Scrolling-table ] start
    $('#scrolling-table').DataTable({
        scrollY: 300,
        paging: false,
        keys: true
    });

    // [ Responsive-table ] start
    $('#responsive-table').DataTable({
    });

    $('#responsive-table-model').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function(row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        }
    });

    $('#responsive-table-model2').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({

                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        }
    });
});
