<template>
  <el-row class="ms-wrap">
    <el-col :span="19" class="first-row-style border-right-style padding-right-big-style">
      <div class="left-line-style display-inline-style title-row-style font-weight-style big-font-size">
        数据源列表
      </div>
      <el-input
        size="mini"
        class="margin-right-mini-style"
        placeholder="搜索全部资源"
        suffix-icon="el-icon-search"
        v-model="keyword.data_name">
      </el-input>
      <el-select size="mini" clearable v-model="keyword.data_type" placeholder="全部">
        <el-option
          v-for="typeItem in typeItems"
          :key="typeItem.value"
          :label="typeItem.label"
          :value="typeItem.value">
        </el-option>
      </el-select>
      <div class="right-float-style">
        <el-button type="primary" plain size="mini" icon="el-icon-plus" class="button-style">添加数据源</el-button>
        <el-button type="primary" plain size="mini" icon="el-icon-delete" class="button-style" @click="deleteCheck">删除</el-button>
      </div>
      <div class="clear-float"></div>
    </el-col>
    <el-col :span="5" class="first-row-style abort-msg-style padding-left-big-style font-weight-style big-font-size">
      相关信息
    </el-col>
    <el-col :span="19">
      <el-row class="list-title-font-style list-title-border-style">
        <el-col :span="3">
          <el-checkbox v-model="checkedAll" @change="checkAllChange">全选</el-checkbox>
        </el-col>
        <el-col :span="18">数据库名称 / 类型 / 描述</el-col>
        <el-col :span="3">创建者</el-col>
      </el-row>
      <div class="list-body">
        <el-row class="list-body-simple verticle-center-style" v-for="listItem in listData" :key="listItem.id">
          <el-col :span="3">
            <el-checkbox v-model="listItem.checked" @change="checkSimple(listItem)"></el-checkbox>
            <ch-icon type="MySQL-" class="my-icon-wrap" v-if="listItem.type === 'MySQL'"></ch-icon>
            <ch-icon type="shujulianjie-oracle" class="my-icon-wrap" v-else-if="listItem.type === 'ORACLE'"></ch-icon>
            <ch-icon type="shujulianjie-excel" class="my-icon-wrap" v-else-if="listItem.type === 'EXCEL'"></ch-icon>
            <ch-icon type="Hive" class="my-icon-wrap" v-else-if="listItem.type === 'Hive'"></ch-icon>
          </el-col>
          <el-col :span="16">
            <div class="big-font-size font-weight-style">{{listItem.name}}</div>
            <p class="abort-msg-detail-simple" style="margin-bottom: 0;">数据库类型： {{listItem.type}} &nbsp;&nbsp;|&nbsp;&nbsp; {{listItem.time}}</p>
          </el-col>
          <el-col :span="5" style="text-align: center;">
            <el-avatar :src="listItem.user_img" v-if="listItem.user_img"></el-avatar>
            <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
            <p class="abort-msg-detail-simple" style="margin-bottom: 0;">{{listItem.user_name}}</p>
          </el-col>
          <div class="star-wrap cursor-pointer-style" :class="{'active-star': listItem.collection}" :title="listItem.collection ? '取消收藏' : '收藏'" @click="collection(listItem)">
            <i class="el-icon-star-on"></i>
          </div>
        </el-row>
      </div>
    </el-col>
    <el-col :span="5" class="padding-left-big-style right-bottom-wrap">
      <div class="list-title-font-style"><span>关于</span> <i class="el-icon-edit"></i></div>
      <p class="abort-msg-detail-simple">数据源_1</p>
      <div class="list-title-font-style"><span>数据源类型</span></div>
      <p class="abort-msg-detail-simple">MYSQL</p>
      <div class="list-title-font-style"><span>地址</span></div>
      <p class="abort-msg-detail-simple">127.0.1.0.3006</p>
      <div class="list-title-font-style"><span>数据库</span></div>
      <p class="abort-msg-detail-simple">test 1</p>
      <div class="list-title-font-style"><span>描述</span></div>
      <p class="abort-msg-detail-simple">THERE WERE TEARS ON OUR FACES. AND LETTING GO OF SOME THING SPECIAL. SO WE'LL NEVER HAVE AGAIN.</p>
    </el-col>
  </el-row>
</template>

<script>
import { post, get } from '../utils/http'

/**
   * 查询参数
   */
class SearchParam {
  data_name = ''
  data_type = null
}

