<template>
    <div class="page">
         <header class="header-bg">
            <p class="title">卡产品发行张数</p>
            <div id="header_wrap" class="count-head text-center">
                <div class="calend-wrap" @click="showYear = !showYear">
                    <div class="left">{{curYear}}</div>
                    <div class="right"><i class="date-icon"></i></div>
                </div>
                <van-popup v-model="showYear" position="bottom">
                    <van-picker title="选择年" show-toolbar :columns="yearColumns" :default-index="defaultYearIdx"
                        @confirm="onConfirm"></van-picker>
                </van-popup>
            </div>
        </header>
        <section class="content">
            <ul class="tab">
                <template v-for="item in tab">
                    <li :key="item">
                        <div class="title" :class="{active:activeTab==item.code}" @click="onTabChange(item.code)">
                            {{item.name}}</div>
                    </li>
                </template>
            </ul>
          <div>
              
          </div>
            <!--  <div class="chart-title">
                <i class="chart-icon"></i>
                <span class="chart-text">点卡过期张数曲线图
                </span>
            </div> -->
            <div>
                
                <v-chart :options="polar"></v-chart>
            </div>
        </section>
    </div>
</template>