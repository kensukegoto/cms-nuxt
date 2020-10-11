const multer = require("multer");

const storage = multer.diskStorage({
  // ファイルの保存先を指定(今回はsrc/public/image以下に画像を保存)
  destination: function (req, file, cb) {
    cb(null, './static')
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: function (req, file, cb) {
    //　Math.random().toString(36).slice(-9)で乱数を生成
    const imageName = `image/${Math.random().toString(36).slice(-9)}_${Date.now()}.jpg`;
    cb(null, imageName)
  }
})

module.exports = multer({
  storage: storage
}).fields([{name:'files'},{name:'ogImageFiles'}])