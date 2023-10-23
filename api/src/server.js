const express = require("express");
const userController = require("./user/user.controller");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/", userController.getUsers);
app.get("/:id", userController.getUsers);
app.post("/", userController.create);
app.put("/:id", userController.update);
app.delete("/:id", userController.delete);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
