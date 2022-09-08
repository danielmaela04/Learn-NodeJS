const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const PORT = process.env.PORT || 8888;

const app = express();
app.use(express.json());
let users = [];

//=========== Read File ===========
fs.readFile("database.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err)
    } else {
        users = JSON.parse(data);
    }
})

//============POST Users ==============
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const user = {
        name,
        email,
        id: randomUUID(),
    };

    users.push(user);

    userFile()

    return res.json(user);
});

app.get("/users", (req, res) => {
    return res.json(users);
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    return res.json(user)
});


//============PUT Users ==============
app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const { name, email } = req.body;

    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = {
        ...users[userIndex],
        name,
        email,
    };
    userFile()
    return res.json({message: "User change success full"});
});

//=========== Delete Users ============
app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1)
    userFile()

    return res.json({message: "User deleted successful"});
})

//=========== Database Update ==========
function userFile() {
    fs.writeFileSync("database.json", JSON.stringify(users), (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Usuario inserido");
        }
    })
}

app.listen(PORT, () => console.log(`O servidor esta rodando na port http://localhost:${PORT}`));
