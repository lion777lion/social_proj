<template>
    <div class="post-creator">
      <div class="left-panel">
        <div class="account-selector">
          <label for="account">Select Account</label>
          <select id="account" v-model="selectedAccount">
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }}
            </option>
          </select>
        </div>
        <div class="text-field">
          <label for="postText">Post Text</label>
          <textarea id="postText" v-model="postText" @input="updatePreview"></textarea>
          <div class="formatting-buttons">
            <div class="formatting-buttons">
            <button @click="applyFormat('bold')" :class="{ active: isFormatApplied('bold') }">B</button>
            <button @click="applyFormat('italic')" :class="{ active: isFormatApplied('italic') }">I</button>
            <button @click="applyFormat('underline')" :class="{ active: isFormatApplied('underline') }">U</button>
          </div>
          </div>
          <div class="char-counter">{{ postText.length }}/280</div>
        </div>
        <div class="media-buttons">
          <label for="media">Add Media</label>
          <input type="file" id="media" @change="addMedia" multiple />
        </div>
        <div class="schedule-controls">
          
        </div>
      </div>
      <div class="right-panel">
        <div class="post-preview">
          <h3>Preview</h3>
          <div class="preview-content">
            <div>
              
              <div class="social-network-selection">
                  <button @click="showPreview('facebook')"  :class="{ active: selectedSocialNetwork === 'facebook' }"> Facebook </button>
                  <button  @click="showPreview('instagram')"  :class="{ active: selectedSocialNetwork === 'instagram' }"> Instagram </button>
              </div>
              <div class="post-preview">
                  <component :is="selectedSocialNetworkPreview"></component>
              </div>
                <div >
                  <div >
                    <FacebookView :key="facebookUpdater" v-if="selectedSocialNetwork === 'facebook'"  :postText="postText" :mediaFiles="mediaFiles"></FacebookView>
                  </div>
                </div>
            </div>
        </div>
        <div class="action-buttons">
            <div class="row">
            <button @click="toggleScheduleModal">Schedule Post</button>
            <button @click="publishNow">Publish Now</button>
        </div>
        </div>
      </div>
      <div v-if="isScheduleModalOpen" class="modal">
        <div class="modal-content">
          <h3>Schedule Post</h3>
          <input type="datetime-local" v-model="scheduleDate" :min="currentDate" />
          <button @click="schedulePost">Schedule</button>
          <button @click="toggleScheduleModal">Close</button>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import FacebookView from '../Previews/FacebookView.vue'
  export default {
    name: 'NewPost', 
    components:{
      FacebookView
    },
    data() {
      return {
        facebookUpdater: 0,
        selectedSocialNetwork: null,
        selectedAccount: null,
        accounts: [
          { id: 1, name: "Account 1" },
          { id: 2, name: "Account 2" },
        ],
        postText: "",
        mediaFiles: [],
        isScheduleModalOpen: false,
        scheduleDate: "",
      };
    },
    computed: {
      currentDate() {
        return new Date().toISOString().slice(0, 16);
      },
    },
    methods: {
      showPreview(socialNetwork) {
        console.log('Selected social network:', socialNetwork);
        this.selectedSocialNetwork = socialNetwork;
      },
      updatePreview() {
          this.facebookUpdater++;
      },
      addMedia(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = (e) => {
            this.mediaFiles.push({ url: e.target.result });
            console.log("Media files:", this.mediaFiles);
          };
          reader.readAsDataURL(file);
          this.facebookUpdater++;
        }
      },
      toggleScheduleModal() {
        this.isScheduleModalOpen = !this.isScheduleModalOpen;
      },
      publishNow() {
        console.log("Publishing now:", this.postText, this.mediaFiles);
      },
      schedulePost() {
        console.log("Scheduling post for:", this.scheduleDate);
        this.toggleScheduleModal();
      },
      applyFormat(format) {
      document.execCommand(format);
    },
    isFormatApplied(format) {
      return document.queryCommandState(format);
    }
    },
  };
  </script>
  
  
  
  <style scoped>
  .social-network-selection {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.social-network-selection button {
  flex: 1;
  padding: 10px 20px;
  border: none;
  background: #f1f1f1;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, border-bottom 0.3s;
}

.social-network-selection button:hover {
  background: #e0e0e0;
}

.social-network-selection button.active {
  background: white;
  border-bottom: 2px solid #007bff;
  font-weight: bold;
}

.post-preview {
  padding: 10px;
}
  .formatting-buttons {
  margin-bottom: 10px;
}

.formatting-buttons button {
  margin-right: 5px;
  padding: 4px 8px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.formatting-buttons button.active {
  background-color: #007bff;
  color: white;
}
  .post-creator {
    display: flex;
    gap: 2em;
    font-family: Arial, sans-serif;
  }
  
  .left-panel,
  .right-panel {
    flex: 1;
  }
  
  .account-selector,
  .text-field,
  .media-buttons,
  .schedule-controls {
    margin-bottom: 1em;
  }
  
  .text-field textarea {
    width: 100%;
    height: 200px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  }
  
  .char-counter {
    text-align: right;
    font-size: 0.8em;
    color: #666;
  }
  
  .media-buttons input[type="file"] {
    display: none;
  }
  
  .media-buttons label {
    display: inline-block;
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .schedule-controls button {
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .left-panel label {
    font-weight: bold;
  }
  
  .right-panel {
    display: flex;
    flex-direction: column;
  }
  
  .post-preview h3 {
    margin-top: 0;
  }
  
  .post-preview p {
    margin-bottom: 12px;
  }
  
  .post-preview img {
    max-width: 100%;
    height: auto;
    margin-bottom: 12px;
  }
  
  .action-buttons {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 10px;
  }
  
  .action-buttons button {
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    font-size: 24px;
  }
  
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
    border-radius: 5px;
  }
  
  .modal-content h3 {
    margin-top: 0;
  }
  
  .modal-content input[type="datetime-local"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  