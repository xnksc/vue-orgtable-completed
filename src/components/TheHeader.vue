<template>
  <header>
    {{ title }}
  </header>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: x-large;
  line-height: 60px;
  color: #0b868f;
  vertical-align: middle;
  height: 60px;
}
</style>
