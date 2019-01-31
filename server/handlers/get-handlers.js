const asyncMiddleware = require('../../helpers/async-middleware');
const imageService = require('../../services/image-service');

module.exports = {
  getOne: asyncMiddleware(async (req, res, next) => {
      const name = req.params.name;
      if (!name) {
        res.status(400).send();
        next();
      }

    const image = await imageService.getImage(name);
    if (image.err) {
      res.status(500).send();
      next();
    }

    const data = Buffer.from(image.file, 'binary');
    res.type('jpeg').status(200).send(data);
    next();
  }),
};
