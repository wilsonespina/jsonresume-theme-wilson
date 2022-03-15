const express = require('express');
const app = express();
const port = 3000;
const resumeJson = require('./resume.json');

const { engine } = require ('express-handlebars');

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {
		resume: resumeJson
	});
});

app.use(express.static(__dirname));

app.listen(port, () => console.log(`App listening to port ${port}`));


function render() {
	const css = fs.readFileSync(__dirname + "./style.css", "utf-8");
	const tpl = fs.readFileSync(__dirname + "./resume.hbs", "utf-8");
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
		resume: resumeJson
	});
}

module.exports = render;