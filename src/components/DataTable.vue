<template>
  <div>
    <SearchBar @search="filterByFullName" />
    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortTable('orgName')">
            <div class="sorted-col">
              Название
              <span v-if="sortField === 'orgName'">
                <Icon
                  v-if="sortDirection === 'asc'"
                  icon="material-symbols-light:arrow-back-ios-new-rounded"
                  class="icon"
                ></Icon>
                <Icon
                  v-if="sortDirection === 'desc'"
                  icon="material-symbols-light:arrow-back-ios-new-rounded"
                  class="icon down"
                ></Icon>
              </span>
            </div>
          </th>
          <th @click="sortTable('fullName')">
            <div class="sorted-col">
              ФИО Директора
              <span v-if="sortField === 'fullName'">
                <Icon
                  v-if="sortDirection === 'asc'"
                  icon="material-symbols-light:arrow-back-ios-new-rounded"
                  class="icon"
                ></Icon>
                <Icon
                  v-if="sortDirection === 'desc'"
                  icon="material-symbols-light:arrow-back-ios-new-rounded"
                  class="icon down"
                ></Icon>
              </span>
            </div>
          </th>
          <th>Телефон</th>
          <th class="delete-row">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredOrganizations.length === 0">
          <td v-if="pageOrganizations.length === 0" colspan="4">
            Данные отсутствуют
          </td>
          <td v-else colspan="4">Результаты отсутствуют</td>
        </tr>
        <tr v-for="org in filteredOrganizations" :key="org.id">
          <td>{{ org.orgName }}</td>
          <td>{{ org.fullName }}</td>
          <td>{{ org.phone }}</td>
          <td class="delete-row">
            <button @click="$emit('delete', org.id)">✖</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    Icon,
    SearchBar,
  },
  props: {
    pageOrganizations: Array,
  },
  data() {
    return {
      sortField: null,
      sortDirection: "asc",
      searchQuery: "",
    };
  },
  computed: {
    filteredOrganizations() {
      const searchQuery = this.searchQuery.trim();
      const filteredOrgs = this.pageOrganizations.filter((org) =>
        org.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (!this.sortField) return filteredOrgs;
      return filteredOrgs.sort((a, b) => {
        const fieldA = a[this.sortField].toLowerCase();
        const fieldB = b[this.sortField].toLowerCase();
        if (fieldA < fieldB) return this.sortDirection === "asc" ? -1 : 1;
        if (fieldA > fieldB) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
  methods: {
    sortTable(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortDirection = "asc";
      }
    },
    filterByFullName(query) {
      this.searchQuery = query;
    },
  },
};
</script>
<style lang="scss" scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    border: 1px solid #0b868f4c;
    padding: 8px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    background-color: #0b868f35;
    font-weight: bold;
  }

  th:nth-child(-n + 3),
  td:nth-child(-n + 3) {
    width: calc((100% - 90px) / 3);
  }

  th:last-child,
  td:last-child {
    width: 90px;
    text-align: center;
  }

  .data-table th {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
  }

  .sorted-col {
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 6px;

    .icon {
      font-size: 10px;
      font-weight: bold;
      color: #0b868f;
      transform: rotate(90deg);
    }

    .down {
      transform: rotate(-90deg);
    }
  }

  button {
    color: #0b868f;
    width: 100%;
    background-color: #ffffff;
    border: none;
    font-size: large;
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: darken(#0b868f, 20%);
    }
  }

  .delete-row {
    padding: 0;
  }
}
</style>
