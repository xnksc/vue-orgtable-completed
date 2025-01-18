<template>
  <div v-if="isOpen" class="background" @click="closeModal"></div>
  <dialog class="modal" @click.stop>
    <form @submit.prevent="addOrganization">
      <header>Добавить Организацию</header>
      <div class="modal-inputs">
        <div class="input-container">
          <input
            type="text"
            placeholder="Название"
            v-model="form.orgName"
            @blur="handleBlur('orgName')"
            @input="handleInput('orgName')"
            :class="{ 'input-error': touched.orgName && errors.orgName }"
          />
          <p v-if="touched.orgName && errors.orgName" class="error-message">
            Введите корректное название
          </p>
        </div>
        <div class="input-container">
          <input
            type="text"
            placeholder="Номер телефона"
            v-model="form.phone"
            @blur="handleBlur('phone')"
            @input="handleInput('phone')"
            :class="{ 'input-error': touched.phone && errors.phone }"
          />
          <p v-if="touched.phone && errors.phone" class="error-message">
            Недопустимый формат номера
          </p>
        </div>
        <div class="input-container">
          <input
            type="text"
            placeholder="ФИО директора"
            v-model="form.fullName"
            @blur="handleBlur('fullName')"
            @input="handleInput('fullName')"
            :class="{ 'input-error': touched.fullName && errors.fullName }"
          />
          <p v-if="touched.fullName && errors.fullName" class="error-message">
            Введите корректное ФИО
          </p>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="closeModal" class="cancel-button">Отмена</button>
        <button type="submit" :disabled="!isFormValid" class="ok-button">
          ОК
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
export default {
  props: { isOpen: Boolean },
  emits: ["add", "close"],
  data() {
    return {
      form: { orgName: "", fullName: "", phone: "" },
      errors: { orgName: false, fullName: false, phone: false },
      touched: { orgName: false, fullName: false, phone: false },
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.form).every(
        (field) =>
          !this.errors[field] &&
          this.form[field] &&
          !this.getValidationError(field, this.form[field])
      );
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addOrganization() {
      this.validateForm();
      if (this.isFormValid) {
        this.form.fullName = this.formatName(this.form.fullName);
        this.$emit("add", { ...this.form });
        this.closeModal();
      }
    },
    validateForm() {
      Object.keys(this.form).forEach((field) => {
        this.touched[field] = true;
        this.validateField(field);
      });
    },
    validateField(field) {
      if (this.touched[field]) {
        this.errors[field] = this.getValidationError(field, this.form[field]);
      }
    },
    handleBlur(field) {
      this.touched[field] = true;
      this.validateField(field);
    },
    handleInput(field) {
      if (this.touched[field]) {
        this.validateField(field);
      }
    },
    getValidationError(field, value) {
      switch (field) {
        case "orgName":
          return !value || value.trim().length < 2;
        case "fullName":
          return (
            !value || !this.isFullNameValid(value) || value.trim().length < 2
          );
        case "phone":
          return !this.isPhoneValid(value);
        default:
          return false;
      }
    },
    isFullNameValid(fullName) {
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s.]+$/;
      return nameRegex.test(fullName.trim());
    },
    isPhoneValid(phone) {
      const phoneRegex = /^[+\d]\d{8,}$/;
      return phoneRegex.test(phone) && phone.trim().length <= 18;
    },
    formatName(text) {
      return text
        .trim()
        .split(/\s+/)
        .map((word) => {
          if (word.includes(".")) {
            return word
              .split(".")
              .map(
                (subword) =>
                  subword.charAt(0).toUpperCase() +
                  subword.slice(1).toLowerCase()
              )
              .join(".");
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        })
        .join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
$focus-border: #0b868f;
$button-disabled: #0b868f5e;

.background {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.modal {
  position: fixed;
  inset: 0;
  display: flex;
  width: 500px;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

dialog {
  position: fixed;
  display: flex;
  justify-self: center;
  align-self: center;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 5px 16px rgba(43, 43, 43, 0.7);
  padding: 0;
  margin: 0;
  overflow: hidden;
  transform: translateY(100%);
  opacity: 0;
  animation: slideIn 0.3s forwards;
}

form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

header {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  color: $focus-border;
}

.modal-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.input-container {
  position: relative;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &.input-error {
    border-color: red;
  }
}

.error-message {
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -18px;
  left: 0;
  margin: 0;
}

.modal-actions {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}

button {
  width: 30%;
  &.cancel-button {
    background-color: #e7e7e7;
    color: #414141;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  &.ok-button {
    background-color: $focus-border;
    color: white;

    &:disabled {
      background-color: $button-disabled;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #096f77
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateY(10%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
