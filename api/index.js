const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

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

const upload = multer({
  storage: storage
}).fields([{name:'files'},{name:'imgPath'}])

app.post("/update",(req,res) => {

  upload(req, res, (err) => {

    if (err) {
      //アップロード失敗した場合
      res.json({
          status: "error",
          error: "fail to uplord image"
      })
    } else {
      //アップロード成功した場合
      let body = res.req.body;
      console.log(body);
      res.json({
        status: "ok"
      })

    }
  })



})

module.exports = {
  path: "/",
  handler: app
}
