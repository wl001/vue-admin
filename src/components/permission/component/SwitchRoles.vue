<template>
    <div>
      <div style="margin-bottom:15px;">您的权限:{{roles}}</div>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor"></el-radio-button>
        <el-radio-button label="admin"></el-radio-button>
      </el-radio-group>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {}
        },
        methods: {},
        computed: {
          roles() {
            return this.$store.getters.roles
          },
          switchRoles: {
            get() {
              return this.roles[0]
            },
            set(val) {
              this.$store.dispatch('ChangeRoles', val).then(() => {
                this.$emit('change')
                location.reload()
              })
            }
          }
        },
        components: {}
    };
</script>
<style>

</style>
