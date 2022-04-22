<template>
  <div id="app">
    <van-popup class="popup" v-model="isShowNewUserProfile" @click-overlay="handleOverlay" :style="{ height: '30%', width: '70%' }">
      <p class="title">请选择感兴趣的类型</p>
      <div v-if="state.step === 1">
        <van-checkbox-group v-model="state.firstRes" direction="horizontal" :max="3">
          <van-checkbox class="checkbox" name="1">快餐</van-checkbox>
          <van-checkbox class="checkbox"  name="2">面条</van-checkbox>
          <van-checkbox class="checkbox"  name="3">辣椒</van-checkbox>
          <van-checkbox class="checkbox"  name="4">汉堡</van-checkbox>
          <van-checkbox class="checkbox"  name="5">烧烤</van-checkbox>
          <van-checkbox class="checkbox"  name="6">西餐</van-checkbox>
          <van-checkbox class="checkbox"  name="7">粥汤</van-checkbox>
          <van-checkbox class="checkbox"  name="8">水饺</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="second" v-else>
        <div class="second_row">
          <span>价格优惠：</span>
          <van-rate v-model="state.secondRes.price" icon="like" void-icon="like-o" />
        </div>
        <div class="second_row">
          <span>种类丰富：</span>
          <van-rate v-model="state.secondRes.category" icon="like" void-icon="like-o" />
        </div>
        <div class="second_row">
          <span>菜品味道：</span>
          <van-rate v-model="state.secondRes.taste" icon="like" void-icon="like-o" />
        </div>
      </div>
      <div class="bottom">
        <van-button type="info" @click="handleClick">
          {{ state.step === 1 ? '下一步' : '完成' }}
        </van-button>
      </div>
    </van-popup>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { PayingConfirm } from './api/goods';
import { GetChooseUserProfile, UpdateChooseUserProfile } from './api/main';
import { Toast, Popup, Checkbox, CheckboxGroup } from 'vant';

Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  async mounted() {
    await this.watchUrlParams();
    await this.handleUserProfile();
  },
  data() {
    return {
      state: {
        firstRes: [],
        secondRes: {
          price: 0,
          category: 0,
          taste: 0,
        },
        step: 1,
      },

    };
  },
  computed: {
    ...mapState(['isShowNewUserProfile']),
    userId() {
      if (localStorage.getItem('userInfo')) {
        let user_id = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id;
        return user_id;
      } else {
        return null;
      }
    }
  },
  methods: {
    ...mapActions(['handleUserProfile']),
    // 处理购买是否成功
    async watchUrlParams() {
      if (
        this.$router.currentRoute.query.method === 'alipay.trade.page.pay.return' &&
        this.$router.currentRoute.query.out_trade_no
      ) {
        const id = this.$router.currentRoute.query.out_trade_no;
        const result = await PayingConfirm({
          id
        });
        if (result.code === 200) {
          Toast.success(result.message);
        }
      }
    },
    // async handleUserProfile() {
    //   await this.$store.dispatch('handleUserProfile');
    //   if (this.userId) {
    //     try {
    //       const { data } = await GetChooseUserProfile({ userId: this.userId});
    //       if (data.data.isChoose) {
    //         this.$store.commit('update', { isShowNewUserProfile: false });
    //       } else {
    //         this.$store.commit('update', { isShowNewUserProfile: true });
    //       }
    //     } catch (error) {
    //       this.$store.commit('update', { isShowNewUserProfile: false });
    //     }
    //   }
    // },
    handleClick() {
      if (this.state.step === 1) {
        if (this.state.firstRes.length !== 0) {
          this.state.step = 2;
        }
      } else {
        const hobby_vector_id = this.state.secondRes.price + this.state.secondRes.category * 5 + this.state.secondRes.taste * 10;
        UpdateChooseUserProfile({
          userId: this.userId,
          hobby_category_id: this.state.firstRes.join(','),
          hobby_vector_id,
        });
        this.$store.commit('update', { isShowNewUserProfile: false });
      }
    },
    handleOverlay() {
      this.$store.commit('update', { isShowNewUserProfile: false });
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.popup {
  position: relative;
  .title {
    text-align: center;
  }
  .checkbox {
    margin: 10px !important
  }
  .bottom {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .second {
    width: 100%;
    margin-top: 20px;
    &_row {
      display: flex;
      justify-content: center;
      margin: 20px 0px;
    }
  }
}

</style>
