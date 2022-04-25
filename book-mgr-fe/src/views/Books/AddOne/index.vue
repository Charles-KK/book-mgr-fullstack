<template>
 <div>
    <a-modal :visible="props.show" 
              title="add book" 
              @ok="submit" 
              @cancel="close">

      <a-form :label-col="{ span: 8 }">
        <a-form-item label="bookname">
          <a-input v-model:value="addForm.name"/>
        </a-form-item>
        <a-form-item label="author">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="classify">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="price">
          <a-input v-model:value="addForm.price" />
        </a-form-item>
        <a-form-item label="publishDate">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
      </a-form>
  </a-modal>

 </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { book } from '@/service';
import { message } from 'ant-design-vue';

import { result,deepClone } from '@/utils/'


const defaultForm = {
  name: '',
  author: '',
  price: 0,
  classify: '',
  publishDate: 0,
}
export default defineComponent({
  props: {
    // 声明接受父组件的参数
    show: Boolean
  },
  setup(props, context) {
    console.log(props)
    const addForm = reactive(deepClone(defaultForm))
    const submit = async () => {
      const form = deepClone(addForm);
      // utc to timestamp
      form.publishDate = addForm.publishDate.valueOf()
      // console.log(addForm);
      const res = await book.add(form);
      
      result(res)
        .success((d,{data}) => {
          // 清空form： 往addForm 合并default form
          // 不能直接取到msg，因为axios返回时做了一层包装
          message.success(data.msg)
          Object.assign(addForm, defaultForm)
        })
    }
    const close = async () => {
      context.emit('update:show',false)
    }
    return {
      addForm, props,
      submit, close
    }
  }
})
</script>