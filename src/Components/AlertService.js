import Swal from 'sweetalert2'

export function alertServiceInfoTimer(title, showConfirmButton, timer) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title,
    showConfirmButton,
    timer,
    background: 'black',
    color: 'White',
  })
}

export function alertServiceConfirm(title, confirmButtonText, action) {
  Swal.fire({
    title,
    backdrop: true,
    color: 'White',
    background: 'black',
    showCancelButton: true,
    confirmButtonText: confirmButtonText || 'Confirmar',
    confirmButtonColor: '#D82148',
    cancelButtonColor: '#35858B',
    width: '600',
    padding: '30',
    confirmButtonClass: 'btn-danger',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(confirmButtonText || 'Hecho', '', 'success')
      action()
    } else if (result.isDenied) {
      Swal.fire('No se han hecho los cambios', '', 'info')
    }
  })
}

export function alertServiceError(title, text) {
  Swal.fire({
    icon: 'error',
    title,
    text,
    color: 'White',
    background: 'Black',
    // errorButtonColor: '#072227',
  })
}

export function alertDonationsMP(image) {
  Swal.fire({
    title: 'Ingrese su donación',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
    },
    color: 'White',
    background: 'Black',
    showCancelButton: true,

    confirmButtonText: 'Aceptar',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return 1
    },
    backdrop: false,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: ` Gracias por su donación `,
        imageUrl: image,
        confirmButtonText: 'Ok',
        preConfirm: () => {
          return window.location.replace('/gracias')
        },
      })
    }
  })
}
