<template>
  <div>
    <Card>
      <tables ref="tables1" :loading="loading1" editable v-model="tableData1" :columns="columns1"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel1">导出为Csv文件</Button>
      <Button style="margin: 10px 5px;" type="primary" @click="search1">刷新</Button>
      <div>用户总计：{{ total }}个</div>
    </Card>
    <Card>
      <tables ref="tables2" :loading="loading2" editable searchable search-place="top" v-model="tableData2" :columns="columns2" @on-search="search2"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel2">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserInfoData, getUserOpenidList } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      loading1: false,
      loading2: false,
      columns1: [
        {title: 'openid', key: 'openid', editable: false}
      ],
      tableData1: [],
      total: '',
      columns2: [
        // {title: 'subscribe', key: 'subscribe', sortable: true},
        {title: 'openid', key: 'openid', editable: false},
        {title: 'nickname', key: 'nickname'},
        // {title: 'sex', key: 'sex'},
        // {title: 'language', key: 'language'},
        {title: 'country', key: 'country'},
        {title: 'province', key: 'province'},
        {title: 'city', key: 'city'},
        {title: 'headimgurl', key: 'headimgurl'},
        {title: 'subscribe_time', key: 'subscribe_time'}
        // {title: 'remark', key: 'remark'},
        // {title: 'groupid', key: 'groupid'}
        // {title: 'tagid_list', key: 'tagid_list'},
        // {title: 'subscribe_scene', key: 'subscribe_scene'},
        // {title: 'qr_scene', key: 'qr_scene'},
        // {title: 'qr_scene_str', key: 'qr_scene_str'}
      ],
      tableData2: []
    }
  },
  methods: {
    search1 () {
      this.loading1 = true
      getUserOpenidList().then(res => {
        this.loading1 = false
        // console.log(res)
        const arr = []
        const backData = res.data.return_data.data.openid
        this.total = res.data.return_data.total
        backData.forEach(item => {
          arr.push({'openid': item})
        })
        this.tableData1 = arr
      })
    },
    search2 (e) {
      this.loading2 = true
      getUserInfoData({openid: e}).then(res => {
      // console.log(res)
        this.loading2 = false
        const arr = []
        arr.push(res.data.return_data)
        this.tableData2 = arr
      })
    },
    exportExcel1 () {
      this.$refs.tables1.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    exportExcel2 () {
      this.$refs.tables2.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    this.search1()
  }
}
</script>

<style>

</style>
