/* Authored by Shahar Zimmerman for Interplay Learning, Inc */

$(document).ready(function() {

    /* Smooth scroll to anchors */
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    /* Owl carousel */
    $('#carousel').owlCarousel({
        autoPlay: 5000,

        items : 3, //10 items above 1000px browser width
        itemsDesktop : [1000,5], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,1], //1 items between 600 and 0
        itemsMobile: false, // inherit from tablet

        touchDrag: true
    });

    /* Reach out AJAX */
    $('#reachout-submit').on('click', function(e) {
        e.preventDefault();

        debugger;

        var data = {};
        $('#reachout-form').find('input').serializeArray().forEach(function(inputObj) {
            data[inputObj.name] = inputObj.value;
        });

        $.ajax({

        })
    })

});