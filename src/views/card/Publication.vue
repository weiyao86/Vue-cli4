<template>
    <div class="page">
          <header class="header-bg">
            <p class="title">卡产品发行张数</p>
            <div id="header_wrap" class="count-head text-center">
                <div class="calend-wrap" @click="showYear = !showYear">
                    <div class="left">{{curDateTime}}</div>
                    <div class="right"><i class="date-icon"></i></div>
                </div>
                <van-popup v-model="showYear" position="bottom">
                    <van-datetime-picker v-model="curDate" type="date" title="选择年月日" @confirm="onConfirm">
                    </van-datetime-picker>
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
            <div class="p-total"><span class="title">发行张数汇总:</span><span>{{totalCardNum}}</span> </div>
                    <div class="list-detail-grid">
                        <template v-for="(item,idx) in listDetail">
                            <div class="item" :key="idx" :class="{'no-bottom-line':item.noLine}">
                                <span class="up">较上日<span class="text">{{calcNum(item.dayNum,item.yesNum)}}</span></span>
                                <span class="middle">{{item.dayNum}}</span>
                                <span class="down">{{item.name}}</span>
                            </div>
                        </template>
                </div>
        </section>
    </div>
</template>

<script src="@assets/js/card/publication.js"></script>
<style lang="scss" src="@assets/styles/card/publication.scss"/>