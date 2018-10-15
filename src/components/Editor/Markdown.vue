<template>
    <div class="markdown">
      <div class="plugins-tips">
        mavonEditor：基于Vue的markdown编辑器。
        访问地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
      </div>
      <mavon-editor class="markdown_" v-model="content" ref="md" @imgAdd="$imgAdd" @change="change"/>
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'markdown',
    data: function(){
      return {
        content:'',
        html:'',
        configs: {
        }
      }
    },
    components: {
      mavonEditor
    },
    methods: {
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file){
        var formdata = new FormData();
        formdata.append('file', $file);
        // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
        this.$axios({
          url: '/Meny/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
          this.$refs.md.$img2Url(pos, url);
        })
      },
      change(value, render){
        // render 为 markdown 解析后的结果
        this.html = render;
      },
      submit(){
        console.log(this.content);
        console.log(this.html);
        this.$message.success('提交成功！');
      }
    }
  }
</script>
<style scoped>
  .markdown{
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
  .plugins-tips{
    background: #eef1f6;
    padding: 20px 10px;
  }
  .editor-btn{
    margin-top: 20px;
  }
  .markdown_{
    height: 80% !important;
  }
</style>
