<template>
  <div id="default">
    <div>
      <div class="btn" @click="addRoute" target="_blank">跳转登录</div>
      <div class="btn" @click="addRoute1" target="_blank">跳转主页面</div>
    </div>
    <div class="loginStatus" v-if="isLogin">已登录</div>
    <div class="loginStatus" v-if="!isLogin">未登录</div>
  </div>
</template>

<style>
.btn {
  margin: 30px;
  width: 200px;
  color: black;
  height: 100px;
  line-height: 100px;
  background: white;
  border-radius: 15px;
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
}

.loginStatus {
  margin-top: 50px;
  color: white;
  font-size: 20px;
}

#default {
  width: 100%;
  height: 100%;
  background: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
export default {
  mounted() {
    
    this.addBroadcast();
  },
  components: {},
  data() {
    return {
      isLogin: false,
    };
  },

  name: "default",
  methods: {
    addBroadcast() {
      var that = this;
      const broadcast = new BroadcastChannel("loginStatus");
      broadcast.onmessage = function (event) {
        
        that.isLogin = event.data;
        
      };

      // window.api.receive("fromMain", (data) => {
        
      //       console.log(`Received ${data} from main process`);
      //   });
      // window.api.send("toMain", "some data");

      
    },
    addRoute() {
      let routerJump = this.$router.resolve({ path: "/login" });
      // window.open(routerJump.href, "_blank");

      // this.$router.push({path:'/login',query:{}});

      window.location.href = routerJump.href
    },
    addRoute1() {
      let routerJump = this.$router.resolve({ path: "/main" });
      window.open(routerJump.href, "_blank");

      // window.location.href = routerJump.href
    },
  },
};
</script>