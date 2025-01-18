<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Поиск по ФИО"
      @input="onInput"
      class="search-input"
    />
  </div>
</template>

<script>
export default {
  emits: ["search"],
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    onInput(event) {
      const query = event.target.value;
      this.$emit("search", query);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  margin-bottom: 10px;
  .search-input {
    width: 180px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    &:focus {
      border-color: #0b868f;
    }
  }
}
</style>
