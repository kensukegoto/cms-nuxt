export default data => {

  // console.log(data)

  let blocks = data.reduce((list,item,index)=> {
    if(item.tag === "p"){
      list[item.block] = !list[item.block] ? [] : list[item.block];
      list[item.block].push(item);
    } else {
      list[item.block] = item;
    }
    return list;
  },[]);


  blocks = blocks.reduce((list,block) => {

    let value = "";
    let type = "";

    if(Array.isArray(block)){
      if(block){
        type = "text";
        block.forEach(item => {
          value += `<${item.tag} class="${item.class}">${item.content}</${item.tag}>`;
        });
      }

    } else if (/h2|h3|img/.test(block.tag)){
      type = block.tag;
      value += `${block.content}`;
    } 

    list.push({ type, content: value, file: null });
    return list;

  },[])

  return blocks;

}
  