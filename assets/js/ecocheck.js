// ======================================================
// EcoScan - EcoCheck
// Versión 2.0
// ======================================================


// ======================================================
// CONFIGURACIÓN GENERAL
// ======================================================

const PESOS = [25, 20, 15, 15, 15, 10];

const NIVELES = [

    {
        minimo: 85,
        color: "#2ecc71",
        insignia: "🌿 Eco Champion",
        mensaje: "Excelente elección. Este producto tiene un impacto ambiental muy bajo."
    },

    {
        minimo: 60,
        color: "#9acd32",
        insignia: "♻ Buena elección",
        mensaje: "Buen producto. Presenta varias características sostenibles."
    },

    {
        minimo: 40,
        color: "#f1c40f",
        insignia: "🌎 Puede mejorar",
        mensaje: "Producto aceptable, aunque existen alternativas más ecológicas."
    },

    {
        minimo: 20,
        color: "#e67e22",
        insignia: "⚠ Poco sostenible",
        mensaje: "El impacto ambiental es considerable."
    },

    {
        minimo: 0,
        color: "#e74c3c",
        insignia: "🚫 Muy contaminante",
        mensaje: "Este producto genera un impacto ambiental muy elevado."
    }

];


// ======================================================
// TODAS LAS CATEGORÍAS
// ======================================================

const CATEGORIAS = {

    botellas:{

        nombre:"🍼 Botellas",

        preguntas:[

            "¿La botella es reutilizable?",

            "¿Está hecha de plástico reciclado?",

            "¿Puede reciclarse fácilmente?",

            "¿Tiene una vida útil mayor a un año?",

            "¿Su fabricación requiere poco plástico?",

            "¿Es de producción local?"

        ]

    },

    bolsas:{

        nombre:"🛍 Bolsas",

        preguntas:[

            "¿La bolsa es reutilizable?",

            "¿Está hecha de material reciclado?",

            "¿Es reciclable?",

            "¿Puede utilizarse muchas veces?",

            "¿Tiene poco plástico?",

            "¿Fue fabricada localmente?"

        ]

    },

    ropa:{

        nombre:"👕 Ropa",

        preguntas:[

            "¿Está fabricada con materiales reciclados?",

            "¿Puede utilizarse durante varios años?",

            "¿Su fabricación consume poca agua?",

            "¿Se produce de forma responsable?",

            "¿Puede reciclarse al finalizar su vida útil?",

            "¿Fue fabricada localmente?"

        ]

    },

    electronicos:{

        nombre:"💻 Electrónicos",

        preguntas:[

            "¿Tiene una larga vida útil?",

            "¿Puede repararse fácilmente?",

            "¿Consume poca electricidad?",

            "¿Está fabricado con materiales reciclables?",

            "¿Su fabricante cuenta con programas de reciclaje?",

            "¿Tiene modo de ahorro de energía?"

        ]

    },

    limpieza:{

        nombre:"🧴 Productos de limpieza",

        preguntas:[

            "¿Es biodegradable?",

            "¿Utiliza envases reciclables?",

            "¿No contiene químicos altamente contaminantes?",

            "¿Está concentrado para reducir residuos?",

            "¿Fue fabricado localmente?",

            "¿Cuenta con certificaciones ambientales?"

        ]

    },

    alimentos:{

        nombre:"🍎 Alimentos",

        preguntas:[

            "¿Es producido localmente?",

            "¿Tiene poco empaque plástico?",

            "¿Proviene de agricultura sostenible?",

            "¿Puede reciclarse su envase?",

            "¿Tiene certificaciones ambientales?",

            "¿Genera pocos residuos?"

        ]

    }

};

// ======================================================
// FUNCIONES GENERALES
// ======================================================


// Crea una pregunta con las opciones Sí y No
function crearPregunta(texto, numero, prefijo="p"){

    return `

        <p>${numero}. ${texto}</p>

        <label>
            <input type="radio" name="${prefijo}${numero}" value="si">
            Sí
        </label>

        <label style="margin-left:20px;">
            <input type="radio" name="${prefijo}${numero}" value="no">
            No
        </label>

        <br><br>

    `;

}



// Crea el formulario completo de una categoría
function crearFormulario(categoria, prefijo="p"){

    const datos = CATEGORIAS[categoria];

    let html = `

        <h3>${datos.nombre}</h3>

    `;

    for(let i=0;i<datos.preguntas.length;i++){

        html += crearPregunta(

            datos.preguntas[i],
            i+1,
            prefijo

        );

    }

    return html;

}



// Calcula el porcentaje EcoScore
function calcularEcoScore(prefijo="p"){

    let puntos = 0;

    for(let i=1;i<=6;i++){

        const respuesta = document.querySelector(
            'input[name="'+prefijo+i+'"]:checked'
        );

        if(respuesta && respuesta.value=="si"){

            puntos += PESOS[i-1];

        }

    }

    return puntos;

}



