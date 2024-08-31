jQuery(document).ready(function($) {
    function handleNavbar() {
        var windowWidth = $(window).width();  // Obtiene el ancho de la ventana

        // Calcula la posición 'left' en base al ancho de la ventana
        var leftPercentage = calculateLeftPercentage(windowWidth);

        if (windowWidth <= 768) {
            $('.navbar-toggler').css({
                'display': 'block', // Asegura que el botón sea visible
                'position': 'absolute', // Posicionamiento absoluto
                'left': leftPercentage, // Posición calculada dinámicamente como porcentaje
                'top': '10px' // Posición desde arriba
            });
            $('.navbar-nav').addClass('flex-column');
            $('.navbar-nav .nav-link').addClass('mb-3');
            $('.ds-logo').css('margin-bottom', '10px');
        } else {
            $('.navbar-toggler').css({
                'display': 'none', // Ocultar en pantallas grandes
                'position': 'static', // Remover posicionamiento absoluto
                'left': 'auto',
                'top': 'auto',
                'right': 'auto'
            });
            $('.navbar-nav').removeClass('flex-column');
            $('.navbar-nav .nav-link').removeClass('mb-3');
            $('.ds-logo').css('margin-bottom', '0');
        }
    }

    function calculateLeftPercentage(width) {
        // Establece un mínimo y máximo para los porcentajes
        var minWidth = 320, maxWidth = 768;
        var minPercentage = 60, maxPercentage = 90;

        if (width <= minWidth) {
            return minPercentage + '%';  // Retorna el mínimo porcentaje
        } else if (width >= maxWidth) {
            return maxPercentage + '%';  // Retorna el máximo porcentaje
        } else {
            // Interpola linealmente entre minPercentage y maxPercentage
            var slope = (maxPercentage - minPercentage) / (maxWidth - minWidth);
            var percentage = minPercentage + slope * (width - minWidth);
            return percentage.toFixed(2) + '%';
        }
    }

    // Ejecuta handleNavbar al cargar y al cambiar el tamaño de la ventana
    handleNavbar();
    $(window).resize(handleNavbar);

    // Manejador de clics para el botón de menú hamburguesa
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggle();  // Alternar la visibilidad de la barra de navegación
    });

    // Manejador de clics para los enlaces de navegación
    $('.nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');  // Ocultar la barra de navegación cuando se selecciona un enlace
    });

    // Ajustes adicionales para la altura del encabezado y el desplazamiento del scroll
    var windowWidth = $(window).width(); // Obtiene el ancho de la ventana
    var mastheadHeight = 0; // Inicializa la variable mastheadHeight

    if (windowWidth <= 768) {
        // Si la resolución es menor o igual a 768px (por ejemplo, en móviles), usa un valor fijo
        mastheadHeight = 50; // Ajusta este valor según lo necesario para la resolución móvil
    } else {
        // Para resoluciones mayores a 768px, utiliza la altura dinámica del encabezado
        mastheadHeight = $('.ds-header').outerHeight();
    }

    $(".ds-banner,.ds-main-section").css("margin-top", mastheadHeight);

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 10) {
            $('.ds-header').addClass('ds-fixed-header');
        } else {
            $('.ds-header').removeClass('ds-fixed-header');
        }
    }).scroll();

    // Ajustar el desplazamiento al hacer clic en los enlaces de navegación
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault(); // Detener el comportamiento predeterminado
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - mastheadHeight // Ajustar la posición de desplazamiento
            }, 600, 'swing');
        }
    });

    // Actualizar la barra de navegación según la sección visible
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        $('.page-section').each(function(i) {
            if ($(this).position().top <= scrollDistance + mastheadHeight) {
                $('.navbar-nav li.active').removeClass('active');
                $('.navbar-nav li').eq(i).addClass('active');
            }
        });
    }).scroll();
});
