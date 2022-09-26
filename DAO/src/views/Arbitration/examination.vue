<template>
  <div>
     <header>
      <white :title="title"></white>
    </header>
    <div class="body">
      <div class="main">
        <div class="mainTitle">
          <div class="NumberOfQuestions"><span>1</span>/10</div>
          <div class="Aim"><van-icon name="aim" color="#237FF8" /><van-count-down :time="time"  format="HH:mm"/></div>
        </div>
        <div class="questions">
          <h3>交易中,买家打款时不能进行哪些备注？</h3>
          <h4>(单选题)</h4>
        </div>
        <div class="answerOptions">
          <div><span>A.</span>买U,USTD,BTC,ETH等任何区域链相关的信息</div>
          <div><span>B.</span>卖家个人账号信息</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import white from "@/components/Nav/white.vue";
export default {
  components: { white },
  data(){
    return{
      title:'仲裁考试',
      time: 30 * 60 * 60 * 1000,
      testQuestionData:[
        {
          id:1,
          question:"题目一",
          questionContant:"交易中,买家打款时不能进行哪些备注？",
          questionAnswer:[
            {
              title:'A.',
              contant:'买U,USTD,BTC,ETH等任何区域链相关的信息'
            },
             {
              title:'B.',
              contant:'卖家个人账号信息'
            }
          ]

        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .body{
    height: 95vh;
    background-color: #F3F4F5 ;
    padding: 1rem;
    .main{
      background-color: #fff;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 10px;
      .mainTitle{
        display: flex;
        justify-content: space-between;
        .NumberOfQuestions{
          font-size: 16px;
          font-weight: bold;
          color: rgb(77, 75, 75);
          span{
            font-size: 28px;
            color: #237FF8 ;
          }
        }
        .Aim{
          font-weight: bold;
          display: flex;
          font-weight: bold;
          align-items: center;
          color: #237FF8 ;
          font-size: 18px;
          .van-count-down{
            margin-top: 2px;
            font-size: 18px;
            margin-left: 4px;
            color: #237FF8 ;
          }
          
        }
      }
      .questions{
        h3{
          color: #333333 ;
          font-size: 1rem;
        }
        h4{
          color: #999999;
          font-size: 14px;
        }
      }
      .answerOptions{
        div{
          background-color: #F9F9F9 ;
          border-radius: 10px;
          color: #666666;
          font-size: 1rem;
          margin: 1rem 0;
          display: flex;
          padding: 0.8rem;
          span{
            color: #666666;
            display: block;
            margin-top: 3px;
            width: 1.3rem;
          }
        }
      }
    }
  }
</style>