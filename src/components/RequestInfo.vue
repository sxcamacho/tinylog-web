<template>
 <div class="box">
     <span>{{request.verb}}: {{request.url}}</span>
     <p>body: {{request.body}}</p>
 </div>   
</template>

<script>
export default {
  props: ["request"]
};
</script>

<style scoped>
.box {
  border: 1px solid red;
}
</style>


