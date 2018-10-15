<template>
  <!--https://segmentfault.com/a/1190000010078042-->
  <!--https://blog.csdn.net/github_37847992/article/details/77900603-->
  <div class="drap_">
    <div class="plugins-tips">
      Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。
      访问地址：<a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </div>
    <div class="drag-box">
      <div class="boxWrap">
        <div class="drag-box-item">
          <div class="item-title">todo</div>
          <draggable :move="getdata" v-model="todo" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="(item,index) in todo" class="drag-list" :key="index">
                {{item.id}} {{item.content}}
              </div>
            </transition-group>
          </draggable>
          {{this.todo}}
        </div>
      </div>
      <div class="boxWrap">
        <div class="drag-box-item">
          <div class="item-title">doing</div>
          <draggable  v-model="doing" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="(item,index) in doing" class="drag-list" :key="index">
                {{item.id}} {{item.content}}
              </div>
            </transition-group>
          </draggable>
          <ul>
            <li v-for="(item,index) in doing">
              {{item.id}} {{item.content}}
            </li>
          </ul>
        </div>
      </div>
      <div class="boxWrap">
        <div class="drag-box-item">
          <div class="item-title">done</div>
          <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="(item,index) in done" class="drag-list" :key="index">
                {{item.id}} {{item.content}}
              </div>
            </transition-group>
          </draggable>
          <ul>
            <li v-for="(item,index) in done">
              {{item.id}} {{item.content}}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  export default {
    name: 'draglist',
    data() {
      return {
        dragOptions: {
          animation: 120,
          scroll: true,
          group: 'sortlist',
          ghostClass: 'ghost-style'
        },
        todo: [
          {
            id: 1,
            content: '开发图表组件'
          },
          {
            id: 2,
            content: '开发拖拽组件'
          },
          {
            id: 3,
            content: '开发权限测试组件'
          }
        ],
        doing: [
          {
            id: 1,
            content: '开发登录注册页面'
          },
          {
            id: 2,
            content: '开发头部组件'
          },
          {
            id: 3,
            content: '开发表格相关组件'
          }
        ],
        done: [
          {
            id: 1,
            content: '初始化项目，生成工程目录，完成相关配置'
          },
          {
            id: 2,
            content: '开发项目整体框架'
          },
          {
            id: 3,
            content: '开发表单相关组件'
          }
        ],
        two:[]
      }
    },
    methods: {
      getdata (evt) {
        console.log(evt.draggedContext.element.id)
      },
      datadragEnd(evt){
        console.log('拖动前的索引：' + evt.oldIndex);
        console.log('拖动后的索引：' + evt.newIndex);
      },
      removeHandle(event){
        this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
      }
    },
    components: {
      draggable
    }
  }
</script>
<style scope>
  .drap_ {
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: auto;
  }

  .plugins-tips {
    background-color: #eef1f6;
    padding: 20px 10px;
    box-sizing: border-box;
    margin: 10px 10px 10px 10px;
  }

  .boxWrap {
    padding: 20px;
    width: 33%;
    float: left;
    box-sizing: border-box;
  }

  .drag-box-item {
    background-color: #eff1f5;
    border-radius: 6px;
    border: 1px #e1e4e8;
  }

  .item-title {
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
  }

  .item-ul {
    padding: 0 8px 8px;
    height: 400px;
    overflow-y: scroll;
  }

  .item-ul::-webkit-scrollbar {
    width: 0;
  }

  .drag-list {
    border: 1px #e1e4e8 solid;
    padding: 10px;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border .3s ease-in;
    transition: border .3s ease-in;
  }

  .drag-list:hover {
    border: 1px solid #20a0ff;
  }

  .ghost-style {
    display: block;
    color: transparent;
    border-style: dashed
  }
</style>
