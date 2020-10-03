
module.exports = res => {

  // 受け取ったデータを整形
  let body = res.req.body;
  body = Object.keys(body).reduce((acc,k) => {

    const [tag,block,className] = k.split("__");

    if(Array.isArray(body[k])){
      body[k].forEach(item => {
        acc.push({ tag, block, class: className || "", content : item})
      })
    } else {
      acc.push({ tag, block, class: className || "", content : body[k]})
    }
    return acc;
  },[]);

  // 画像がある場合のJSONへのパスのマッピング
  if(res.req.files.files){
    for(let i = 0,l = res.req.files.files.length;i < l;i++){
      const name = res.req.files.files[i].filename;

      let flg = false;
      body = body.map( item => {
        if(!flg && item.tag.startsWith("img") && item.content === "") {
          item.content = name;
          flg = true;
        }
        return item;
      })
    }
  }

  return body;
  
}