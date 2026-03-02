<template>
    <view class="actAdmin">
        <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx"
            rightWidth="174rpx" left-icon="back" @clickLeft="onBack" />
        <view class="table-container">
            <view class="table-header">
                <view class="th item-index">序号</view>
                <view class="th item-name">姓名</view>
                <view class="th item-action">核销状态</view>
                <view class="th item-action" v-for="(item, index) in custom_form" :key="index">{{ item.label }}</view>
            </view>
            <view class="table-body" v-if="state.list.length > 0">
                <view class="tr" v-for="(item, index) in state.list" :key="item.id">
                    <view class="td item-index">{{ index + 1 }}</view>
                    <view class="td item-name">{{ item.user || '未授权用户' }}</view>
                    <view class="td item-action">
                        <view class="btn hexiao-btn" v-if="item.verify_status == 0" @tap="onHexiao(item)">核销</view>
                        <view class="verified-text" v-else>已核销</view>
                    </view>
                    <view class="td item-action" v-for="(it, index) in JSON.parse(item.form_data)" :key="index">{{
                        it.value
                        }}</view>
                </view>
            </view>
        </view>
        <empty v-if="state.list.length == 0 && state.islock" text="暂无报名人员"></empty>
    </view>
</template>

<script>
import commonList from '../mix/commonList.vue'

export default {
    mixins: [commonList],
    data() {
        return {
            title: '报名人员管理',
            id: 0,
            custom_form: []
        }
    },
    onLoad(options) {
        this.id = options.id;
        if (!this.id) {
            uni.showToast({ title: '参数错误', icon: 'none' });
            setTimeout(() => { uni.navigateBack(); }, 1500);
            return;
        }
        this.$api.actDetail({
            id: this.id
        }).then(res => {
            console.log(res)
            this.custom_form = res.custom_form;
        })
        this.reset();
    },
    methods: {
        commonListApi() {
            return this.$api.actAdminListLoad({ id: this.id });
        },
        onBack() {
            uni.navigateBack();
        },
        onHexiao(item) {
            uni.showModal({
                title: '核销确认',
                content: `确认核销用户 ${item.user || '未授权用户'} 的报名资格吗？`,
                success: (res) => {
                    if (res.confirm) {
                        this.$api.actAdminHexiao({ rid: item.id }).then(res => {
                            uni.showToast({ title: '核销成功', icon: 'success' });
                            item.verify_status = 1;
                            item.verify_name = '已核销';
                        }).catch(err => {
                            uni.showToast({ title: err.msg || '核销失败', icon: 'none' });
                        });
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss">
.actAdmin {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20rpx 0;

    .table-container {
        background: #fff;
        border-radius: 10rpx;
        overflow: hidden;
    }

    .table-header {
        display: flex;
        background-color: #eaf8ff;
        border-bottom: 2rpx solid #ebebeb;

        .th {
            padding: 24rpx 0;
            text-align: center;
            font-size: 28rpx;
            color: #333;
            font-weight: bold;
            border-right: 2rpx solid #ebebeb;

            &:last-child {
                border-right: none;
            }
        }
    }

    .table-body {
        .tr {
            display: flex;
            align-items: center;
            border-bottom: 2rpx solid #ebebeb;

            &:last-child {
                border-bottom: none;
            }
        }

        .td {
            padding: 24rpx 0;
            text-align: center;
            font-size: 28rpx;
            color: #333;
            border-right: 2rpx solid #ebebeb;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:last-child {
                border-right: none;
            }
        }
    }

    .item-index {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-name {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-action {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;

        .hexiao-btn {
            background: #008800; // green button
            color: #fff;
            font-size: 28rpx;
            height: 60rpx;
            line-height: 60rpx;
            width: 80%;
            border-radius: 10rpx;
            text-align: center;
        }

        .verified-text {
            color: #999;
            font-size: 28rpx;
            background: #f0f0f0;
            height: 60rpx;
            line-height: 60rpx;
            width: 80%;
            border-radius: 10rpx;
            text-align: center;
        }
    }
}
</style>
