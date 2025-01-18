<template>
  <button class="add-button" @click="$emit('openModal')">Добавить</button>
</template>

<style lang="scss" scoped>
.add-button {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  float: right;
  width: 180px;
  padding: 10px 40px;
  font-size: 16px;
  color: #fff;
  background-color: #0b868f;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: #096f77;
  }
}
</style>