export default {
  name: 'MsDemo',
  data () {
    return {
      keyword: new SearchParam(),
      typeItems: [
        {
          label: 'MYSQL',
          value: 1
        },
        {
          label: 'ORACLE',
          value: 2
        },
        {
          label: 'EXCEL',
          value: 3
        },
        {
          label: 'HIVE',
          value: 4
        }
      ],
      checkedAll: false,
      checkedSimple: false,
      listData: [],
      getListDataApi: '/list',
      collectionDataApi: '/collection',
      deleteDataApi: '/delete'
    }
  },
  methods: {
    getListData (keyword) {
      get(this.getListDataApi, {}, (data) => {
        console.log(data)
        data.data.map((v)=>{
          v.checked = false
        })
        this.listData = data.data
      },
      (error) => {

      })
    },
    collection (item) {
      post(this.collectionDataApi, {
        id: item.id
      }, (data) => {
        console.log(data)
        data.data.map((v)=>{
          v.checked = false
        })
        this.listData = data.data
        this.$message({
          type: 'success',
          message: item.collection ? '取消收藏成功!' : '收藏成功!'
        });
      },
      (error) => {

      })
    },
    deleteData () {
      let deleteDatas = this.listData.filter(o => o.checked).map(o => o.id)
      post(this.deleteDataApi, {
        ids: deleteDatas
      }, (data) => {
        data.data.map((v)=>{
          v.checked = false
        })
        this.listData = data.data
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      },
      (error) => {

      })
    },
    deleteCheck () {
      this.$confirm('确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData()
      }).catch(() => {

      });
    },
    checkSimple (item) {
      console.log(item.checked)
      if (item.checked === true) {
        let checkedArr = this.listData.filter((v)=>{
          return v.checked === true
        })
        if (checkedArr.length === this.listData.length) {
          this.checkedAll = true
        }
      } else {
        this.checkedAll = false
      }
    },
    checkAllChange (val) {
      if(val === true) {
        this.listData.map((v)=>{
          v.checked = true
        })
      } else {
        this.listData.map((v)=>{
          v.checked = false
        })
      }
    }
  },
  mounted () {
    this.getListData(this.keyword)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-line-style{
  border-left: 2px solid #7182D9;
  padding-left: 8px;;
}
.display-inline-style{
  display: inline-block;
}
.margin-right-mini-style{
  margin-right: 10px;
}
.border-right-style{
  border-right: 1px solid #eee;
}
.right-float-style{
  float: right;
}
.clear-float{
  clear: both;
}
.padding-left-big-style{
  padding-left: 20px !important;
}
.padding-right-big-style{
  padding-right: 20px !important;
}
.font-weight-style{
  font-weight: bold;
}
.verticle-center-style{
  display: flex;
  align-items: center;
}

.first-row-style{
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  padding-top: 2px;
  height: 40px;
}
.ms-wrap {
  min-width: 1366px;
  max-width: 1680px;
  padding: 10px;
  margin: 0 auto !important;
}
.ms-wrap .el-input,.ms-wrap .el-select{
  width: 150px;
}
.title-row-style{
  margin-right: 20px;
}
.button-style{
  width: 120px;
  border-color: #7182D9;
  color: #7182D9;
  background-color: #fff;
}
.abort-msg-style{
  line-height: 28px;
}
.big-font-size{
  font-size: 16px;;
}
.cursor-pointer-style{
  cursor: pointer;
}

/*list*/
.list-title-font-style *{
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.list-title-border-style{
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  height: 40px;
  line-height: 40px;
  padding: 0 26px;
}
.list-body{
  padding: 14px;
  padding-left: 6px;
  background-color: #F9F6FA;
}
.list-body-simple{
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 0px #eee;
  overflow: hidden;
}
.list-body-simple:last-child{
  margin-bottom: 0;
}
.list-body-simple p{
  color: #ccc;
}
.my-icon-wrap{
  margin-left: 10px;
}
.star-wrap{
  background-color: #ccc;
  width: 36px;
  height: 36px;
  border-radius: 0 0 0 100%;
  text-align: right;
  line-height: 34px;
  position: absolute;
  right: 0;
  top: 0;
}
/* .star-wrap:hover{
  background-color: #546AFE;
} */
.star-wrap.active-star{
  background-color: #546AFE;
}
.star-wrap i{
  font-size: 24px;
  margin-right: 2px;
  color: #fff;
}

/*右侧内容*/
.right-bottom-wrap{
  padding-top: 14px;
}
p.abort-msg-detail-simple{
  margin-top: 4px;
  font-size: 12px;
  line-height: 20px;
}
</style>
