import doSave from "~/assets/js/doSave";
import initData from "~/assets/js/initData"

const methods = {

  addText: ({ ctx }) => {
    ctx.data = [...ctx.data,{ type: "text", content: "", content2: "" }]
  },
  addTitle: ({ ctx }) => {
    ctx.data = [...ctx.data,{ type: "h2", content: "", content2: "" }]
  },
  addImage: ({ ctx }) => {
    ctx.data = [...ctx.data,{ type: "img", content: "", content2: "" }]
  },
  changeRadio({ ctx,arg }){
    const value = arg.val;
    const index = arg.key;
    ctx.data[index].type = value
  },
  doDelete({ ctx,arg }){
    const index = arg.key;
    ctx.data.splice(index,1);
  },
  doUpdate({ ctx,arg }){
    const index = arg.key;
    const value = arg.val;
    ctx.data[index].content = value
  },
  doUpdateCaption({ ctx,arg }){
    const index = arg.key;
    const value = arg.val;
    ctx.data[index].content2 = value
  },
  doUpdateImage({ ctx,arg }){
    const index = arg.key;
    const value = arg.val;
    ctx.data[index].content = value.base64;
    ctx.data[index].file = value.file;
  },
  doUpdateMeta({ ctx, arg }){

    const key = arg.type;
    const value = arg.val;

    if(key !== "ogImage"){
      ctx[key] = value;
      return;
    } 

    ctx[key].content =  value.base64;;
    ctx[key].file = value.file;
  },
  async doSave({ ctx,page }){
    
    const data = doSave({
      title: ctx.title,
      description: ctx.description,
      ogImage: ctx.ogImage,
      data: ctx.data,
      page
    });

    for (let d of data.entries()) {
      console.log(`${d[0]}: ${d[1]}`);
    }

    const config = {　headers: {'content-type': 'multipart/form-data'}}
    const res = await ctx.$axios.$post("/update",data,config)
    ctx.data = initData(res.body.item.data);
    ctx.$store.dispatch("items/updateItems",res.body.list)
      .then(()=>{
        ctx.$router.push("./");
      })

  },
}

export default (method,arg,ctx,page) => {

  methods[method]({ arg,ctx,page })

}