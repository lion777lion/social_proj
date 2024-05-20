<template>
    <div class="layout">
      <header class="header">
        <div class="header-left">
          <h1>TempName</h1>
        </div>
        <div class="header-right">
          <button @click="logout">Logout</button>
        </div>
      </header>
      <div class="main-container">
        <aside class="sidebar">
          <nav>
            <ul>
              <li><router-link to="/feed"><span class="icon">🏠</span><span class="text">Feed</span></router-link></li>
              <li><router-link to="/newpost"><span class="icon">📝</span><span class="text">New Post</span></router-link></li>
              <li><router-link to="/scheduled-posts"><span class="icon">📅</span><span class="text">Scheduled Posts</span></router-link></li>
              
              <li><router-link to="/settings"><span class="icon">⚙️</span><span class="text">Settings</span></router-link></li>
            </ul>
          </nav>
        </aside>
        <main class="content">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        this.$store.logout();
        this.router.push('AuthForm')
      },
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden; /* Prevent unnecessary scroll */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    color: #000000;
    padding: 0.5em 1em;
    border-bottom: 1px solid #e0e0e0;
    flex-shrink: 0; /* Prevent header from shrinking */
  }
  
  .header-left h1 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .header-right button {
    background: none;
    border: 1px solid #d0d0d0;
    color: #000000;
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 4px;
  }
  
  .header-right button:hover {
    background-color: #f5f5f5;
  }
  
  .main-container {
    display: flex;
    flex: 1;
    overflow: hidden; /* Prevent unnecessary scroll */
  }
  
  .sidebar {
    width: 200px;
    background-color: #f5f5f5;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    height: 100%; /* Use full available height */
    overflow-y: auto;
  }
  
  .sidebar nav ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar nav li {
    margin: 1em 0;
    display: flex;
    align-items: center;
  }
  
  .sidebar nav a {
    text-decoration: none;
    color: #333;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    border-radius: 4px;
    font-size: 1.2em; /* Increase font size */
  }
  
  .sidebar nav a:hover {
    background-color: #e0e0e0;
  }
  
  .sidebar .icon {
    margin-right: 0.5em;
  }
  
  .sidebar .text {
    flex-grow: 1;
    text-align: right;
  }
  
  .content {
    flex-grow: 1;
    padding: 1em;
    overflow-y: auto; /* Allow scrolling in the content area if needed */
  }
  </style>
  