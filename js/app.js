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

    /* Form validation */

    function validateEmail(emailStr) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        return re.test(emailStr);
    }

    function validationHandler(e) {
        var type = e.target.dataset.validation;
        var val = e.target.value;
        var isValid;
        switch (type) {
            case 'any':
                isValid = !!val;
                break;
            case 'email':
                isValid = validateEmail(val);
                break;
            default:
                isValid = false;
        }

        var css = isValid ? 'validated' : 'not-validated';
        $(this).addClass(css);

        e.target.dataset.valid = isValid ? true : false;

        var A = $('input[type="text"]');
        for (var i = 0; i < A.length; i++) {
            if (A[i].dataset.valid !== 'true') {
                $('#reachout-submit').prop('disabled', true);
                return;
            }
        }
        $('#reachout-submit').prop('disabled', false);
    }

    $('input[type="text"]').on('input', validationHandler);

    /* Reach out AJAX */
    $('#reachout-submit').on('click', function(e) {
        e.preventDefault();

        var $loader = $("<img class=\"big-spaced-row\" width=\"40px;\" src=\"img/loader-larger.gif\" />");
        var $button = $(this).replaceWith($loader);

        var data = {};
        $('#reachout-form').find('input').serializeArray().forEach(function(inputObj) {
            data[inputObj.name] = inputObj.value;
        });

        $.ajax({
            url: "/reachout_email.php",
            method: "POST",
            error: function(err) {
                alert(err.status + ":" + err.statusText);
                $loader.replaceWith($button);
            },
            success: function(data) {
                $loader.replaceWith("<h2 class=\"white-color big-spaced-row\">We'll get back to you soon!</h2>");
            }
        })
    })

});