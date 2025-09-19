//import Swal from 'sweetalert2'
function manejarEliminacion(){
    return Swal.fire({
        title: 'Está seguro de eliminar!',
        text: 'Seguro?',
        icon: 'question',
        confirmButtonText: 'Hola pibe',
        showCancelButton: true, //Activa la visualización del botón de cancelar
        cancelButtonText: 'No, no quiero'
        }).then((result) => {
            if(result.isConfirmed){
                console.log('Producto eliminado');
            }else if (result.idDenied) {
                console.log('No se eliminó el producto');
            }
    })
}

manejarEliminacion();