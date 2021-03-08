<template>
  <div id="login">
    <div class="input">
    <input type="text" placeholder="请输入账号">
    </div>
    <div class="input">
    <input type="text" placeholder="请输入密码">
    </div>
    <button @click="addRoute" target="_blank">立即登录</button>
  </div>
</template>

<style>
button{
  height: 50px;
  width:200px;
  margin: 20px;
  color: white;
  background: green;
  border-radius: 5px;
  outline:none;
  border:0px;
}

.input{
  height: 50px;
  width:200px;
  margin: 20px;
  background: white;
  border-radius: 5px;
}

input{
   width: 100%;
   height: 100%;
   padding-left: 10px;
   border-radius: 5px;
   background:none;
   outline:none;
   border:0px;
}

#login{
  height: 100%;
  background: black;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


</style>

<script>
export default {
    components: {

    },
    name: "login",
    methods: {
    addRoute () {
        const broadcast = new BroadcastChannel('loginStatus');
        broadcast.postMessage(true);
        window.close();
    },
  }

}
</script>