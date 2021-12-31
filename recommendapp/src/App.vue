<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { PayingConfirm } from './api/goods';
import { Toast } from 'vant';
import socket from '@/utils/socket'

export default {
  mounted() {
    this.watchUrlParams();
  },
  methods: {
    // 处理购买是否成功
    async watchUrlParams() {
      if (
        this.$router.currentRoute.query.method === 'alipay.trade.page.pay.return' &&
        this.$router.currentRoute.query.out_trade_no
      ) {
        const id = this.$router.currentRoute.query.out_trade_no;
        socket.emit('paycomplete', id);
        const result = await PayingConfirm({
          id
        });
        if (result.code === 200) {
          Toast.success(result.message);
        }
      }
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