// Obtiene el nivel correspondiente
function obtenerNivel(puntos){

    for(let nivel of NIVELES){

        if(puntos>=nivel.minimo){

            return nivel;

        }

    }

}

// ======================================================
// MOSTRAR RESULTADO ECOCHECK
// ======================================================

function mostrarResultado(categoria, puntos){

    const nivel = obtenerNivel(puntos);

    document.getElementById("resultado").innerHTML = `

       <div id="tarjetaEcoScore" style="
            background:#202020;
            border:3px solid ${nivel.color};
            border-radius:18px;
            padding:30px;
            margin-top:30px;
            color:white;
        ">

            <h2 style="color:${nivel.color}; text-align:center;">
                EcoScore
            </h2>

            <p style="text-align:center; color:#cccccc;">
                Categoría analizada
            </p>

            <h3 style="text-align:center;">
                ${CATEGORIAS[categoria].nombre}
            </h3>

            <h1 style="
                text-align:center;
                font-size:60px;
                color:${nivel.color};
            ">
                ${puntos}%
            </h1>

            <div style="
                width:100%;
                height:22px;
                background:#444;
                border-radius:20px;
                overflow:hidden;
                margin:25px 0;
            ">

                <div style="
                    width:${puntos}%;
                    height:100%;
                    background:${nivel.color};
                    transition:1s;
                "></div>

            </div>

            <h3 style="text-align:center;">
                ${nivel.insignia}
            </h3>

            <p style="text-align:center;">
                ${nivel.mensaje}
            </p>

            <hr style="margin:25px 0; border-color:#555;">

            <h3 style="text-align:center;">
                Recomendación
            </h3>

            <p style="
                text-align:center;
                color:#dddddd;
            ">

                Siempre intenta elegir productos reutilizables,
                reciclables y fabricados con materiales sostenibles.

            </p>

            <p style="
                text-align:center;
                font-size:14px;
                color:#888;
                margin-top:30px;
            ">
                Análisis realizado con EcoScan
            </p>

            <p style="
                text-align:center;
                font-size:14px;
                color:#888;
            ">
                ${new Date().toLocaleDateString()}
            </p>
            <br>

<div style="text-align:center;">

<button
id="descargarPNG"
class="button primary">

🖼 Descargar PNG

</button>

</div>

        </div>

    `;

document.getElementById("descargarPNG").addEventListener("click", function(){

    const boton = this;

    boton.style.display = "none";

    const tarjeta = document.getElementById("tarjetaEcoScore");

    html2canvas(tarjeta,{
        backgroundColor:"#202020",
        scale:2
    }).then(function(canvas){

        boton.style.display = "inline-block";

        const enlace = document.createElement("a");

        enlace.download = "EcoScore_"+categoria+".png";

        enlace.href = canvas.toDataURL("image/png");

        enlace.click();

    });

});

}

function iniciarAnalisisIndividual(){

    const categoria = document.getElementById("categoria");
    const preguntas = document.getElementById("preguntas");

    categoria.addEventListener("change", function(){

        if(this.value==""){

            preguntas.innerHTML =
            "<p><em>Selecciona una categoría para comenzar.</em></p>";

            return;

        }

        preguntas.innerHTML =

            crearFormulario(this.value) +

            `

            <button
                id="analizar"
                class="button primary">

                Analizar

            </button>

            <div id="resultado"
            style="margin-top:40px;"></div>

            `;

        document.getElementById("analizar")
        .addEventListener("click", function(){

            this.disabled = true;

            this.innerHTML = "⏳ Analizando...";

            setTimeout(function(){

                const puntos =
                    calcularEcoScore();

                mostrarResultado(
                    categoria.value,
                    puntos
                );

                document
                .getElementById("analizar")
                .disabled=false;

                document
                .getElementById("analizar")
                .innerHTML="Analizar";

            },1000);

        });

    });

}

// ======================================================
// COMPARADOR DE PRODUCTOS
// ======================================================

