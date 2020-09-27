export default data => {

  const savedData = data
  .filter(item => {
    return item.update.trim() !== "";
  })
  .reduce((acc,content,block) => {

    const nodes = createHTML(content.content);

    if(nodes.length !== 0 ) {
      [...nodes].forEach(item => {
        const className = item.className ? `__${item.className}` : "";
        acc.push({
          name:`${item.tagName.toLowerCase()}__${block}${className}`,
          content: item.innerHTML
        })
      })

      return acc;
    }

    const className = content.className ? `__${content.className}` : "";
    acc.push({
      name:`${content.type.toLowerCase()}__${block}${className}`,
      content: content.update
    })



    return acc;


  },[]);

  return savedData;
}

function createHTML(str){
  const tempEl = document.createElement('div');
  tempEl.innerHTML = str;
  return tempEl.querySelectorAll(":scope > *");
}