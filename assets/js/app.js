//**** DESCRIPCIÓN DE ENTREGA ****/
//** En esta primer entrega del proyecto final arme un carrito de compras para una tienda de video juegos, defini la estructura principal y interactue la mayor parte del codigo mediante el HTML. Coloque a modo de prueba 4 productos */
//** los cuales se cargan como objetos dentro de un array que actua como carrito y se guarda en el localstorage  */

//**** DECLARACION DE VARIABLES GLOBALES ****/
let total= 0; //Variable para el monto total del carrito.
let confirmacion0 = true; // Confirmacion de Borrado Item. Inicialización.
let cantidad= 0; // Variable para contabilizar la cantidad del mismo item en el carrito .
let codigo = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto(futuro: proxima entrega).
let codigoBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario. Inicialización.
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let printHtml = document.getElementById('printHtml');// Referencia variable al cuadro de productos ingresados en el DOM.
let productos; // Variable para insertar el codigo HTML en la tabla.
const btnDelet = document.querySelector("#btnDelet"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrado, y bootstrap.
const btnDeletAll = document.querySelector('#btnDeletAll'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrar todo, y bootstrap.
const btnCarro1 = document.querySelector('#btnCarro1'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro2 = document.querySelector('#btnCarro2'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro3 = document.querySelector('#btnCarro3'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro4 = document.querySelector('#btnCarro4'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const montoTotal = document.querySelector('#montoTotal'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const cantidadItem = document.querySelector('#casillaCantidad'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.


//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirEnHtml = (item) => {
    printHtml.innerHTML = ""; // Se limpia cuerpo de tabla.
    for(item of item) {
        productos = document.createElement('tr');
        productos.innerHTML = `<th scope="row">${item.titulo}</th>
                                <td>${item.codigo}</td>
                                <td>$${item.precio}</td>
                                <td><input id='casillaCantidad' class='text-center' type='number' value='${cantidad}'></input></td>`;
                                
        printHtml.appendChild(productos);
    }
}
//**** FUNCION DE FILTRADO TITULO ITEMS ****//
const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo); //Filtro de titulo para contabilizar cuantas veces el producto se ingreso al carrito.

//*** FUNCION DE BUSQUEDA POR CODIGO ITEM ****//
const busquedaPorCodigo = (codigo) => carritoProductos.find(producto => producto.codigo === codigo); // Se verifica la existencia del item dentro del array videoJuegos almacenado.

imprimirEnHtml(carritoProductos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

btnCarro1.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Battlefield 2042')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item1 = new Carrito('Battlefield 2042', 1, 2800, cantidad); // Nuevo objeto creado.
ingresoCarrito(item1); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro2.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Blue Protocol')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item2 = new Carrito('Blue Protocol', 2, 2000, cantidad); // Nuevo objeto creado.
ingresoCarrito(item2); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro3.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Halo Infinite')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item3 = new Carrito('Halo Infinite', 3, 2500, cantidad); // Nuevo objeto creado.
ingresoCarrito(item3); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro4.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Elden Ring')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item4 = new Carrito('Elden Ring', 4, 3000, cantidad); // Nuevo objeto creado.
ingresoCarrito(item4); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

const ingresoCarrito = (item) => { // Funcion de ingreso de item al carrito.
carritoProductos.push(item);
localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena en el localStorage el nuevo objeto-item creado.

location.reload(); // Se refresca el navegador para que se muestren los cambios.

}

//**** OBJECT CONSTRUCTOR ****//
class Carrito {
    constructor(titulo, codigo, precio, cantidad) { // Recibe los datos ingresados por prompts.
        this.titulo = titulo;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }  
}

btnDelet.addEventListener("click", () => { // Llamado borrado de items mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: BORRADO DE ITEMS SELECCIONADOS POR EL USUARIO ****/
    if(carritoProductos.length > 0) {
        do {
            codigoBorrar = parseInt(prompt("Ingrese el código del producto a borrar")); // Se solicita al usuario el numero de item a borrar.
            if (isNaN(codigoBorrar)) { // En caso de cancelacion del borrado, se sale del do... while.
                confirmacion0 = false;
            } else if (busquedaPorCodigo(codigoBorrar) !== undefined) { // Si se comprueba la existencia del item a borrar, se procede con el borrado. 
                confirmacion0 = confirm(`Desea quitar el código #${codigoBorrar} del listado?`); // Se confirma si en verdad se desea borrar el item.
                carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); // Se lee el array almacenado en el localStorage.
                let indexItemBorrar = carritoProductos.findIndex(producto => producto.codigo === codigoBorrar); // Se obtiene el numero de posicion en el array del item a borrar.
                carritoProductos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
                localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena el array con el item borrado.
                location.reload(); 

            } else {
                alert(`El item #${codigoBorrar} no existe en el listado`); // si el item a borrar no existe, se avisa de la inexistencia del item dentro del listado en el array.
            }
    
        } while (confirmacion0); // Espera confirmacion de cancelacion del borrado.
    }
}); // Cierre alcance ejecución boton de ejecucion en el HTML.

btnDeletAll.addEventListener("click", () => { // Llamado borrado de todos los items mediante click del boton en el HTML.
    //**** MODO MODIFICACIÓN: BORRADO DE TODOS LOS ITEMS ****/
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            location.reload();
        }
    
}); // Cierre alcance ejecución boton de borrado de todos los items en el HTML.

