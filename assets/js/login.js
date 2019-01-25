document.addEventListener('DOMContentLoaded', () => {
    let formLogin = document.getElementById('formLogin')
    
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault()
        let email = document.querySelector('#txtEmail')
        let password = document.querySelector('#txtPassword')
        if(email.value.length > 5) {
            if(password.value.length < 1) {
                toastr.error('Password Must not be Empty');
            } else {
                formLogin.submit()
            }
        }
        else {
            toastr.error('Email must be greater than 5 characters');
        }
    })
})