<template>
    <div id="home">
       <div class="test-header" v-loading.fullscreen.lock="loading">
           <p class="header">危机指数</p>
           <el-progress 
                type="circle" 
                :width='200' 
                :stroke-width='10' 
                :color="healthStatus(riskNumSet.mutiple.number).color" 
                :percentage="riskNum"
                status="text">
                <div class="circle-text">
                    <div class="circle-text-container">
                        <p class="num">{{ riskNum }}</p>
                        <p class="tip">{{ healthStatus(riskNumSet.mutiple.number).tip }}</p>
                        <el-button size="mini" round @click="$_getRiskNum">健康检测</el-button>
                    </div>
                </div>
            </el-progress>
       </div>
       <div class="test-container">
           <div class="test-item">
               <el-progress 
                    type="circle" 
                    :width='60' 
                    :stroke-width='6' 
                    :color="healthStatus(riskNumSet.bloodSugar.number).color" 
                    :percentage="riskNum_sugar"
                    status="text">
                    <p style="font-size: 20px">
                        {{ riskNum_sugar }}
                    </p>
                </el-progress>
                <div class="item-text">
                    <div class="header">血糖危机指数</div>
                    <div class="footer">7777777777777777777777777777777777777</div>
                </div>
           </div>
           <div class="test-item">
               <el-progress 
                    type="circle" 
                    :width='60' 
                    :stroke-width='6' 
                    :color="healthStatus(riskNumSet.bloodPressure.number).color" 
                    :percentage="riskNum_pressure"
                    status="text">
                    <p style="font-size: 20px">
                        {{ riskNum_pressure }}
                    </p>
                </el-progress>
                <div class="item-text">
                    <div class="header">血压危机指数</div>
                    <!-- <div class="line"></div> -->
                    <div class="footer">7777777777777777777777777777777777777</div>
                </div>
           </div>
       </div>
       
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                riskNumSet: {
                    mutiple: {
                        number: 0,
                        tweenedNumber: 0,
                    },
                    bloodSugar: {
                        number: 0,
                        tweenedNumber: 0,
                    },
                    bloodPressure: {
                        number: 0,
                        tweenedNumber: 0,
                    },
                },
                loading: false,
            }
        },
        created: function () {
            // this.tweenedColor = Object.assign({}, this.color)
        },
        computed: {
            riskNum() {
                return parseInt(this.riskNumSet.mutiple.tweenedNumber.toFixed())
            },
            riskNum_sugar() {
                return parseInt(this.riskNumSet.bloodSugar.tweenedNumber.toFixed())
            },
            riskNum_pressure() {
                return parseInt(this.riskNumSet.bloodPressure.tweenedNumber.toFixed())
            }
        },
        watch: {
            'riskNumSet.mutiple.number'(newVal) {
               TweenLite.to(this.$data.riskNumSet.mutiple, 2, { tweenedNumber: newVal });
            },
            'riskNumSet.bloodSugar.number'(newVal) {
               TweenLite.to(this.$data.riskNumSet.bloodSugar, 2, { tweenedNumber: newVal });
            },
            'riskNumSet.bloodPressure.number'(newVal) {
               TweenLite.to(this.$data.riskNumSet.bloodPressure, 2, { tweenedNumber: newVal });
            },

        },
        methods: {
            healthStatus(num) {
                let x = num
                switch(true) {
                    case x < 40: return {color: 'green', tip: '身体健康，继续保持'}
                    case x < 70 && x >= 40: return {color: 'yellow', tip: '健康预警，注意身体'}
                    case x >= 70: return {color: 'red', tip: '身体危险，请就医'}
                }
            },
            $_getRiskNum() {
                this.loading = true
                this.axios.get('/index/mutiple')
                    .then((res => {
                        let data = res.data.data
                        // console.log(data)
                        this.riskNumSet.bloodSugar.number = data.riskNum
                        this.loading = false
                    }))
                // let params = {
                //     username: sessionStorage.getItem('username')
                // }
                // this.axios.get('/detail/blood-sugar', { params: params })
                // .then((res) => {
                //     let data = res.data.data
                //     let a = handleData(data)
                //     let b = caculateRiskNum(a)
                //     console.log(b)
                //     this.riskNumSet.bloodSugar.number = b
                //     // console.log('test')
                // })
                // .catch((error) => {
                //     console.log(error)
                // })
                //早中晚平均数,凌晨平均数
                // function handleData(array) {
                // let average = {
                //     emptyStomach: 0,
                //     beforeDawn: 0,
                // }
                // // console.log(average)
                // for(let i of array) {
                //     average.beforeDawn += parseFloat(i.data[0])
                //     average.emptyStomach += parseFloat(i.data[1]) + parseFloat(i.data[2]) + parseFloat(i.data[3])
                // }
                // average.beforeDawn = Math.round((average.beforeDawn / 30) * 100) / 100
                // average.emptyStomach = Math.round((average.emptyStomach / 90) * 100) / 100
                // console.log(average)
                
                // return average
                // }
                // //危险度计算
                // function caculateRiskNum(object) {
                // let m = object.emptyStomach
                // if(m > 6.1 && m <= 8.4) {
                //     m = (m - 5) / 1.7 + 1
                //     m = Math.pow(m, -2)
                //     m = 1 / m
                // } else if(m > 3.9 && m <= 6.1) {
                //     m = Math.pow(m - 5, 4)
                // } else if(m <= 3.9) {
                //     m = (5 - m) / 1.7 + 1
                //     m = Math.pow(m, -2)
                //     m = 1 / m
                // }
                // return Math.round(m * 100)
                // }
                // for(let item in this.riskNumSet) {
                //     this.riskNumSet[item].number = this.$store.state.riskNum[item]
                // }
            },
        },
        mounted() {
            this.$_getRiskNum()
            for(let item in this.riskNumSet) {
                this.riskNumSet[item].number = this.$store.state.riskNum[item]
            }
        }
    }
</script>

<style lang="less">
    #home {
        height: 100%;
        overflow: scroll;
        .test-header {
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 400px;
            background: linear-gradient(rgb(118, 218, 243),rgb(97, 236, 160));
            .header {
                font-weight: 600;
                font-size: 22px;
            }
            .circle-text {
                width: 120px;
                height: 100px;
                margin: auto;
                // .circle-text-container {
                //     animation: movedown 1s;
                // }
                p {
                    margin: 0;
                }
                .num {
                    font-size: 40px;
                    font-weight: 600;
                }
                .tip {
                    margin: 6px;
                    font-size: 12px;
                }
            }
        }
        .test-container {
            padding: 10px 0;
            background-color: #eee;
            .test-item {
                height: 120px;
                display: flex;
                align-items: center;
                padding: 0 40px;
                background-color: #fff;
                margin-top: 10px;
                border-radius: 4px;
                .item-text {
                    width: calc(100% - 80px);
                    height: 100%;
                    padding: 20px;
                    text-align: left;
                    margin-left: 20px;
                    .header {
                        height:50%;
                        font-size: 20px;
                        font-weight: 600;
                    }
                    .footer {
                        word-wrap: break-word;
                    }
                }
                &:first-child {
                    margin-top: 0px;
                }
            }
        }
        @keyframes movedown {
            from { transform: translateY(0) }
            to {  transform: translateY(20%) }
        }
    }
</style>