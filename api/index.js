const express = require("express");
const upload = require("./module/upload")
const shapeData = require("./module/shape_data");
const fs = require("fs");
const app = express();

app.use("/data",express.static(__dirname + "/data"));

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



      // 一覧
      const listJson = JSON.parse(fs.readFileSync('./api/data/list.json', 'utf8'));

      let filename = body.filename;

      if(!filename){

        let today = (()=>{
          const d = new Date();
          return `${d.getFullYear()}${("00" + (d.getMonth() + 1)).slice(-2)}${("00" + d.getDate()).slice(-2)}`;
        })();

        const other = listJson.filter(item => {
          return item.filename.startsWith(today);
        });

        filename = `${today}${("00" + (other.length + 1)).slice(-2)}`
        body.filename = filename;

      } 

      // 個別記事
      fs.writeFile(`./api/data/${filename}.json`, JSON.stringify(body),(err)=>{
        console.log(err)
      });


      // 一覧ページ
      const index = listJson.findIndex(item => {
        return item.filename.startsWith(filename)
      });

      if(index >= 0){
        listJson.splice(index, 1, {filename});
      } else {
        listJson.unshift({filename})
      }

      fs.writeFile(`./api/data/list.json`, JSON.stringify(listJson),(err)=>{
        console.log(err)
      });


      res.json({
        status: "success",
        body: {
          item: body,
          list: listJson
        }
      })

    }
  })

})

module.exports = {
  path: "/",
  handler: app
}
