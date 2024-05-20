<template>
    <div class="account-item">
      <div>{{ account.socialNetwork }}</div>
      <div>{{ account.username }}</div>
      <div>{{ account.password }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      account: Object, // Принимаем учетную запись в качестве свойства
    },
  };
  </script>
  
  <style scoped>
  .account-item {
    display: flex;
    justify-content: space-between;
  }
  </style>
  