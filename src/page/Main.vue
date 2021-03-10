
<template>
  <div id="main">
    <h1>主页面</h1>
  </div>
</template>

<style>
h1 {
  color: white;
}
#main {
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
}
</style>

<script>



export default {
  
  
  created(){
     this.search();
     
  },
  mounted() {
  },
  methods: {
    
    search() {
      console.log(1111111);
      window.api.receive("fromMain", (data) => {
        console.log(44444444);
        // alert(data);
            console.log(`Received ${data} from main process`);
        });
      window.api.send("toMain", "some data");
    }
  },
};
</script>