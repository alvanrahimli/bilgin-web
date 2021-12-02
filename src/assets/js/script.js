AOS.init();

// MENU-BUTTONS
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Modal-BUTTONS
function openCity1(evt, cityName) {
    var i, tabcontent1, tablinks1;
    tabcontent1 = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent1.length; i++) {
        tabcontent1[i].style.display = "none";
    }
    tablinks1 = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks1.length; i++) {
        tablinks1[i].className = tablinks1[i].className.replace("active1", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active1";
}

// RESPONSIVE-MENU
$('#toggler-button').click(function () {
    $('.sidenav').css('transform', 'translateX(0px)');
});

$('#close-sidenav').click(function () {
    $('.sidenav').css('transform', 'translateX(-100%)');
});
// RESPONSIVE-MENU-END

// DATA AOS
AOS.init();

// PRELOADER
// var load = document.getElementById('preloader');
// setTimeout(function loadfun() {
//     load.style.display = "none";
// }, 1000);

// document.querySelector(".third").addEventListener('click', function(){
//     Swal.fire("Our First Alert", "With some body text and success icon!", "success");
//   });