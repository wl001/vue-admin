<template>
    <div>
      <h3>计数器</h3>
      <button @click="add">+</button>
      <span>{{$store.state.num.count}}</span>
      <button @click="del">-</button>
      当前是{{$store.getters.val}}
      <button  @click="clickOdd">偶数才能点击 +</button>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters} from  'vuex'
    export default {
        data(){
            return {}
        },
        methods: {
          add(){
            this.$store.commit('increase')
          },
          del(){
            //commit 直接提交到mutation处理
            this.$store.commit('decrement')
          },
          clickOdd(){
            //要actions异步处理需要dispatch
            this.$store.dispatch('clickOdd')
          },
        },
        computed: {},
        components: {}
    };
</script>
<style>

</style>
