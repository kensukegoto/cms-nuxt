const express = require("express");
const upload = require("./module/upload")
const shapeData = require("./module/shape_data");
const fs = require("fs");
const app = express();

app.post("/update",(req,res) => {

  upload(req, res, (err) => {

    if (err) {
      //アップロード失敗した場合
      res.json({
        status: "error",
        error: "fail to uplord image"
      })
    } else {

      const body = shapeData(res);

      const pubDate = new Date();
      const filename = `${pubDate.getFullYear()}${("00" + (pubDate.getMonth() + 1)).slice(-2)}${("00" + pubDate.getDate())}`;

      fs.writeFile(`./api/data/${filename}.json`, JSON.stringify(body),(err)=>{
        console.log(err)
      });


      res.json({
        status: "success",
        body: {
          item: body
        }
      })

    }
  })

})

module.exports = {
  path: "/",
  handler: app
}
