<template>
    <div class="page">
         <header class="header-bg">
            <p class="title">卡余额汇总</p>
            <div id="header_wrap" class="count-head text-center">
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
            <div class="list">
                <div class="list-title-wrap">
                    <div class="pager-wrap van-hairline--right">
                        <span class="item"><i class="pager"></i>总张数</span>
                        <span class="item total">{{totalNum}}</span>
                    </div>
                    <div class="vip-title-wrap">
                        <span class="item"><i class="vip"></i>总金额</span>
                        <span class="item total">{{totalMoney | fixed2}}</span>
                    </div>
                </div>
                <van-cell class="title-wrap" center title="余额范围"  :border="showBorder">
                    <template #right-icon>
                        <van-switch v-model="checked" size="24" active-color="#ff7700" @change="onToggleChange" />
                    </template>
                </van-cell>
                <van-collapse v-model="activeNames" class="range-wrap" :border="showBorder">
                    <template v-for="(item,idx) in listDetail">
                        <van-collapse-item :title="item.text" :key="idx" :name="idx" >
                            <div class="cloumns">
                                <div class="item"><span>张数:</span><span class="nums">{{item.num}}</span></div>
                                <div class="item"><span>总金额:</span><span class="nums">{{item.money | fixed2}}</span></div>
                            </div>
                        </van-collapse-item>
                    </template>
                </van-collapse>
            </div>
        </section>
    </div>
</template>

<script src="@assets/js/card/range.js"></script>
<style lang="scss" src="@assets/styles/card/range.scss"/>