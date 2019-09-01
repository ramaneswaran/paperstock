$(document).ready(function(){
    $(".hamburger-btn .fa-times").hide();

    $(".hamburger-btn .fa-bars").click(()=>{
        $(".hamburger-btn .fa-bars").hide();
        $(".hamburger-btn .fa-times").show();
        $(".mob ul").addClass("active");
    });

    $(".hamburger-btn .fa-times").click(()=>{
        $(".hamburger-btn .fa-times").hide();
        $(".hamburger-btn .fa-bars").show();
        $(".mob ul").removeClass("active");
    });

});