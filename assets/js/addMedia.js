document.addEventListener('DOMContentLoaded', () => {
    Dropzone.options.myAwesomeDropzone = {
        acceptedFiles: 'image/*',
        maxFileSize: 1
    }
    var myDropzone = new Dropzone("div#addMedia", { url: "http://localhost:3000/admin/file" });
    myDropzone.on('processing', (file) => {
        // ACÁ MOSTRAR UN MODAL QUE SE ESTÄ PROCESANDO
    })
    myDropzone.on('success', (file, response) => {
        // ACÁ MOSTRAR UN MODAL QUE SE PROCESO CORRECTAMENTE
        console.log(response)
    })
    myDropzone.on('error', (file, respone) => {
        // MOSTRAR MODAL ERROR
    })
})