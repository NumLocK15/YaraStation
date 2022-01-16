'use strict';
$(window).on('load', function() {
    // [ html-demo ]
    $('#html').jstree();

    // [ Inline-demo ]
    $('#data').jstree({
        'core': {
            'data': [{
                "text": "Root node",
                "children": [{
                        "text": "Child node 1"
                    },
                    {
                        "text": "Child node 2"
                    }
                ]
            }]
        }
    });

    // [ format-demo ]
    $('#frmt').jstree({
        'core': {
            'data': [{
                "text": "Root node",
                "state": {
                    "opened": true
                },
                "children": [{
                        "text": "Child node 1",
                        "state": {
                            "selected": true
                        },
                        "icon": "jstree-file"
                    },
                    {
                        "text": "Child node 2",
                        "state": {
                            "disabled": true
                        }
                    }
                ]
            }]
        }
    });

    // [ Callback-demo ]
    $('#clbk').jstree({
        'core': {
            'data': function(node, cb) {
                if (node.id === "#") {
                    cb([{
                        "text": "Root",
                        "id": "1",
                        "children": true
                    }]);
                } else {
                    cb(["Child"]);
                }
            }
        }
    });

    // [ AJAX-demo ]
    $('#ajax').jstree({
        'core': {
            'data': {
                "url": "assets/plugins/jstree/json/root.json",
                "dataType": "json"
            }
        }
    });

    // [ Lazy-demo ]
    $('#lazy').jstree({
        'core': {
            'data': {
                "url": "assets/plugins/jstree/json/lazy.json",
                "data": function(node) {
                    return {
                        "id": node.id
                    };
                }
            }
        }
    });

    // [ Event-demo ]
    $('#evts_button').on("click", function() {
        var instance = $('#evts').jstree(true);
        instance.deselect_all();
        instance.select_node('1');
    });
    $('#evts')
        .on("changed.jstree", function(e, data) {
            if (data.selected.length) {
                alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
            }
        })
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "Root node",
                    "children": [{
                            "text": "Child node 1",
                            "id": 1
                        },
                        {
                            "text": "Child node 2"
                        }
                    ]
                }]
            }
        });

});
