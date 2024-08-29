jQuery(document).ready(function($) {

    // Función para manejar el comportamiento de la barra de navegación en diferentes tamaños de pantalla
    function handleNavbar() {
        var windowWidth = $(window).width();

        if (windowWidth <= 768) {
            $('.navbar').hide();  // Ocultar la barra de navegación en pantallas pequeñas
            $('.navbar-toggler').show();  // Mostrar el botón de menú hamburguesa
        } else {
            $('.navbar').show();  // Mostrar la barra de navegación en pantallas grandes
            $('.navbar-toggler').hide();  // Ocultar el botón de menú hamburguesa
        }
    }

    // Ejecutar la función handleNavbar al cargar la página y al cambiar el tamaño de la ventana
    handleNavbar();
    $(window).resize(handleNavbar);

    // Manejador de clics para el botón de menú hamburguesa
    $('.navbar-toggler').click(function() {
        $('.navbar').slideToggle();  // Alternar la visibilidad de la barra de navegación
    });

    // Ajustes adicionales para la altura del encabezado y el desplazamiento del scroll
    var windowWidth = $(window).width(); // Obtiene el ancho de la ventana
    var mastheadHeight = 0; // Inicializa la variable mastheadHeight

    if (windowWidth <= 768) {
        // Si la resolución es menor o igual a 768px (por ejemplo, en móviles), usa un valor fijo
        mastheadHeight = 0; // Ajusta este valor según lo necesario para la resolución móvil
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
