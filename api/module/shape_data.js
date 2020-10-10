
module.exports = res => {

  // 受け取ったデータを整形
  let body = res.req.body;
  
  const header = ["filename","title","description"];

  body = Object.keys(body).reduce((acc,k,i) => {

    const [tag,block,className] = k.split("__");

    if(header.includes(tag)) {
      acc[k] = body[k]
      return acc;
    }

    if(Array.isArray(body[k])){
      body[k].forEach(item => {
        acc.data.push({ tag, block, class: className || "", content : item, content2 : ""})
      })
    } else if (tag === "figcaption"){
      acc.data[i - 1].content2 = body[k]
    } else {
      acc.data.push({ tag, block, class: className || "", content : body[k], content2 : ""})
    }

    return acc;
  },{
    data:[]
  });

  // 画像がある場合のJSONへのパスのマッピング
  if(res.req.files.files){
    for(let i = 0,l = res.req.files.files.length;i < l;i++){
      const name = res.req.files.files[i].filename;

      let flg = false;
      body.data = body.data.map( item => {
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