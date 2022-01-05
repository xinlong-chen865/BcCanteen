<template>
    <div class="info">
        <van-nav-bar
            title="个人信息"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                label="联系人电话"
                placeholder="联系人电话"
                :rules="[{ required: true, message: '请填写联系人电话' }]"
            />
            <van-field
                v-model="address"
                name="address"
                label="收货地址"
                placeholder="收货地址"
                :rules="[{ required: true, message: '请填写收货地址' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import { GetInfo, UpdateInfo } from '@/api/info'
import Vue from 'vue';
import { Toast } from "vant";
import { Form } from 'vant';
import { Field } from 'vant';

Vue.use(Form);
Vue.use(Field);

export default {
    data() {
        return {
            phone: '',
            address: '',
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        async onSubmit(values) {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            values['phone'] = Number(values['phone'])
            values['id'] = userInfo && userInfo.id
            await UpdateInfo(values);
            if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
            }
            Toast.success('编辑成功')
        },
        async initInput() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const { data } = await GetInfo({id: userInfo && userInfo.id})
            this.phone = data.data.phone
            this.address = data.data.address
        }
    },
    async created() {
        await this.initInput()
    }
}
</script>