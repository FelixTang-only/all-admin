<template>
  <div>
    <Input
      style="width: 200px;margin-bottom:20px"
      search
      v-model="userName"
      @on-search="search"
      enter-button
      placeholder="输入用户名"
    />
    <Tables
      style="margin-bottom:20px"
      :editable="true"
      border
      :loading="loading"
      :columns="columns7"
      v-model="data6"
      @on-delete="handleDelete"
      @on-save-edit="saveEdit"
    ></Tables>
    <!-- <Page
      :current="page"
      :total="Recordcount"
      @on-change="gogo"
      @on-page-size-change="change"
      show-elevator
      show-sizer
    /> -->
  </div>
</template>
<script>
import { getGzhUserInfoData, updateGzhUser } from '@/api/data'
import Tables from '_c/tables'

export default {
  components: {
    Tables
  },
  data () {
    return {
      userName: '',
      loading: false,
      page: 1,
      Recordcount: 20,
      columns7: [
        {
          title: 'Name',
          key: 'userName',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.userName)
            ])
          }
        },
        {
          title: 'EmailAddress',
          key: 'email'
        },
        {
          title: 'LikeMovie',
          key: 'likeMovie'
        },
        {
          title: 'Movies',
          key: 'movies',
          editable: true
        },
        {
          title: 'Money',
          key: 'money',
          editable: true
        },
        {
          title: 'LoginTime',
          key: 'loginTime',
          render: (h, params) => {
            return h('div', this.formatDate(new Date(Number(this.data6[params.index].loginTime))))
          }
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   width: 150,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'primary',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px'
        //           },
        //           on: {
        //             click: () => {
        //               this.show(params.index)
        //             }
        //           }
        //         },
        //         '内容'
        //       ),
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'error',
        //             size: 'small'
        //           },
        //           on: {
        //             click: () => {
        //               this.remove(params.index)
        //             }
        //           }
        //         },
        //         '删除'
        //       )
        //     ])
        //   }
        // }
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '删除')
              ])
            }
          ]
        }
      ],
      data6: [
        {
          userName: 'John Brown',
          phone: 18,
          email: 'New York No. 1 Lake Park',
          likeMovie: '红海行动',
          money: 2000,
          loginTime: 1545053153723
        },
        {
          userName: 'Jim Green',
          phone: 24,
          email: 'London No. 1 Lake Park',
          likeMovie: '红海行动',
          money: 2000,
          loginTime: 1545053153723
        },
        {
          userName: 'Joe Black',
          phone: 30,
          email: 'Sydney No. 1 Lake Park',
          likeMovie: '红海行动',
          money: 2000,
          loginTime: 1545053153723
        },
        {
          userName: 'Jon Snow',
          phone: 26,
          email: 'Ottawa No. 2 Lake Park',
          likeMovie: '红海行动',
          money: 2000,
          loginTime: 1545053153723
        }
      ]
    }
  },
  created () {
    this.loading = true
    getGzhUserInfoData({}).then(res => {
      if (res.status === 200) {
        this.loading = false
        this.data6 = res.data
      }
      // console.log(res)
    })
  },
  methods: {
    handleDelete (params) {
      this.loading = true
      const data = {
        key: params.column.key,
        userName: params.row.userName
      }
      updateGzhUser(data).then(res => {
        if (res.status === 200) {
          this.loading = false
          // this.data6 = res.data
        }
      })
    },
    saveEdit (r) {
      // console.log(r)
      this.loading = true
      const data = {
        key: r.column.key,
        userName: r.row.userName,
        value: r.value
      }
      updateGzhUser(data).then(res => {
        if (res.status === 200) {
          this.loading = false
          // this.data6 = res.data
        }
      })
    },
    search () {
      this.loading = true
      getGzhUserInfoData({userName: this.userName}).then(res => {
        if (res.status === 200) {
          this.loading = false
          this.data6 = res.data
        }
        // console.log(res)
      })
    },
    gogo (e) {
      console.log(e)
    },
    change (e) {
      console.log(e)
    },
    show (index) {
      this.$Modal.info({
        title: '用户信息',
        content: `Name：${this.data6[index].userName}<br>
        Email：${this.data6[index].email}<br>
        LikeMovie: ${this.data6[index].likeMovie}<br>
        LoginTime: ${this.formatDate(new Date(Number(this.data6[index].loginTime)))}<br>
        Money: ${this.data6[index].money}
        `
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    formatDate (date) {
      // console.log(date)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    }
  }
}
</script>
