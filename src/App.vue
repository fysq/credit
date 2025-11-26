<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // 用户版本更新
      if (uni.canIUse("getUpdateManager")) {
        let updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
          // 请求完新版本信息的回调
          //console.log(res.hasUpdate);
        })
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              } else if (res.cancel) {
                return false;
              }
            }
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          uni.hideLoading();
          uni.showModal({
            title: '升级失败',
            content: '新版本下载失败，请检查网络！',
            showCancel: false
          });
        });
      }
      this.$store.dispatch('getUserInfo').then(res => {})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import './style/animate.min.css';
  @import './style/main.scss';

</style>
