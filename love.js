/* =====================================
   VARIABLES
===================================== */

let globosReventados = 0;

let corazonesEncontrados = 0;


/* =====================================
   CAMBIAR PANTALLA
===================================== */

function mostrar(id) {

    const pantallas =
        document.querySelectorAll(".pantalla");

    pantallas.forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    const nuevaPantalla =
        document.getElementById(id);

    if (!nuevaPantalla) {
        return;
    }

    nuevaPantalla.classList.add("activa");

    /* 🎵 DETENER LA MÚSICA AL LLEGAR A
       "NUESTRA CANCIÓN" */

    if (id === "cancion") {

        const musica =
            document.getElementById("musica");

        if (musica) {
            musica.pause();
            musica.currentTime = 0;
        }
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =====================================
   💗 COMENZAR
===================================== */

function comenzar() {

    /*
       El celular permite iniciar el audio
       porque esta función se ejecuta después
       de que la persona toca el botón.
    */

    const musica =
        document.getElementById(
            "musica"
        );


    if (musica) {

        musica.volume = 0.7;


        musica.play().catch(
            error => {

                console.log(
                    "No se pudo iniciar la música:",
                    error
                );

            }
        );

    }


    mostrar("perdon");


    crearCorazones();

}


/* =====================================
   🎈 MENSAJES DE LOS GLOBOS
===================================== */

const mensajes = [

    "Porque incluso en los días difíciles, sigues siendo alguien muy importante para mí. 💗",

    "Porque tu existencia hizo que muchos de mis momentos fueran más bonitos. 🌷",

    "Porque me encanta compartir contigo mis risas, mis pensamientos y mis pequeños momentos. 🥹",

    "Porque tienes un lugar en mi corazón que nadie podría ocupar de la misma manera. 💕",

    "Porque si pudiera guardar algunos momentos para siempre, muchos de ellos serían contigo. ✨",

    "Y porque, entre tantas personas en este mundo, tuve la suerte de encontrarte a ti. ❤️"

];


/* =====================================
   🎈 REVENTAR GLOBO
===================================== */

function reventar(globo) {

    if (
        globo.classList.contains(
            "reventado"
        )
    ) {

        return;
    }


    globo.classList.add(
        "reventado"
    );


    globo.style.pointerEvents =
        "none";


    document.getElementById(
        "mensaje-globo"
    ).innerHTML =
        mensajes[
            globosReventados
        ];


    globosReventados++;


    crearMiniExplosion(
        globo
    );


    if (
        globosReventados >= 6
    ) {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "continuar-globos"
                    )
                    .classList.remove(
                        "oculto"
                    );

            },
            500
        );

    }

}


/* =====================================
   ✨ EXPLOSIÓN DEL GLOBO
===================================== */

function crearMiniExplosion(
    elemento
) {

    const rect =
        elemento.getBoundingClientRect();


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );


        particula.innerHTML =
            "✨";


        particula.style.position =
            "fixed";


        particula.style.left =
            rect.left + "px";


        particula.style.top =
            rect.top + "px";


        particula.style.fontSize =
            "18px";


        particula.style.pointerEvents =
            "none";


        particula.style.zIndex =
            "999";


        document.body.appendChild(
            particula
        );


        const angulo =
            (
                Math.PI * 2 / 8
            ) * i;


        const distancia = 70;


        const x =
            Math.cos(angulo) *
            distancia;


        const y =
            Math.sin(angulo) *
            distancia;


        particula.animate(

            [

                {

                    transform:
                        "translate(0,0)",

                    opacity: 1

                },

                {

                    transform:
                        `translate(${x}px, ${y}px)`,

                    opacity: 0

                }

            ],

            {

                duration: 600,

                easing: "ease-out"

            }

        );


        setTimeout(
            () => {

                particula.remove();

            },
            600
        );

    }

}


/* =====================================
   💗 ENCONTRAR CORAZONES
===================================== */

function encontrar(
    corazon
) {

    if (
        corazon.classList.contains(
            "encontrado"
        )
    ) {

        return;
    }


    corazon.classList.add(
        "encontrado"
    );


    corazon.style.pointerEvents =
        "none";


    corazonesEncontrados++;


    document.getElementById(
        "contador"
    ).innerText =
        `Corazones encontrados: ${corazonesEncontrados}/5`;


    crearMiniCorazones(
        corazon
    );


    if (
        corazonesEncontrados === 5
    ) {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "sorpresa"
                    )
                    .classList.remove(
                        "oculto"
                    );


                document.getElementById(
                    "contador"
                ).innerText =
                    "✨ Encontraste todos los corazones ✨";

            },
            600
        );

    }

}


/* =====================================
   💕 MINI CORAZONES
===================================== */

function crearMiniCorazones(
    elemento
) {

    const rect =
        elemento.getBoundingClientRect();


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const corazon =
            document.createElement(
                "span"
            );


        corazon.innerHTML =
            "💗";


        corazon.style.position =
            "fixed";


        corazon.style.left =
            rect.left + "px";


        corazon.style.top =
            rect.top + "px";


        corazon.style.pointerEvents =
            "none";


        corazon.style.zIndex =
            "999";


        document.body.appendChild(
            corazon
        );


        const x =
            (
                Math.random() - 0.5
            ) * 150;


        const y =
            (
                Math.random() - 0.5
            ) * 150;


        corazon.animate(

            [

                {

                    transform:
                        "scale(0)",

                    opacity: 1

                },

                {

                    transform:
                        `translate(${x}px,${y}px) scale(1)`,

                    opacity: 0

                }

            ],

            {

                duration: 700,

                easing: "ease-out"

            }

        );


        setTimeout(
            () => {

                corazon.remove();

            },
            700
        );

    }

}


/* =====================================
   🎬 COMPROBAR VIDEO
===================================== */

const video =
    document.getElementById(
        "videoCancion"
    );


if (video) {

    video.addEventListener(
        "error",
        () => {

            const mensaje =
                document.getElementById(
                    "errorVideo"
                );


            if (mensaje) {

                mensaje.innerHTML =
                    "💗 No pude abrir el video. Revisa que el archivo se llame exactamente <strong>nuestra-cancion.mp4</strong> y esté en la misma carpeta que love.html.";

            }

        }
    );


    video.addEventListener(
        "loadeddata",
        () => {

            const mensaje =
                document.getElementById(
                    "errorVideo"
                );


            if (mensaje) {

                mensaje.innerHTML = "";

            }

        }
    );

}


/* =====================================
   💕 LLUVIA DE CORAZONES
===================================== */

function crearCorazones() {

    const emojis = [

        "💗",
        "💕",
        "💖",
        "💞",
        "💓",
        "💘",
        "✨"

    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            () => {

                const corazon =
                    document.createElement(
                        "div"
                    );


                corazon.className =
                    "corazon-volando";


                corazon.innerHTML =
                    emojis[
                        Math.floor(
                            Math.random() *
                            emojis.length
                        )
                    ];


                corazon.style.left =
                    Math.random() *
                    100 +
                    "vw";


                corazon.style.animationDuration =
                    (
                        3 +
                        Math.random() * 3
                    ) +
                    "s";


                corazon.style.fontSize =
                    (
                        18 +
                        Math.random() * 20
                    ) +
                    "px";


                document.body.appendChild(
                    corazon
                );


                setTimeout(
                    () => {

                        corazon.remove();

                    },
                    6000
                );

            },
            i * 120
        );

    }

  }
