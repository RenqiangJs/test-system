<template>
  <div id="guide" class="menu" :style="{
    width: '200px'
  }">
    <div class="logo">
      <el-image style="width: 160px; height: 180px"
        src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg" :zoom-rate="1.2" :max-scale="7"
        :min-scale="0.2" :initial-index="4" fit="cover" />
      <p>周润发</p>
    </div>
    <el-scrollbar>
      <div style="height: 100%">
        <div class="testModule">
          <h3 class="moduleName">网店装修</h3>
          <div class="moduleStep">
            <div class="step">
              <span>店铺开设</span>
              <div class="step-line"></div>
            </div>
            <div class="step">
              <span>装修设计</span>
              <div class="step-line"></div>
            </div>
            <div class="step">
              <span>商品分类设置</span>
              <div class="step-line"></div>
            </div>
            <div class="step">
              <span>商品详情设计</span>
              <div class="step-line"></div>
            </div>
            <div class="step">
              <span>商品管理</span>
            </div>
          </div>
        </div>
        <div class="testModule">
          <h3 class="moduleName">网店推广</h3>
          <div class="moduleStep">
            <div class="step hasMarket">
              <span>微博营销</span>
              <div class="market">
                <span class="market-step">注册</span>
                <span class="market-step">企业认证</span>
                <span class="market-step">个人主页管理</span>
                <span class="market-step">发布微博</span>
                <span class="market-step">评论互动</span>
                <span class="market-step">粉丝服务</span>
                <span class="market-step">营销推广</span>
              </div>
              <div class="step-line"></div>
            </div>
            <div class="step">
              <span>微信营销</span>
            </div>
          </div>
        </div>
        <div class="testModule">
          <h3 class="moduleName">店铺运营</h3>
          <div class="moduleStep">
            <div class="step">
              <span>客服平台</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 18px 0;
  height: 100vh;
  background-color: #afdfe4;
  box-sizing: border-box;

  .logo {
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    text-align: center;
  }

  :deep(.el-scrollbar) {
    flex-grow: 1;
    padding-bottom: 40px;
  }

  .testModule {
    padding: 0 10px;

    .moduleName {
      font-size: 18px;
      padding-left: 18px;
    }

    .moduleStep {
      display: flex;
      flex-direction: column;
      font-size: 14px;

      .step {
        position: relative;
        flex-grow: 0;
        border-radius: 22px;
        color: #fff;
        background-color: #009ad6;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
        &.hasMarket{
          margin-bottom: 240px;
          .step-line {
            height: 240px;
            bottom: -240px;
          }
        }
        .market{
          display: flex;
          flex-direction: column;
          position: absolute;
          right: 30px;
          bottom: -230px;
          .market-step{
            padding: 8px;
            color: #fdb933;
            line-height: 16px;
          }
        }
        .step-line {
          position: absolute;
          right: 18px;
          bottom: -30px;
          width: 2px;
          height: 30px;
          background-color: #fff;

        }
      }
    }
  }
}
</style>
