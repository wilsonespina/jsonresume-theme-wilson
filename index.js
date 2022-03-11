var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var resumeJson = require("./resume.json");


function render(resume) {
	console.log('>>>>>>>>>>>>HERE!!!')
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	var partialsDir = path.join(__dirname, 'partials');
	var filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function (filename) {
	  var matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }
	  var name = matches[1];
	  var filepath = path.join(partialsDir, filename)
	  var template = fs.readFileSync(filepath, 'utf8');

	  Handlebars.registerPartial(name, template);
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

// render(resumeJson)
var data = JSON.parse(fs.readFileSync('./resume.json', 'utf8'));
console.log("->========= ~ data", data)
var result = render(data);

console.log('RES',result);

fs.writeFileSync('./index.html', result);

module.exports = {
	render: render
};