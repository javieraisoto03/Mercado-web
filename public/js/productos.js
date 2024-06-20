document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];

    // Manejar click en "Agregar al Carrito"
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', (event) => {
            const producto = event.target.getAttribute('data-producto');
            carrito.push(producto);
            document.getElementById('mensajeProductoAgregado').textContent = `${producto} ha sido agregado al carrito.`;
            $('#productoAgregadoModal').modal('show'); // Aquí se usa jQuery para mostrar el modal
            actualizarCarrito();
        });
    });

    // Función para actualizar la lista del carrito
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('listaCarrito');
        listaCarrito.innerHTML = '';
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto;
            li.className = 'list-group-item';
            listaCarrito.appendChild(li);
        });
    }

    // Manejar click en botones de cerrar modal
    document.querySelectorAll('.cerrar-modal').forEach(button => {
        button.addEventListener('click', () => {
            $('#productoAgregadoModal').modal('hide'); // Cerrar el modal usando jQuery
        });
    });
});
