const button = document.getElementById("grancum");

button.addEventListener("click", function() {
    const freightID = document.getElementById("shtrix");
    const brandName = document.getElementById("firma");
    const freight = document.getElementById("apranq");
    const freightPrice = document.getElementById("gin");

    let freightIDValue = freightID.value;
    let brandNameValue = brandName.value;
    let freightValue = freight.value;
    let freightPriceValue = freightPrice.value

    let data = {
        id: freightIDValue,
        brand: brandNameValue,
        name: freightValue,
        price: freightPriceValue
    }

    if(freightIDValue && brandNameValue && freightIDValue && freightPriceValue !== ""){
        fetch("/data", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(response.ok){
                console.log("Данные успешно добавлены")
            } else {
                console.error("Произошла ошибка при добавлении данных:", response.status);
            }
        })
        .catch(error => {
            console.error("Произошла ошибка при отправке данных:", error);
        })

        const messageContainer = document.getElementById("message");

        messageContainer.textContent = "Успешно сохранено!";
        const messageColor = messageContainer.style.color;
        messageContainer.style.color = "green"

        setTimeout(() => {
            messageContainer.textContent = "";
            messageContainer.style.color = messageColor;
        }, 2000)

    } else {
        console.log("Заполните все поля");

        const messageContainer = document.getElementById("message");
        messageContainer.textContent = "Заполните все поля";
        const messageColor = messageContainer.style.color;
        messageContainer.style.color = "red"

        setTimeout(() => {
            messageContainer.textContent = "";
            messageContainer.style.color = messageColor
        }, 3000)
    }

    freightID.value = "";
    brandName.value = "";
    freight.value = "";
    freightPrice.value = "";
})