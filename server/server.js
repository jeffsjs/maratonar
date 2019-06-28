const PATH = __dirname;
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(PATH+'/db/series.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3004;

var dbSeasons = require(PATH+'/db/seasons.json');
var dbEpisodes = require(PATH+'/db/episodes.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get('/series/:idSerie/seasons', (req, res) => {
	if (req.method === 'GET') {
		const { idSerie } = req.params;
		if (idSerie != null && idSerie >= 0) {
			const result = dbSeasons.seasons.find(series => series.id == idSerie);

			if (result) {
				res.status(200).jsonp(result.data);
			} else {
				res.status(400).jsonp({
					error: 'Bad id'
				});
			}
		} else {
			res.status(400).jsonp({
				error: 'No valid id'
			});
		}
	}
});

server.get('/series/:idSerie/seasons/:idSeason/episodes', (req, res) => {
	if (req.method === 'GET') {
		let { idSerie, idSeason } = req.params;
		if (idSerie != null && idSerie >= 0 && idSeason != null && idSeason >= 0) {
			const serie = dbEpisodes.episodes.find(serie => serie.id == idSerie);
			const result = serie.data.find(season => season.seasonId == idSeason);
			
			if (result) {
				res.status(200).jsonp(result.allepi);
			} else {
				res.status(400).jsonp({
					error: 'Bad id'
				});
			}
		} else {
			res.status(400).jsonp({
				error: 'No valid id'
			});
		}
	}
});

server.use(router);
server.listen(port);
