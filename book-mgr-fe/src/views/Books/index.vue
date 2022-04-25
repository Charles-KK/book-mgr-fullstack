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
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" class="back" @click="back">返回</a>
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
        <template #actions="{record}">
          <!-- <a href="">{{record}}</a> -->
          <a href="javascript:;" @click="remove(record)">delete</a>
        </template>
      </a-table>
      <space-between>
          <div></div>
          <!-- total的值应当是整个表所有记录的值，而不是list.length -->
          <a-pagination style="margin-top:20px" 
            v-model:current="curPage" 
            :total="total"
            :page-size="5"
            @change="setPage"></a-pagination>
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
import { message } from 'ant-design-vue';
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
      },
      {
        title: '操作',
        dataIndex: 'actions',
        slots:{
          customRender:'actions'
        }
      }
    ];
    const show = ref(false);
    const list = ref([]);

    const total = ref(0)
    const curPage = ref(1)
    const keyword = ref('')
    const isSearch = ref(false);

    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        keyword: keyword.value
      });
      result(res).success(({data}) => {
        // 起别名,区分开来才能赋值
        const {list:l, total:t} = data;
        list.value = l;
        total.value = t;
      })
      }
    
    onMounted(async () => {
      getList();
    })
    const setPage = (page) => {
      curPage.value = page;
      getList();
    }
    
    const onSearch = () => {
      getList();
      // if(keyword.value) {
      //   isSearch.value = true;
      // }
      isSearch = !!keyword.value    
    }
    // 搜索返回
    const back = () => {
      keyword.value = '';
      isSearch.value = false;
      getList();
    }
    const remove = async (record) => {
      console.log(record); 
      // const { _id } = record
      const res = await book.remove(record._id);
      result(res).success(({msg}) => {
        message.success(msg)
        getList();
      })
    }
    return {
      columns, list, show,
      formatTime,
      curPage, total, setPage,
      keyword, onSearch, isSearch, back,
      remove
    }
    
  },
})
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>