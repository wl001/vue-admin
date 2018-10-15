<template>
    <div>
        <switch-roles  @change="handleRolesChange"></switch-roles>
    </div>
</template>

<script type="text/ecmascript-6">
  import SwitchRoles from './component/SwitchRoles.vue'
    export default {
        data(){
            return {}
        },
        methods: {
          handleRolesChange() {
            this.$router.push({ path: '/?' + +new Date() })
          }
        },
        computed: {},
        components: {
          SwitchRoles
        }
    };
</script>
<style>

</style>
