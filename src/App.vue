<template>
  <the-header title="Список Организаций"></the-header>
  <router-view />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  components: { TheHeader },
  data() {
    return {
      organizations: [
        {
          id: 1,
          orgName: `ООО "Вектор"`,
          fullName: `Иванов И.И.`,
          phone: `+79001234567`,
        },
        {
          id: 2,
          orgName: `ИП "Сидоров"`,
          fullName: `Сидоров С.С.`,
          phone: `+79001122345`,
        },
        {
          id: 3,
          orgName: `ИП "Петров"`,
          fullName: `Петров П.С.`,
          phone: `+79001122543`,
        },
      ],
    };
  },
  provide() {
    return {
      organizations: this.organizations,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  font-family: "Inter", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding-top: 30px;
}
button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
</style>
