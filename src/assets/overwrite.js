$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});

$(document).click(function(e) {
    if (!$(e.target).is('.panel-body')) {
        $('.collapse').collapse('hide');
    }
});
