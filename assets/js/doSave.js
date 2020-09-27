export default data => {

  const savedData = data
  .filter(item => {
    return item.update.trim() !== "";
  })
  .reduce((acc,content,block) => {

    const nodes = createHTML(content.content);

    if(nodes.length !== 0 ) {
      [...nodes].forEach(item => {
        acc.push({
          block,
          tag: item.tagName.toLowerCase(),
          class: item.className,
          content: item.innerHTML,
          // encode: escape(item.innerHTML)
        })
      })

      return acc;
    }

    acc.push({
      block,
      tag: content.type.toLowerCase(),
      class: "",
      content: content.update,
      // encode: escape(item.innerHTML)
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