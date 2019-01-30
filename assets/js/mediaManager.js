let axios = require('axios')

document.addEventListener('DOMContentLoaded', (e) => {
    let fileList = document.querySelector('.MediaManager__FileList')

    axios.get('http://localhost:3000/admin/file')
        .then((res) => {   
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                console.log(element)
                fileList.insertAdjacentHTML('afterbegin', `
                <div class="MediaManager__File">
                    <div class="MediaManager__FileImage"> 
                        <img src="/uploads/${element}" />
                    </div>
                    <div class="MediaManager__FileName"> 
                        <p> ${element} </p>
                    </div>
                    <div class="MediaManager__Delete">
                        <p><button class="btnDelete" fileid=${element} type="submit"> Delete </button></form></p>
                    </div>
                </div>
            `)
            }

            // let deletes = document.querySelectorAll('.btnDelete')
            // for (let i = 0; i < deletes.length; i++) {
            //     const el = deletes[i];
            //     el.addEventListener('click', (e) => {
            //         e.preventDefault()
            //         console.log('pollo')
            //         axios.delete(`http://localhost:3000/admin/file`, {
            //             data: {
            //                 deleteName: e.target.getAttribute('fileid')
            //             }
            //         })
            //         .then((res) => {
            //             console.log(res.data)
            //         })
            //     })
            // } 
            
        })

    
})