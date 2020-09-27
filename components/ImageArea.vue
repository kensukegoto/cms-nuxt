<template>
  <div 
    class="imageArea"
    v-if="item.type === 'img'"
  >
    <figure class="imageArea__image">
      <img :src="item.content || 'image/noimage.png'" alt="">
    </figure>
    <div class="imageArea__upload">
      <p>
        <input type="file">
        <span>ファイルを選択</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "item" ],
  methods:{

    doUpdate(e){
      this.$emit("doUpdate",e);
    }
  }
}
</script>


<style lang="scss" scoped>
.imageArea{

  background: #fff;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__image{
    width: 50%;
    img{
      max-width: 100%;
    }
  }
  &__upload{
    width: calc(50% - 8px );
    p{
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
  }
}

</style>