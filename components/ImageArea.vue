<template>
  <div class="wrapper">
    <div v-if="type!=='thumbnail'" class="handle"></div>
    <div class="editor" :class="{'editor--full': type === 'thumbnail'}">
      <div 
        class="imageArea"
      >
        <figure class="imageArea__image">
          <img :src="item.content || 'image/noimage.png'" alt="">
        </figure>
        <div class="imageArea__tool">
          <p class="upload">
            <input type="file" @change="e => { doUpdate(e) }">
            <span>ファイルを選択</span>
          </p>
          <p class="caption"  v-if="type!=='thumbnail'">
            <input 
              type="text" 
              placeholder="キャプション" 
              :value="item.content2"
              @input="e => {doUpdateCaption(e.target.value)}">
          </p>
        </div>
      </div>
    </div>
    <ToolBox v-if="type!=='thumbnail'" @doDelete="doDelete" />
  </div>
</template>

<script>
export default {
  props: [ "item","type" ],
  methods:{
    doDelete(){
      this.$emit("doDelete");
    },
    doUpdate(e){
      let files = e.target.files || e.dataTransfer.files;
      if(files.length === 0) return;
      let reader = new FileReader();

      reader.onload = (e) => {
        // base64の画像
        this.$emit("doUpdateImage",{
          base64: e.target.result,file: files[0]
        })
      };
      reader.readAsDataURL(files[0]);
    },
    doUpdateCaption(e){
      this.$emit("doUpdateCaption",e);
    }
  }
}
</script>


<style lang="scss" scoped>

.wrapper {
  display: flex;
  .handle{
    cursor: move;
    width: 32px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .editor{
    width: calc(100% - 32px - 60px);
    &--full{
      width: 100%;
    }
  }
  .toolbox {
    width: 60px;
  }
}

.imageArea{

  background: #fff;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid #ccc;

  &__image{
    width: 50%;
    img{
      max-width: 100%;
    }
  }
  &__tool{
    width: calc(50% - 8px );
    .upload{
      position: relative;
      height: 100px;
      background: #efefef;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        &:focus{
          outline: none;
        }
      }
    }
    .caption{
      margin-top: 8px;
      input {
        width: 100%;
      }
    }
  }
}

</style>