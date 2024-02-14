const fs = require("fs/promises");
const ejs = require("ejs");
const ReactDOMServer = require("react-dom/server");
const app = require("../../../app/src/main.jsx");

let template = "";
fs.readFile('./index.html.ejs', 'utf-8')
	.then((f) => { template = f })

module.exports = (req, res) => {	
	const title = "Hey";
	const tmp = ReactDOMServer.renderToString(app);

	console.log(tmp);
	
	const html = ejs.render(template, {
		title: title,
	})

	fs.writeFile("dist/index.html", html)
		.then(() => {
			console.log("Made file.")

			res.send(html);
		})
}