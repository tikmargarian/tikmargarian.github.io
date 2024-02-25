window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('main-form');
    const name = document.getElementById('name');
    const surName = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const phone = document.getElementById('phone');

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if(checkInputs()) {
            showSuccessPopup()
        }
    })

    name.addEventListener("input", () => {
        validation( name, name.value.trim() !== "", "Name cannot be blank");
    })

    surName.addEventListener("input", () => {
        validation( surName, surName.value.trim() !== "", "Surname cannot be blank");
    })

    email.addEventListener("input", () => {
        validation( email, isEmail(email.value.trim()), "Not a valid email");
    })

    password.addEventListener("input", () => {
        validation( password, password.value.trim().length >= 8, "Password must be at least 8 characters");
    })

    confirmPassword.addEventListener('input', () => {
        validation(confirmPassword, confirmPassword.value.trim() === password.value.trim() && confirmPassword.value.length >= 8, "Password must be confirmed");
    })

    phone.addEventListener("input", () => {
        validation( phone, isPhone(phone.value.trim()), "Not a valid phone number");
        if (phone.value.length > 15) {
            phone.value = phone.value.slice(0, 15);
        }
    })

    function checkInputs () {
        let isValid = true;
        validation( name, name.value.trim() !== "", "Name cannot be blank");
        validation( surName, surName.value.trim() !== "", "Surname cannot be blank");
        validation( email, isEmail(email.value.trim()), "Not a valid email");
        validation( password, password.value.trim().length >= 8, "Password must be at least 8 characters");
        validation(confirmPassword, confirmPassword.value.trim() === password.value.trim() && confirmPassword.value.length >= 8, "Password must be confirmed");
        validation( phone, isPhone(phone.value.trim()), "Password must be at least 8 characters");
        
        document.querySelectorAll(".form-content").forEach((content) => {
            if(content.classList.contains("error")){
                isValid = false;
            }
        })

        return isValid
    }

});

function validation (input, checked, messageText) {
    if(checked) {
        setSuccess(input)
    } else {
        setError(input, messageText)
    }
}

function isEmail (email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function isPhone (phone) {
    return /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(phone)
}

function setSuccess (input) {
    const formContent = input.parentElement;
    const icon = formContent.querySelector(".icon");
    formContent.className = "form-content success";
    icon.className = "icon fa fa-check-circle"
}

function setError (input, messageText) {
    const formContent = input.parentElement;
    const icon = formContent.querySelector(".icon");
    formContent.className = "form-content error";
    icon.className = "icon fa fa-times-circle"
    input.placeholder = messageText
}

function showSuccessPopup () {
    const successPopup = document.querySelector(".success-popup");
    successPopup.style.display = "block"
    
    const successCloseButton = document.querySelector(".success-close-button");
    successCloseButton.addEventListener("click", () => {
        successPopup.style.display = "none"
    })
}
