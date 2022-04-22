<template>
  <div class="book-list">
    <a-card>
      <h2>books list</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="input search text"
            enter-button="Search"
            size="large"
            @search="onSearch"
          />
        </div>
        <a-button>add</a-button>
      </space-between>
      <a-divider></a-divider>
      
      <a-table :columns="columns" :data-source="data">
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
      </a-table>  
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const columns = [
      {
        title: 'name',
        dataIndex: 'name'
      },
      {
        title: 'age',
        dataIndex: 'age'
      }

    ];;
    const data = [
     {
        key: 0,
        name: 'xiaoke',
        age: 20
     },

    ];

    return {
      columns, data
    }
    
  },
})
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>