function iniciarComparador(){

    const btnIndividual = document.getElementById("modoIndividual");
    const btnComparar = document.getElementById("modoComparar");

    const analisis = document.getElementById("analisisIndividual");
    const comparador = document.getElementById("contenedorComparacion");

    btnIndividual.addEventListener("click", function(){

        btnIndividual.classList.add("primary");
        btnComparar.classList.remove("primary");

        analisis.style.display = "block";
        comparador.innerHTML = "";

    });

    btnComparar.addEventListener("click", function(){

        btnComparar.classList.add("primary");
        btnIndividual.classList.remove("primary");

        analisis.style.display = "none";

        comparador.innerHTML = `

        <h2 style="text-align:center;">
            ⚖ Comparar productos
        </h2>

        <p style="text-align:center;">
            Selecciona dos productos para compararlos.
        </p>

        <div style="
            display:flex;
            gap:40px;
            flex-wrap:wrap;
            margin-top:40px;
        ">

            <div style="flex:1;min-width:320px;">

                <h3>Producto A</h3>

                <select id="categoriaA">

                    <option value="">Selecciona una categoría</option>

                    <option value="botellas">Botellas</option>
                    <option value="bolsas">Bolsas</option>
                    <option value="ropa">Ropa</option>
                    <option value="electronicos">Electrónicos</option>
                    <option value="limpieza">Productos de limpieza</option>
                    <option value="alimentos">Alimentos</option>

                </select>

                <br><br>

                <div id="preguntasA"></div>

            </div>

            <div style="flex:1;min-width:320px;">

                <h3>Producto B</h3>

                <select id="categoriaB">

                    <option value="">Selecciona una categoría</option>

                    <option value="botellas">Botellas</option>
                    <option value="bolsas">Bolsas</option>
                    <option value="ropa">Ropa</option>
                    <option value="electronicos">Electrónicos</option>
                    <option value="limpieza">Productos de limpieza</option>
                    <option value="alimentos">Alimentos</option>

                </select>

                <br><br>

                <div id="preguntasB"></div>

            </div>

        </div>

        <br>

        <div style="text-align:center;">

            <button
                id="comparar"
                class="button primary">

                Comparar productos

            </button>

        </div>

        <div
            id="resultadoComparacion"
            style="margin-top:40px;">
        </div>

        `;

        configurarComparador();

    });

}

function configurarComparador(){

    const categoriaA = document.getElementById("categoriaA");
    const categoriaB = document.getElementById("categoriaB");

    categoriaA.addEventListener("change", function(){

        if(this.value=="") return;

        document.getElementById("preguntasA").innerHTML =
            crearFormulario(this.value,"A");

    });

    categoriaB.addEventListener("change", function(){

        if(this.value=="") return;

        document.getElementById("preguntasB").innerHTML =
            crearFormulario(this.value,"B");

    });

    document.getElementById("comparar")
    .addEventListener("click", compararProductos);

}

// ======================================================
// COMPARAR PRODUCTOS
// ======================================================

function compararProductos(){

    const categoriaA = document.getElementById("categoriaA").value;
    const categoriaB = document.getElementById("categoriaB").value;

    if(categoriaA=="" || categoriaB==""){

        alert("Selecciona una categoría para ambos productos.");

        return;

    }

    const puntosA = calcularEcoScore("A");
    const puntosB = calcularEcoScore("B");

    const nivelA = obtenerNivel(puntosA);
    const nivelB = obtenerNivel(puntosB);

    let ganador = "";
    let diferencia = Math.abs(puntosA-puntosB);

    if(puntosA>puntosB){

        ganador = CATEGORIAS[categoriaA].nombre;

    }

    else if(puntosB>puntosA){

        ganador = CATEGORIAS[categoriaB].nombre;

    }

    else{

        ganador = "Empate";

    }

    document.getElementById("resultadoComparacion").innerHTML=`

    <div style="display:flex;gap:30px;flex-wrap:wrap;">

        <div style="
            flex:1;
            min-width:300px;
            background:#202020;
            border:3px solid ${nivelA.color};
            border-radius:18px;
            padding:25px;
            color:white;
        ">

            <h2 style="text-align:center;color:${nivelA.color};">
                Producto A
            </h2>

            <h3 style="text-align:center;">
                ${CATEGORIAS[categoriaA].nombre}
            </h3>

            <h1 style="text-align:center;font-size:60px;">
                ${puntosA}%
            </h1>

            <h3 style="text-align:center;">
                ${nivelA.insignia}
            </h3>

            <p style="text-align:center;">
                ${nivelA.mensaje}
            </p>

        </div>

        <div style="
            flex:1;
            min-width:300px;
            background:#202020;
            border:3px solid ${nivelB.color};
            border-radius:18px;
            padding:25px;
            color:white;
        ">

            <h2 style="text-align:center;color:${nivelB.color};">
                Producto B
            </h2>

            <h3 style="text-align:center;">
                ${CATEGORIAS[categoriaB].nombre}
            </h3>

            <h1 style="text-align:center;font-size:60px;">
                ${puntosB}%
            </h1>

            <h3 style="text-align:center;">
                ${nivelB.insignia}
            </h3>

            <p style="text-align:center;">
                ${nivelB.mensaje}
            </p>

        </div>

    </div>

    <div style="
        margin-top:35px;
        background:#181818;
        border:3px solid #2ecc71;
        border-radius:18px;
        padding:25px;
        color:white;
        text-align:center;
    ">

        <h2>🏆 Resultado de la comparación</h2>

        <h3>${ganador}</h3>

        <p>

            ${
                ganador=="Empate"

                ?

                "Ambos productos obtuvieron el mismo EcoScore."

                :

                "Obtiene un EcoScore "+diferencia+
                " puntos superior al otro producto."

            }

        </p>

    </div>

    `;

}



// ======================================================
// INICIAR ECOSCAN
// ======================================================

document.addEventListener("DOMContentLoaded",function(){

    iniciarAnalisisIndividual();

    iniciarComparador();

});

