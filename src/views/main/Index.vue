<template>
  <div class="page">
    <div class="vip-title-wrap">
      <span class="item"><i class="vip"></i>菜单</span>
      <span class="item total"></span>
    </div>
    <van-cell class="title-wrap" center title="展开/收起" :border="showBorder">
      <template #right-icon>
        <van-switch v-model="checked" size="24" active-color="#ff7700" @change="onToggleChange" />
      </template>
    </van-cell>
    <van-collapse v-model="activeNames">
      <template v-for="(item,idx) in menuList">
        <van-collapse-item :title="item.name" :name="idx" :key="idx">
          <van-cell-group :border="showBorder">
            <template v-for="(menu,i) in item.list">
              <van-cell :title="menu.name" is-link :to="menu.link" :key="i" />
            </template>
          </van-cell-group>
        </van-collapse-item>
      </template>
    </van-collapse>
  </div>
</template>
<script>
import { CellGroup, Cell, Collapse, CollapseItem, Switch } from 'vant';

export default ({
  name: 'Main',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Switch.name]: Switch
  },
  data() {
    return {
      checked: true,
      showBorder: false,
      activeNames: [],
      menuList: [{
        name: '卡相关',
        list: [{
          name: '过期卡汇总',
          link: '/expire'
        }, {
          name: '发行汇总',
          link: '/publication'
        }, {
          name: '单位卡汇总',
          link: '/company'
        }, {
          name: '卡余额汇总',
          link: '/range'
        }]
      }]
    }
  },
  created() {
    let me = this;
    if (me.menuList.length) {
      me.activeNames = Array.from({
        length: me.menuList.length
      }, (v, k) => k);
    }
  },
  methods: {
    onToggleChange(val) {
      let me = this;

      if (val) {
        if (me.menuList.length) {
          me.activeNames = Array.from({
            length: me.menuList.length
          }, (v, k) => k);
        }
      } else {
        me.activeNames = [];
      }
    }
  }
});

</script>
<style lang="scss">
.vip-title-wrap {
  flex: 1;
  display: flex;
  flex-flow: column;
  padding: 0.625rem 1.0rem;
  color: #333;
  font-size: 0.875rem;
  align-items: center;
  justify-content: center;
}

.range-wrap {
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0.3125rem;

  .van-collapse-item {
    margin-bottom: 0.9375rem;
    border-radius: 0.625rem;
    overflow: hidden;

    .van-collapse-item__title--expanded::after {
      display: none;
    }

    .van-cell--clickable,
    .van-collapse-item__content {
      background: #f5f5f5;
    }
  }

}

</style>
