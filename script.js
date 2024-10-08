

var swiper = new Swiper (".mySwiper-1" , {
    slidesPerView: 1,
    spaceBetween: 30,
    loop:true,
    pagination :{
        el:".swiper-pagination",
        clickable: true,

    },
    navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",

    }

});
var swiper = new Swiper (".mySwiper-2" , {
    slidesPerView: 3,
    spaceBetween: 20,
    loop:true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
        clickable: true,
    },  
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        520:{   
            slidesPerView:2,
        },
        950:{
            slidesPerView:3,
        }
        
    }

});

let tabInputs= document.querySelectorAll(".tabInput");
tabInputs.forEach(function(input){
    input.addEventListener('change', function() {
        let id = input.ariaValueMax;
        let thisSwiper = document.getElementById('swiper' + id );
        thisSwiper.swiper.update();

    })
})



//Carrito

const carrito= document.getElementById('carrito');
const elemento1= document.getElementById('lista-1');
const elemento2= document.getElementById('lista-2') ;
const elemento3= document.getElementById('lista-3');
const elemento4= document.getElementById('lista-4');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elemento1.addEventListener('click',comprarElemento);
    elemento2.addEventListener('click',comprarElemento);
    elemento3.addEventListener('click',comprarElemento);
    elemento4.addEventListener('click',comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento= e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);

}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 >
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;

    lista. appendChild(row);

}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e-target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;

}
document.addEventListener('DOMContentLoaded', () => {
    const enviarPedidoBtn = document.getElementById('enviar-pedido');
    enviarPedidoBtn.addEventListener('click', enviarPedido);

    // Inicializa el número de pedido en localStorage si no existe
    if (localStorage.getItem('orderNumber') === null) {
        localStorage.setItem('orderNumber', '1');
    }
});

function enviarPedido() {
    const cartItems = document.querySelectorAll('#lista-carrito tbody tr');
    let orderDetails = '🔥🔥 **Bubaton Burger** 🔥🔥\n\n';

    // Obtén el número de pedido desde localStorage
    let currentOrderNumber = parseInt(localStorage.getItem('orderNumber'), 10);
    
    let total = 0; // Variable para almacenar el total del pedido

    // Añadir el número de pedido al inicio después del título
    orderDetails += `**Número de Pedido**: ${currentOrderNumber}\n\n`; 

    // Recorrer los productos seleccionados
    cartItems.forEach(item => {
        const name = item.querySelector('td:nth-child(2)').textContent;
        const priceText = item.querySelector('td:nth-child(3)').textContent;
        const price = parseFloat(priceText.replace('S/ ', '')); // Convierte el precio a número

        // Añadir el producto al detalle del pedido
        orderDetails += `  - ${name}:\n`;

        // Sumar el precio al total
        total += price;
    });

    // Añadir el total general del pedido

    // Añadir la dirección de entrega, método de pago y mensaje final
    const direccion = 'Av San Martin 1792, Ica 11000'; 
    const metodoPago = 'Efectivo'; // Reemplaza con el método de pago real
    orderDetails += `📍 **Dirección del local**: ${direccion}\n`;
    orderDetails += `💳 **Método de Pago**: ${metodoPago}\n\n`;
    orderDetails += '¡Gracias por tu compra!';

    const encodedMessage = encodeURIComponent(orderDetails);
    const phoneNumber = '960451026'; // Reemplaza con el número de teléfono
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Incrementar el número de pedido y actualizar localStorage
    localStorage.setItem('orderNumber', (currentOrderNumber + 1).toString());
}

