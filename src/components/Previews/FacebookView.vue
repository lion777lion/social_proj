<template>
    <div class="facebook-preview">
      <div class="header">
        <div class="avatar"></div>
        <div class="name-timestamp">
          <div class="name">Your Name</div>
          <div class="timestamp">Just now</div>
        </div>
      </div>
      <div class="content">
        <p>{{ postText }}</p>
        <div class="media" v-if="mediaFiles && mediaFiles.length > 0">
          <img v-for="(file, index) in mediaFiles" :key="index" :src="file.url" />
        </div>
      </div>
      <div class="actions">
        <button class="action-button like-button">
          <span class="action-icon">👍</span> Like
        </button>
        <button class="action-button comment-button">
          <span class="action-icon">💬</span> Comment
        </button>
        <button class="action-button share-button">
          <span class="action-icon">🔁</span> Share
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FacebookView',
    props: {
      postText: String,
      mediaFiles: Array,
    },
  };
  </script>
  
  <style scoped>
  .facebook-preview {
    width: 500px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: white;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    background-color: #dadde1;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .name-timestamp {
    display: flex;
    flex-direction: column;
  }
  
  .name {
    font-weight: bold;
    font-size: 14px;
  }
  
  .timestamp {
    font-size: 12px;
    color: #606770;
  }
  
  .content {
    margin-bottom: 12px;
  }
  
  .media img {
    max-width: 100%;
    height: auto;
    margin-bottom: 12px;
  }
  
  .actions {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #e0e0e0;
    padding-top: 8px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    background-color: transparent;
    color: #606770;
    border: none;
    font-size: 14px;
    cursor: pointer;
    padding: 8px;
    flex: 1;
    justify-content: center;
  }
  
  .action-button:hover {
    background-color: #f2f3f5;
    border-radius: 6px;
  }
  
  .action-icon {
    margin-right: 6px;
  }
  </style>
  