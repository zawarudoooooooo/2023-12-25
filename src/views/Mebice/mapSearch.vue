<script>
</script>
<template>
<div class="bgArea">

    <div class="mapSearch">


        <div class="searchArea">

            <span>區域</span>
            <select>
                <option value=""></option>
                <option value="">北部</option>
                <option value="">中部</option>
                <option value="">南部</option>
                <option value="">東部</option>
            </select>

            <span>縣市</span>
            <select>

                <option value=""></option>

                <option value="">臺北市</option>
                <option value="">新北市</option>
                <option value="">基隆市</option>
                <option value="">新竹市</option>
                <option value="">桃園市</option>
                <option value="">新竹縣</option>
                <option value="">宜蘭縣</option>

                <option value="">臺中市</option>
                <option value="">苗栗縣</option>
                <option value="">彰化縣</option>
                <option value="">南投縣</option>
                <option value="">雲林縣</option>

                <option value="">高雄市</option>
                <option value="">臺南市</option>
                <option value="">嘉義市</option>
                <option value="">嘉義縣</option>
                <option value="">屏東縣</option>
                <option value="">澎湖縣</option>

                <option value="">花蓮縣</option>
                <option value="">臺東縣</option>
            </select>

        </div>

        <div class="searchArea">
            
            <span>性質</span>
            <select>
                <option value=""></option>
                <option value=""></option>
            </select>

            <span>動物種類</span>
            <select>
                <option value=""></option>
                <option value="">貓</option>
                <option value="">狗</option>
                <option value="">其他</option>
            </select>

        </div>

        <div class="searchArea">
            <span>機構名稱</span>
            <input type="text" >
            <button>Search</button>
        </div>
        
    </div>

    <div class="mapInfo">

        <div class="img">

        </div>

        <div class="info">
                <div class="title">
                    <span>x x x x x x</span>
                </div>

                <div class="main">
                    <span>地址 :     x x x x x x</span>
                </div>

                <div class="main">
                    <span>營業時間 : x x x x x x</span>
                </div>

                <i class="fa-brands fa-facebook"></i>

                <i class="fa-solid fa-mobile-screen-button">
                    <span class="phone">(09)87654321</span>
                </i>
        </div>        
    </div>

</div>
</template>
<style lang="scss" scoped>
    .bgArea{
        width: 100vw;
        height: 100vh;
        background-color: #F8F5EE;
        display: flex;
        flex-direction: column;
        align-items: center;

        .mapSearch{
            width: 85%;
            height: 30%;
            background-color: #fff;
            border-radius: 4vw; 
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
            margin: 5vh 0;


            .searchArea {
                display: flex;
                margin: 4vh 5vw;

                span {
                    font-size: 1.5vw;
                    font-weight: bold;
                    color: #978989;
                }

                select{
                    width: 15%;
                    height: 4.5vh;
                    margin-left: 4vw;
                    margin-right: 5vw;
                    border-radius: 2.5vw;
                    background-color:  #DDDFEE;
                    border: none;
                    text-align: center;

                }

                

            input {
                    width: 63%;
                    height: 4.5vh;
                    border-radius: 2.5vw;
                    margin-left: 1vw;
                    margin-right: 5vw;
                    background-color:  #DDDFEE;
                    border: none;
                    padding-left: 2vw;
                }

                button{
                    width: 15%;
                    height: 6vh;
                    border-radius: 3.5vw;
                    border: none;
                    background-color: #E9D2A6;
                    color: white;
                    font-weight: 900;
                    font-size: 2vw;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                } 
            }
        }
        
        .mapInfo{
            width: 85%;
            height: 40%;
            background-color: #fff;
            border-radius: 4vw; 
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
            display: flex;

            .img{
                width: 40%;
                height: 80%;
                border: 1px solid  #978989;
                margin: 4vh 2.5vw;
                border-radius: 3vw;
            }

            .info{
                margin-top: 2vh;
                .title{
                    font-size: 3vw;
                    font-weight: bold;
                    color: #978989;
                    margin-bottom: 3vh;
                    
                }

                .main{
                    font-size: 1.5vw;
                    font-weight: bold;
                    color: #978989;
                }

                .fa-facebook{
                    font-size: 3vw;
                    margin-right: 2vw;
                    margin-top: 8vh;
                    
                }

                .fa-mobile-screen-button{
                    font-size: 3vw;
                    margin-top: 8vh;
                }

                .phone{
                    font-size: 1.5vw;
                    color: #978989;
                    margin-left: 2vw;
                }
            }
        }
    }

</style>