const button = document.getElementById("search-button");

button.addEventListener("click", function() {
    const search = document.getElementById("search");
    let searchValue = search.value;
    const result = document.getElementById("result")

    fetch("/data")
    .then((data) => data.json())
    .then((dataArray) => {
        result.innerHTML = ""

        dataArray.forEach(element => {
            if(element.id === searchValue){
                const brandName = createElementWithText("p", `Бренд товара: ${element.brand}`);
                const freight = createElementWithText("p", `Название товара: ${element.name}`);
                const price = createElementWithText("p", `Цена товара: ${element.price}`);
                const deletee = createDeleteButton(element.id);
                const changeButton = createChangeButton(element.id);
                
                result.appendChild(brandName);
                result.appendChild(freight);
                result.appendChild(price);
                result.appendChild(deletee)
                result.appendChild(changeButton)
            }
        });

        if(result.children.length === 0){
            result.textContent = "Товар не существует"
        }
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
});

function createElementWithText (tag, text) {
    const element = document.createElement(tag)
    element.innerHTML = text
    return element
}

function createDeleteButton (id) {
    const deletee = document.createElement("button");
    deletee.setAttribute("class", "but");
    deletee.innerHTML = "Удалить товар";

    deletee.addEventListener("click", function() {
        fetch(`/data/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                result.innerHTML = ""; // очищаем результат после успешного удаления
                hideChangeDataSection()
            } else {
                console.error('Произошла ошибка при удалении данных:', response.status);
            }
        })
        .catch(function (error) {
            console.error('Произошла ошибка при удалении данных:', error);
        });

    });

    return deletee
}

function createChangeButton(id) {
    const changeButton = document.createElement("button");
    changeButton.setAttribute("class", "but");
    changeButton.innerHTML = "Изменить";

    const changeDataTextArea = document.getElementById("change-data");

    changeButton.addEventListener("click", function() {
        changeDataTextArea.classList.toggle("active");
        changeDataTextArea.innerHTML = ""

        if(changeDataTextArea.classList.contains("active")){

            const newIDInput = createNewInput("text", "Новый id");
            const newBrandName = createNewInput("text", "Новый brand");
            const newFreigth = createNewInput("text", "Новый товар");
            const newPrice = createNewInput("text", "Новая цена");
            const changeData = createChangeDataButton(id);
            const changeDataMessage = document.createElement("div");
            changeDataMessage.setAttribute("id", "change-message")

            changeDataTextArea.appendChild(newIDInput);
            changeDataTextArea.appendChild(newBrandName);
            changeDataTextArea.appendChild(newFreigth);
            changeDataTextArea.appendChild(newPrice);
            changeDataTextArea.appendChild(changeData);
            changeDataTextArea.appendChild(changeDataMessage);

        }
    });

    return changeButton
}

function createNewInput(type, placeholder) {
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("placeholder", placeholder);
    return input
}

function createChangeDataButton (id) {
    const changeData = document.createElement("button");
    changeData.setAttribute("class", "but");
    changeData.innerHTML = "Сохранить данные"

    changeData.addEventListener("click", function() {
        const newInputId = document.getElementById("change-data").querySelector("input[type='text'][placeholder='Новый id']");
        const newBrandName = document.getElementById("change-data").querySelector("input[type='text'][placeholder='Новый brand']");
        const newFreight = document.getElementById("change-data").querySelector("input[type='text'][placeholder='Новый товар']");
        const newPrice = document.getElementById("change-data").querySelector("input[type='text'][placeholder='Новая цена']");

        if(newInputId.value === ""){
            newInputId.value = id
        }

        const newData = {
            id: newInputId.value,
            brand: newBrandName.value,
            name: newFreight.value,
            price: newPrice.value
        }

        if(newBrandName.value && newFreight.value && newPrice.value !== ""){
            fetch(`/data/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newData)
            })
            .then(response => {
                if (response.ok) {
                    console.log("Данные успешно изменены");
    
                    newInputId.value = "";
                    newBrandName.value = "";
                    newFreight.value = "";
                    newPrice.value = "";
                    
                    const changeDataMessage = document.getElementById("change-message");
                    changeDataMessage.textContent = "Данные успешно изменены"
                    changeDataMessage.style.color = "green"
    
                    setTimeout(() => {
                        changeDataMessage.textContent = ""
                    }, 2000)
    
                } else {
                    console.error("Ошибка при изменении данных:", response.status);
                }
            })
            .catch(error => {
                console.error("Ошибка при изменении данных:", error);
            });
        }
    })
    
    return changeData
}

function hideChangeDataSection() {
    const changeDataTextArea = document.getElementById("change-data");
    changeDataTextArea.classList.remove("active");
    changeDataTextArea.innerHTML = ""; // Очищаем содержимое
}