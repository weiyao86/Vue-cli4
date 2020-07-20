<template>
  <div class="page company">
    <nav-bar>
    </nav-bar>
    <header class="header-bg">
      <!-- <p class="title">单位卡汇总</p> -->
      <div id="header_wrap" class="header-wrap text-center">
        <div class="search-wrap">
          <div class="left"><i class="search-icon"></i></div>
          <div class="middle">
            <input type="text" class="search-text" placeholder="输入需要查询的单位" v-model="searchText" />
          </div>
          <div class="right"><button class="search-btn" @click="onSearch">搜索</button></div>
        </div>
      </div>
    </header>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="content paddingBottom">
      <ul id="ul_wrap" class="detail-wrap">
        <template v-for="(item,idx) in listDetail">
          <li class="item" :key="idx">
            <div class="title"><i class="icon-company"></i><span class="sub-title line2-ellipsis">{{item.name}}</span></div>
            <div class="card-detail">
              <div class="icon-wrap"><i class="icon-check"></i></div>
              <div class="card-content">
                <div class="top-wrap line-ellipsis"><span class="label">点卡: </span><span class="label-text">{{item.dian_total}}</span></div>
                <div class="bottom-wrap">
                  <div class="left line-ellipsis"><span class="label">总金额: </span><span class="label-text">{{item.dian_money}}</span> </div>
                  <div class="right line-ellipsis"><span>余额: </span><span class="label-text">{{item.dian_balance}}</span> </div>
                </div>
              </div>
              <div class="card-unit">
                <span>张</span>
                <span>点</span>
              </div>
            </div>
            <div class="card-detail">
              <div class="icon-wrap"><i class="icon-check"></i></div>
              <div class="card-content">
                <div class="top-wrap line-ellipsis"><span class="label">次卡: </span><span class="label-text">{{item.ci_total}}</span></div>
                <div class="bottom-wrap">
                  <div class="left line-ellipsis"><span class="label">总金额: </span><span class="label-text">{{item.ci_money}}</span> </div>
                  <div class="right line-ellipsis"><span>余额: </span><span class="label-text">{{item.ci_balance}}</span> </div>
                </div>
              </div>
              <div class="card-unit">
                <span>张</span>
                <span>次</span>
              </div>
            </div>
            <div class="card-detail">
              <div class="icon-wrap"><i class="icon-check"></i></div>
              <div class="card-content expire-content line-ellipsis">
                <div class="top-wrap"><span class="label">过期卡: </span><span class="label-text">{{(+item.dian_over) + (+item.ci_over)}}</span></div>
              </div>
              <div class="card-unit">
                <span>张</span>
              </div>
            </div>
            <div class="wave-bg"></div>
          </li>
        </template>
      </ul>
    </mescroll-vue>
  </div>
</template>
<script src="@assets/js/card/company.js"></script>
<style lang="scss" src="@assets/styles/card/company.scss" />
