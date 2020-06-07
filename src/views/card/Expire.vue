<template>
    <div class="page global" >
       <header class="header-bg">
            <p class="title">卡数据汇总</p>
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
                <template v-for="(item,idx) in tab">
                    <li :key="idx">
                        <div class="title" :class="{active:activeTab==item.code}" @click="onTabChange(item.code)">
                            {{item.name}}</div>
                    </li>
                </template>
            </ul>
            <div class="month-grid">
                <template v-for="(item,idx) in monthData">
                    <div class="item" :class="{active : item.month == curMonth}" @click="chooseMonth(item.month)"
                        :key="idx">
                        <span class="up">{{item.month}}<span class="text">月</span></span>
                        <span class="down">过期：{{item.num}}</span>
                    </div>
                </template>
            </div>
            <div class="calend-title">
                <i class="calend-icon"></i>
                <span class="calend-text">{{curYear}}年{{curMonth}}月
                </span>
            </div>
            <div class="day-grid">
                <template v-for="item in dayList">
                    <div class="item" :class="{active: item.maxNum }">
                        <span class="up">{{item.day}}</span>
                        <span class="down">{{item.num}}</span>
                    </div>
                </template>
            </div>
            <!--  <div class="chart-title">
                <i class="chart-icon"></i>
                <span class="chart-text">点卡过期张数曲线图
                </span>
            </div> -->
            <div>
                <!-- <v-chart :options="polar"></v-chart> -->
            </div>
        </section>
     </div>
</template>

<script src="@assets/js/card/expire.js"></script>
<style lang="scss" src="@assets/styles/card/expire.scss"/>
    

