<template>
    <div>
      <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >

        <grid-item v-for="item in layout" :key="index" style="border: 1px solid red"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
          {{item.i}}
        </grid-item>
      </grid-layout>
    </div>
</template>

<script type="text/ecmascript-6">
  import vueGridLayout from 'vue-grid-layout';
  var GridLayout = vueGridLayout.GridLayout;
  var GridItem = vueGridLayout.GridItem;
    export default {
        data(){
            return {
                layout:[
                  {"x":0,"y":0,"w":2,"h":2,"i":"0"},
                  {"x":2,"y":0,"w":2,"h":4,"i":"1"},
                  {"x":4,"y":0,"w":2,"h":5,"i":"2"},
                  {"x":6,"y":0,"w":2,"h":3,"i":"3"},
                  {"x":8,"y":0,"w":2,"h":3,"i":"4"},
                  {"x":10,"y":0,"w":2,"h":3,"i":"5"},
                ]
            }
        },
        methods: {},
        computed: {},
        components: {
          GridLayout,
          GridItem
        }
    };
</script>
<style>

</style>
