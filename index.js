import express from "express"
import fs from "fs"
import path from "path";

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    req.redirect("index.html")
})

app.post("/data", (req, res) => {
    const filePath = path.resolve("data.json");
    fs.promises.readFile(filePath, "utf-8")
        .then((data) => {
            const parsedData = data ? JSON.parse(data) : [];
            parsedData.push(req.body);

            return fs.promises.writeFile(filePath, JSON.stringify(parsedData, undefined, 2))
        })
        .then(() => {
            res.status(200).json({ message: "Данные добавлены" });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        });
})

app.get("/data", (req, res) => {
    const filePath = path.resolve("data.json");
    fs.promises.readFile(filePath, "utf8").then((data) => {
        res.send(data);
    })
})

app.delete("/data/:id", (req, res) => {
    const filePath = path.resolve("data.json")
    const idToDelete = req.params.id


    fs.promises.readFile(filePath, "utf8")
        .then((data) => {
            const parsedData = data ? JSON.parse(data) : [];
            const indexToDelete = parsedData.findIndex(item => item.id === idToDelete);
            
            if(indexToDelete !== -1) {
                parsedData.splice(indexToDelete, 1);

                return fs.promises.writeFile(filePath, JSON.stringify(parsedData, undefined, 2))
            } else {
                res.status(404).json({ error: "Данные не найдены" });
            }
        }).then(() => {
            res.status(200).json({ message: "Данные удалены" });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Внутренняя ошибка сервера" });
        });
})

app.put("/data/:id", (req, res) => {
    const filePath = path.resolve("data.json");
    fs.promises.readFile(filePath, "utf-8")
        .then((data) => {
            const parsedData = data ? JSON.parse(data) : [];
            const idToUpdate = req.params.id;

            const indexToUpdate = parsedData.findIndex(item => item.id === idToUpdate);

            if(indexToUpdate !== -1){
                parsedData[indexToUpdate] = req.body;

                return fs.promises.writeFile(filePath, JSON.stringify(parsedData, undefined, 2))
                    .then(() => { res.status(200).json({ message: "Данные обновлены" }); })
            } else {
                res.status(404).json({error: "Элемент не найден"})
            }
        })
        .catch(error => {
            console.error(error);

            // Отправляем клиенту ошибку 500 и сообщение об ошибке
            res.status(500).json({ error: "Внутренняя ошибка сервера", details: error.message });
        });
})


app.get("/admin", (req, res) => {
    res.sendFile(path.resolve("public/admin.html"));
});

app.listen(process.env.PORT);