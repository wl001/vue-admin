<template>
    <div class="container" ref="parentH">
      <!--工具条-->
      <el-col :span="24" class="toolbar" ref="toolbarTop" style="padding-bottom: 0;padding-left: 30px">
        <el-form :inline="true" :model="filters" size="mini">
          <el-form-item>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
              <el-option key="1" label="广东省" value="广东省"></el-option>
              <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
          <el-button @click="Refresh" style="float: right;margin-right: 20px" type="primary" size="mini" icon="el-icon-refresh"></el-button>
        </el-form>
      </el-col>


      <!--列表-->
      <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :height="height_" size="mini" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable>
        </el-table-column>
        <el-table-column prop="birth" label="生日" width="120" sortable>
        </el-table-column>
        <el-table-column prop="addr" label="地址" min-width="180" sortable>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" size="mini">批量删除</el-button>
        <el-pagination background layout="jumper,prev, pager, next,total" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form size="mini" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click.native="editFormVisible = false">取消</el-button>
          <el-button size="mini" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form size="mini" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="addForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <template slot-scope="scope">
            <el-button size="mini" @click.native="cancledialog('addForm')">取消</el-button>
            <el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
          </template>

        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import util from '../../common/js/util'
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
  export default {
    data(){
        return {
          filters: {
            name: '',
          },
          select_cate: '',
          users: [],
          total: 0,
          page: 1,
          listLoading: false,
          sels: [],//列表选中列

          editFormVisible: false,//编辑界面是否显示
          editLoading: false,
          editFormRules: {//表单校验
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          //编辑界面数据
          editForm: {
            id: 0,
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            addr: ''
          },

          addFormVisible: false,//新增界面是否显示
          addLoading: false,
          addFormRules: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          //新增界面数据
          addForm: {
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            addr: ''
          }
        }
    },
    created(){//初始化表格数据
      this.getUsers()
    },
      mounted(){

    },
    computed:{
      height_(){
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return wh -168 +'px'
      }
    },
    methods: {
      cancledialog(formName){
          this.addFormVisible = false
         //取消关闭dialog关闭后清除验证条件
          this.$refs[formName].resetFields();
        },
       //性别显示转换
       formatSex: function (row, column) {
         return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
       },
      handleCurrentChange(val) {//表格当前页触发数据
        this.page = val;
        this.getUsers();
      },
      Refresh(){//刷新
        this.filters.name = ''
        this.getUsers()
      },
      getUsers() {//获取表格数据
        let para = {
          page: this.page,
          name: this.filters.name,
          select: this.select_cate
        };
        this.listLoading = true;
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.users;
          this.listLoading = false;
        });
      },
      //选择表格列的时候会把数据放到一个数组里 多选
      selsChange: function (sels) {
        this.sels = sels;
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      batchRemove(){//批量删除
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      }
     },
     components: {}
    };
</script>
<style scoped>
 .container{
   height:100%;
   border:1px solid #F3F2F0;
   overflow-y: auto;
 }
 .toolbar {
   background: #f2f2f2;
   height: 50px;
   padding-top: 10px;
 }
</style>
