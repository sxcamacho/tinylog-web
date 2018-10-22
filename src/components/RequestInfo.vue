<template>
 <div class="box">
  <span class="line">curl -X {{request.method.toUpperCase()}} \</span>
  <span class="line">{{request.url}} \</span>
  <span class="line" v-for="(value, key, index) in request.body" :key="index">-F '{{key}}={{value}}'</span>
 </div>   
</template>

<script>
export default {
  props: ["request"]
};
</script>

<style scoped>
.box {
  border: 1px solid #ddd;
  background-color: #eee;
  max-width: 420px;
  padding: 20px;
  margin: 0 auto;
  text-align: left;
}
.line {
  display: block;
}
</style>


