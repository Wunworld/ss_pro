<template>
  <div class="login">
    <el-row class="login1">
      <el-col :span="24"><div class="grid-content bg-purple-dark">{{login}}</div></el-col>
      <!-- <input type="text" name="" value=""> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: '素材详情'
    }
  }
}
</script>

<style>
  .login{

  }
</style>
