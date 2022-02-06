AOS.init();

// RESPONSIVE-MENU
$('#toggler-button').click(function() {
    $('.sidenav').css('transform', 'translateX(0px)');
});

$('#close-sidenav').click(function() {
    $('.sidenav').css('transform', 'translateX(-100%)');
});