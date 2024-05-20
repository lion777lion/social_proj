<template>
    <div class="auth-container">
      <div class="auth-card">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        <div v-if="registrationSuccess">
            <p>Registration successful! Please login to continue.</p>
        </div>
        <form @submit.prevent="isLogin ? login() : register()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              v-model="email"
              required
              id="email"
              class="form-control"
            >
            <div v-if="emailError" style="color: red;">
              {{ emailError }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              v-model="password"
              required
              id="password"
              class="form-control"
            >
            <div v-if="passwordError" style="color: red;">
              {{ passwordError }}
            </div>
          </div>
          <div v-if="!isLogin" class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              v-model="confirmPassword"
              required
              id="confirmPassword"
              class="form-control"
            >
            <div v-if="confirmPasswordError" style="color: red;">
              {{ confirmPasswordError }}
            </div>
          </div>
          <div class="form-actions">
            <button type="submit">
              {{ isLogin ? 'Login' : 'Register' }}
            </button>
            <button @click="toggleAuthMode">
              {{ isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Make container fill viewport height */
  }
  
  .auth-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px; /* Set form width */
    text-align: center; /* Center form content horizontally */
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-control {
    display: block;
    width: 100%; /* Make input fields full width */
    padding: 12px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Include padding in width calculation */
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  .form-actions button {
    flex: 1; /* Make buttons take up half the space each */
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-actions button:nth-child(1) { /* Style login button */
    background-color: #007bff;
    color: #fff;
  }
  
  .form-actions button:nth-child(2) { /* Style toggle button */
    border: 1px solid #ccc;
    color: #333;
  }
  </style>
  
  <script>
  import { mapActions } from 'vuex';
  
  
  export default {
    data() {
      return {
        isLogin: true,
        email: '',
        password: '',
        confirmPassword: '',
        emailError: '', 
        passwordError: '', 
        confirmPasswordError: '', 
        registrationSuccess: false,
      };
    },
    methods: {
      ...mapActions(['registerUser', 'loginUser']),
      toggleAuthMode() {
        this.isLogin = !this.isLogin;
        this.emailError = ''; 
        this.passwordError = '';
        this.confirmPasswordError = '';
      },
      async register() {
        const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(this.email)) {
            this.emailError = 'Invalid email address';
            return;
        }

        if (this.password.length < 8) {
            this.passwordError = 'Password must be at least 8 characters long';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.confirmPasswordError = 'Passwords do not match';
        return; 
        }

        try {
          await this.registerUser({ email: this.email, password: this.password });
          this.isLogin = true;
          this.email = '';
          this.password = '';
          this.registrationSuccess = true;
          this.isLogin = true;
        } catch (error) {
          this.emailError = 'Registration failed'; 
          this.passwordError = '';
          this.confirmPasswordError = '';
        }
      },
      async login() {
      try {
        if(await this.loginUser({ email: this.email, password: this.password })){
            this.$router.push({ name: 'AppLayout' });
        }
        this.isLogin = true;
        this.password = '';
      } catch (error) {
        this.passwordError = 'Invalid email or password'; 
      }
    },
  },
};
</script>