const fs = require("fs");
const path = require('path');
const Handlebars = require("handlebars");

function render(resume) {
	const css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	const tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	const partialsDir = path.join(__dirname, 'partials');
	const filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function (filename) {
	  const matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }
	  const name = matches[1];
	  const filepath = path.join(partialsDir, filename)
	  const template = fs.readFileSync(filepath, 'utf8');

	  Handlebars.registerPartial(name, template);
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}



const data = JSON.parse(fs.readFileSync('./resume.json', 'utf8'));
console.log("-> >>>>data", data)
const result = render(data);

//Loads the express module
const express = require('express');
//Creates our express server
const app = express();
const port = 3000;
//Serves static files (we need it to import a css file)
app.use(express.static('public'))
//Sets a basic route
app.get('/', (req, res) => res.send(result));

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = {
	render: render
};