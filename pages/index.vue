<template>
  <div id="app">
    <editor
      api-key="83f6028mdsd8lezuso3wtuct3gyk5uwd1rccqrp2s5eaxl5w"
      :init="init"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
 export default {
   name: 'app',
   components: {
     'editor': Editor
   },
   data:()=>{
     return {
       init: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }
     }
   }
 }
</script>