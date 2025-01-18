<template>
  <div class="page-handler">
    <button
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      <Icon icon="material-symbols-light:arrow-back-ios-new-rounded" />
    </button>
    <div class="page-title">Страница {{ currentPage }}/{{ totalPages }}</div>
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
    >
      <Icon
        horizontalFlip="true"
        icon="material-symbols-light:arrow-back-ios-new-rounded"
      />
    </button>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: { Icon },
  props: {
    totalPages: Number,
    currentPage: Number,
  },
};
</script>

<style lang="scss" scoped>
.page-handler {
  gap: 10px;
  display: flex;
  justify-content: end;
  margin-top: 20px;

  .page-title {
    display: flex;
    align-items: center;
  }

  button {
    padding: 8px 20px;
    background-color: #0b868f;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;

    &:disabled {
      background-color: #0b868f5e;
      cursor: not-allowed;
    }
    &:hover {
      &:not(:disabled) {
        background-color: darken(#0b868f, 10%);
      }
    }
  }
}
</style>
