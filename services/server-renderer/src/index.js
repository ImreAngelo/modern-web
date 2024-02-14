const express = require("express");
const render = require("./render");

const app = express();

app.get("/", render)

app.listen(3000, () => {
	console.log("Started server!");
});