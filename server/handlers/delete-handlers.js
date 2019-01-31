const asyncMiddleware = require('../../helpers/async-middleware');
const imageService = require('../../services/image-service');

module.exports = {
  deleteOne: asyncMiddleware(async (req, res, next) => {
    const name = req.params.name;
    if (!name) {
      res.status(400).send();
      next();
    }

    const result = await imageService.deleteImage(name);
    const status = result ? 200 : 500;

    res.status(status).send();
    next();
  }),
  deleteAll: asyncMiddleware(async (req, res, next) => {
    const result = await imageService.deleteAllImages();
    const status = result ? 200 : 500;

    res.status(status).send();
    next();
  }),
};
