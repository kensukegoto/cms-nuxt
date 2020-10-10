export default (data,page) => {

  const savedData = data
  .filter(item => {
    return item.content.trim() !== "";
  })
  .reduce((acc,content,block) => {

    const nodes = createHTML(content.content);

    if(nodes.length !== 0 ) {
      [...nodes].forEach(item => {
        const className = item.className ? `__${item.className}` : "";
        acc.push({
          name:`${item.tagName.toLowerCase()}__${block}${className}`,
          content: item.innerHTML,
        })
      })

      return acc;
    }

    if(content.file) {

      acc.push({
        name:`${content.type.toLowerCase()}__${block}`,
        content: "",
      })

      acc.push({
        name:`figcaption__${block}`,
        content: content.content2,
      })

      acc.push({
        name: "files",
        content: content.file
      })

      return acc;
    }

    const className = content.className ? `__${content.className}` : "";

    acc.push({
      name:`${content.type.toLowerCase()}__${block}${className}`,
      content: content.content,
    })

    if(content.type === "img"){
      acc.push({
        name:`figcaption__${block}`,
        content: content.content2,
      })
    }

    return acc;

  },[]);

  savedData.push({ name: "filename" , content: page })

  let formData = new FormData();
  formData = savedData.reduce((form,item) => {
    form.append(item.name,item.content);
    return form;
  },formData);
  
  return formData;
}

function createHTML(str){
  const tempEl = document.createElement('div');
  tempEl.innerHTML = str;
  return tempEl.querySelectorAll(":scope > *");
}