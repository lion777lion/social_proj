<template>
    <div class="main-page">
      <header class="header">
        <slot name="header-content"></slot>
      </header>
      <aside class="sidebar">
        <slot name="sidebar-content"></slot>
      </aside>
      <main class="main-content">
        <slot></slot>
      </main>
    </div>
  </template>
  
  
  <script>
    export default {
    name: 'HomePage',
  };
</script>