const helper = require('../helpers/file-helper');
let instance;

class ImageService {
  constructor(helper) {
    this._helper = helper;
  }

  async deleteImage(imageName) {
    const exists = await this._helper.fileExists(imageName);
    if (!exists) return {err: new Error('File not found')};

    return await this._helper.deleteFile(imageName);
  }

  async deleteAllImages() {
    const imageList = await this._helper.listFiles();
    if (!imageList) return {err: new Error('Files not found')};

    let result = [];
    for (let i = 0; i < imageList.length; ++i){
      const name = imageList[i];
      const deleteResult = await this._helper.deleteFile(name);
      result.push({name, deleteResult});
    }

    return result;
  }

  async getImage(imageName) {
    const exists = await this._helper.fileExists(imageName);
    if (!exists) return {err: new Error('File not found')};

    const file = await this._helper.readFile(imageName);
    return {err: null, file}
  }

  async getAllImages() {
    const imageList = await this._helper.listFiles();
    if (!imageList) return {err: new Error('Files not found')};

    let result = [];
    for (let i = 0; i < imageList.length; ++i) {
      const image = await this.getImage(imageList[i]);
      result.push(image);
    }
    return result;
  }
}

module.exports = (() => {
  if (!instance) {
    instance = new ImageService(helper)
  }

  return instance;
})();
