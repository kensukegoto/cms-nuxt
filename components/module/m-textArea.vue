<template>
  <div class="wrapper">
    <div class="handle"></div>
    <div class="editor">
      <editor
        :api-key="apiKey"
        :init="init"
        :initialValue="content"
        @onKeyUp="handlerFunction"
        @onExecCommand="handlerFunction"
      />
    </div>
    <mToolBox class="toolbox" @doDelete="doDelete" />
  </div>
</template>

<script>
import mToolBox from "~/components/module/m-toolBox"
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'app',
  components: {
    mToolBox,
    'editor': Editor
  },
  methods: {
    doDelete(){
      this.$emit("doDelete");
    },
    handlerFunction(event,editor){
      let content;
      if(event.type === "keyup"){
        content = event.target.innerHTML;
      } else {
        content = event.target.contentDocument.body.innerHTML;
      }
      this.$emit("doUpdate",content);
    }
  },

  props: ["content"],
  data:()=>{
    return {
      apiKey: "83f6028mdsd8lezuso3wtuct3gyk5uwd1rccqrp2s5eaxl5w", 
      init: {
        language: 'ja',
        plugins: 'paste',
        paste_as_text: true,
        contextmenu: false,
        // forced_root_block: false,　// 改行をpとbrどちらにするか
        menubar: false,
        height: 320,
        content_style: `
          body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
          .left { text-align: left; }
          .bold { font-weight: bold; } 
          .bgBlue { padding: 8px; background-color: #f5e9f7 }
          .bgRed { padding: 8px; background-color: #fee5e5 }
          `,
        formats: {
          bold: { inline: 'span', classes: 'bold' },
          bgBlue : { selector: 'p', classes: 'bgBlue'},
          bgRed : { selector: 'p', classes: 'bgRed'},
        },    
        toolbar: 'bold forecolor | textBg alignment',
        color_map: [
          'FF0000', 'Red',
          '0000FF', 'Blue',
        ],
        custom_colors: false,
        setup: function(editor){

          editor.ui.registry.addIcon('bgNone',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="transparent" stroke-dasharray="4" stroke="#333"></rect></svg>`);
          editor.ui.registry.addIcon('bgBlue',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#f5e9f7"></rect></svg>`);
          editor.ui.registry.addIcon('bgRed',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#fee5e5"></rect></svg>`);

          editor.ui.registry.addMenuButton('textBg', {
            // text: '座布団',
            icon: 'fill',
            fetch: function (callback) {
              var items = [
                {
                  type: 'menuitem',
                  text: '無',
                  icon: 'bgNone',
                  onAction: function (_) {
                    editor.execCommand("RemoveFormat",null,"bgRed");
                    editor.execCommand("RemoveFormat",null,"bgBlue");
                  },
                  onSetup: function(api) {
                    return function() {};
                  }
                },
                {
                  type: 'menuitem',
                  text: '青',
                  icon: 'bgBlue',
                  onAction: function (_) {
                    editor.execCommand("RemoveFormat",null,"bgRed");
                    editor.execCommand("mceToggleFormat",null,"bgBlue");
                  },
                  onSetup: function(api) {
                    return function() {};
                  }
                },
                {
                  type: 'menuitem',
                  text: '赤',
                  icon: 'bgRed',
                  onAction: function (_) {
                    editor.execCommand("RemoveFormat",null,"bgBlue");
                    editor.execCommand("mceToggleFormat",null,"bgRed");
                  },
                  onSetup: function(api) {
                    return function() {};
                  }
                }
              ];
              callback(items);
            }, // fetch
          });

        }
      },
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
  }
  .toolbox {
    width: 60px;
  }
}
</style>