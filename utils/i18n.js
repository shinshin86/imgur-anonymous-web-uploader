module.exports.setIndexPageText = (res) => {
  return {
    title: res.__('title'),
    uploadImage: res.__('uploadImage'),
    uploadImageDescription: res.__('uploadImageDescription'),
    uploadButton: res.__('uploadButton'),
    deleteUploadedImage: res.__('deleteUploadedImage'),
    deleteUploadedImageDescription: res.__('deleteUploadedImageDescription'),
    deleteButton: res.__('deleteButton'),
    selectedLang: res.locale,
  };
};

module.exports.setUploadPageText = (res) => {
  return {
    uploadedMessage: res.__('uploadedMessage'),
    imageUrl: res.__('imageUrl'),
    deleteHashText1: res.__('deleteHashText1'),
    deleteHashText2: res.__('deleteHashText2'),
    deleteImageNow: res.__('deleteImageNow'),
    deleteButton: res.__('deleteButton'),
    backToTopPage: res.__('backToTopPage'),
    selectedLang: res.locale,
  };
};

module.exports.setDeletePageText = (res) => {
  return {
    deleteMessage: res.__('deleteMessage'),
    backToTopPage: res.__('backToTopPage'),
    selectedLang: res.locale,
  };
};
