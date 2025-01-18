<template>
  <div class="table-page">
    <AddButton @open-modal="openModal" />
    <DataTable
      :pageOrganizations="currentPageOrganizations"
      @delete="deleteOrganization"
    />
    <PageHandler
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-change="changePage"
    />
    <ModalForm
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      @add="addOrganization"
      @close="closeModal"
    />
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue";
import DataTable from "@/components/DataTable.vue";
import PageHandler from "@/components/PageHandler.vue";
import ModalForm from "@/components/ModalForm.vue";

export default {
  props: {
    page: Number,
  },
  components: {
    AddButton,
    DataTable,
    PageHandler,
    ModalForm,
  },
  data() {
    return {
      pageRows: 10,
      isModalOpen: false,
    };
  },
  inject: ["organizations"],
  computed: {
    currentPage() {
      return this.page || 1;
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.organizations.length / this.pageRows));
    },
    currentPageOrganizations() {
      const start = (this.currentPage - 1) * this.pageRows;
      return this.organizations.slice(start, start + this.pageRows);
    },
  },
  methods: {
    addOrganization(newOrg) {
      const newId =
        this.organizations.length > 0
          ? Math.max(...this.organizations.map((org) => org.id)) + 1
          : 1;
      this.organizations.push({ id: newId, ...newOrg });
      this.closeModal();

      if (this.totalPages !== this.currentPage) {
        this.changePage(this.totalPages);
      }
    },
    deleteOrganization(id) {
      const index = this.organizations.findIndex((org) => org.id === id);
      if (index !== -1) {
        this.organizations.splice(index, 1);
        if (this.currentPage > this.totalPages) {
          this.changePage(this.totalPages);
        }
      }
    },
    changePage(newPage) {
      const validPage = Math.max(1, Math.min(newPage, this.totalPages));
      this.$router.push(`/${validPage}`);
    },
    checkPageAvailable() {
      if (this.currentPage > this.totalPages) {
        this.changePage(this.totalPages);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  watch: {
    page() {
      this.checkPageAvailable();
    },
    organizations: {
      handler() {
        if (this.organizations.length === 0 && this.currentPage !== 1) {
          this.changePage(1);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.checkPageAvailable();
  },
};
</script>

<style lang="scss" scoped>
.table-page {
  margin: 0 auto;
  padding: 20px 20px;
  @media (min-width: 768px) {
    padding: 20px 50px;
  }
  @media (min-width: 1025px) {
    padding: 20px 100px;
  }
  @media (min-width: 1440px) {
    padding: 20px 220px;
  }
}
</style>
