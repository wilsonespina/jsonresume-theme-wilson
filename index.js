const express = require('express');
const app = express();
const port = 3000;
const resumeJson = require('./resume.json');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const { engine } = require ('express-handlebars');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
		resume: resumeJson
	});
});

app.use(express.static(__dirname));

app.listen(port, () => console.log(`App listening to port ${port}`));


// function render() {
// 	const css = fs.readFileSync(__dirname + "./style.css", "utf-8");
// 	const tpl = fs.readFileSync(__dirname + "./layouts/main.hbs", "utf-8");
// 	const partialsDir = path.join(__dirname, 'views/partials');
// 	const filenames = fs.readdirSync(partialsDir);

// 	filenames.forEach(function (filename) {
// 	  const matches = /^([^.]+).hbs$/.exec(filename);
// 	  if (!matches) {
// 	    return;
// 	  }
// 	  const name = matches[1];
// 	  const filepath = path.join(partialsDir, filename)
// 	  const template = fs.readFileSync(filepath, 'utf8');

// 	  Handlebars.registerPartial(name, template);
// 	});
// 	return Handlebars.compile(tpl)({
// 		css: css,
// 		resume: resumeJson
// 	});
// }

// module.exports = render;