<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Add New Account</h2>
      <div class="form-group">
        <label for="socialNetwork">Social Network</label>
        <select id="socialNetwork" v-model="selectedSocialNetwork">
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
        </select>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="button-group">
        <button @click="addAccount">Add Account</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSocialNetwork: 'facebook',
      username: '',
      password: '',
    };
  },
  methods: {
    addAccount() {
      const newAccount = {
        socialNetwork: this.selectedSocialNetwork,
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch('addAccount', newAccount);
      this.closeModal();
    },
    closeModal() {
      this.selectedSocialNetwork = 'facebook'; 
      this.username = ''; 
      this.password = '';
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 16px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 8px 16px;
  margin-left: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
