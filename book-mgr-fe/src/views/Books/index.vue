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
        <a-button @click="show = true">add</a-button>
      </space-between>
      <a-divider></a-divider>
      
      <a-table :columns="columns" 
          :data-source="list" 
          :pagination="false" >
        <template #publishDate="data">
          <a>{{formatTime(data.record.publishDate) }}</a>
        </template>
      </a-table>
      <space-between>
          <div></div>
          <a-pagination style="margin-top:20px" 
            v-model:current="curPage" 
            :total="total"
            :page-size="5"
            @chaneg="setPage"></a-pagination>
      </space-between> 
      <!-- 将控制弹框的变量传参给子组件 模态框 -->
      <add-one v-model:show="show"></add-one>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted} from 'vue'
import AddOne from './AddOne/index.vue'
import { book } from '@/service';
import { result,formatTime } from '@/utils'
export default defineComponent({
    components: {
    AddOne
  },
  setup() {
    const columns = [
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '分类',
        dataIndex: 'classify'
      },
      {
        title: '初版日期',
        dataIndex: 'publishDate',
        slots:{
          customRender:'publishDate'
        }
      }
    ];
    const show = ref(false);
    const list = ref([]);

    const total = ref(0)
    const curPage = ref(1)

    const getList = async () => {
          const res = await book.list({
            page = curPage.value,
            size = 5
          });

      }
    
    onMounted(async () => {
      // 调用前端请求的方法
      const res = await book.list();
      console.log('res',res);
      result(res).success(({data}) => {
        list.value = data;
        console.log(list);
      })
    })

    return {
      columns, list, show,
      formatTime
    }
    
  },
})
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>