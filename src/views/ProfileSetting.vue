<script>
import { RouterLink, RouterView } from 'vue-router'
import ProfileDashBoard from '../components/ProfileDashBoard.vue'
    export default{
        data(){
            return{

            }
        },
        //進入頁面時，變更背景顏色
        beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
        },
        components: { 
            ProfileDashBoard 
        },
    }
</script>

<template>
    <div class="content">
        <!-- 側邊功能區 -->
        <div class="dashBoardArea">
            <ProfileDashBoard />
        </div>
        <!-- 使用者資料區 -->
        <div class="profileArea">
            <!-- 右上icon區 -->
            <div class="logoutAndsave">
                <i class="fa-solid fa-right-from-bracket"></i>
                <i class="fa-solid fa-floppy-disk"></i>
            </div>
            <!-- 使用者名稱和ID -->
            <div class="usernameAndid">
                <p>User Name</p>
                <i class="fa-solid fa-circle-user"></i>
                <p>@Example1117</p>
            </div>
            <!-- 使用者簡介 -->
            <div class="profileinfo">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat assumenda suscipit tempora quo quaerat libero? Perferendis, ab est assumenda, natus modi deserunt autem saepe facilis iure omnis esse, at veniam.</p>
            </div>
            <!-- 使用者領養資料 -->
            <div class="adoptInformation">
                <div class="title">
                    <p>我的領養資料</p>
                    <h4>(以下資料僅提拱給送養人)</h4>
                </div>
                <!-- 詳細領養資料 -->
                <div class="infoArea">
                    <!-- 基本資料 -->
                    <div class="user">
                        <label for="">基本資料</label>
                        <div class="userinfo">
                            <div class="name">
                                <p>真實姓名 : 王大花</p>
                            </div>
                            <div class="age">
                                <p>年齡 : ３５歲</p>
                            </div>
                            <div class="gender">
                                <p>性別 : 女性</p>
                            </div>
                            <div class="work">
                                <p>職業 : 服務業</p>
                            </div>
                        </div>
                    </div>
                    <!-- 聯絡方式 -->
                    <div class="contact">
                        <label for="">聯絡方式</label>
                        <div class="contactinfo">
                            <div class="address">
                                <p>地址 : 台灣 台北市 XX區 XX路 XX號</p>
                            </div>
                            <div class="email">
                                <p>E-mail : XXXXX@gmail.com</p>
                            </div>
                            <div class="phone">
                                <p>聯絡電話 : 0000-000-000</p>
                            </div>
                            <div class="line">
                                <p>Line ID : 000080000</p>
                            </div>
                        </div>
                    </div>
                    <!-- 家庭狀況 -->
                    <div class="family">
                        <label for="">家庭狀況</label>
                        <div class="familyinfo">
                            <div class="familydetail">
                                <p>未婚單身</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 給送養人的一句話 -->
                <div class="memo">
                    <label for="">給送養人的一句話</label>
                    <div class="memoArea">
                        <p>我是一個善良的人，生活簡單</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<style lang="scss" scoped>
    .content{
        width: 95vw;
        height: 200vh;
        margin: auto;
        margin-top: 3vmin;
        display: flex;
        justify-content: space-around;

        //使用者資料區
        .profileArea{
            width: 80vw;
            height: 195vh;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px gray;

            //右上icon區
            .logoutAndsave{
                font-size: 40pt;
                color: #978989;
                margin-left: 150vmin;
                margin-top: 3vmin;

                i{
                    margin-right: 3vmin;
                }
            }

            //使用者名稱和ID
            .usernameAndid{
                width: 55vw;
                height: 15vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 26pt;
                margin-top: 3vmin;
                margin-left: 28vmin;

                p{
                    color: #978989;
                    font-weight: bold;
                    margin: 0;
                }

                i{
                    color: #E9D2A6;
                    font-size: 100pt;
                    margin-left: 7vmin;
                }
            }

            //使用者簡介
            .profileinfo{
                width: 65vw;
                height: 30vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                margin-top: 8vmin;
                margin-left: 12vmin;
                padding: 5vmin;
            }

            //使用者領養資料
            .adoptInformation{
                width: 65vw;
                height: 85vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                margin-top: 8vmin;
                margin-left: 12vmin;
                padding: 5vmin;
                font-weight: bold;
            
                p{
                    color: #978989;
                }

                label{
                    color: #978989;
                    font-weight: bold;
                    font-size: 16pt;
                    margin-left: 2vmin;
                }
                .title{
                    height: 15vh;
                    text-align: center;

                    p{
                        font-size: 28pt;
                        margin: 0;
                    }
                    h4{
                        color: #A63A50;
                        margin: 0;
                    }
                }

                //詳細領養資料
                .infoArea{
                    width: 60vw;
                    height: 35vh;
                    margin-left: 8vmin;
                    display: flex;

                    //基本資料
                    .user{
                        width: 14vw;
                        
                        .userinfo{
                            width: 13vw;
                            height: 24vh;
                            border: 2.5px solid #978989;
                            border-radius: 10px;
                            margin-top: 1vmin;

                            p{
                                padding-left: 3vmin;
                            }
                        }
                    }

                    //聯絡方式
                    .contact{
                        width: 22vw;
                        .contactinfo{
                            width: 21vw;
                            height: 24vh;
                            border: 2.5px solid #978989;
                            border-radius: 10px;
                            margin-top: 1vmin;

                            p{
                                padding-left: 3vmin;
                            }
                        }
                    }

                    //家庭狀況
                    .family{
                        .familyinfo{
                            width: 21vw;
                            height: 24vh;
                            border: 2.5px solid #978989;
                            border-radius: 10px;
                            margin-top: 1vmin;

                            p{
                                padding-left: 3vmin;
                            }
                        }
                    }
                }

                //給送養人的一句話 
                .memo{
                    margin-left: 8vmin;
                        .memoArea{
                            width: 57vw;
                            height: 24vh;
                            border: 2.5px solid #978989;
                            border-radius: 10px;
                            margin-top: 1vmin;

                            p{
                                padding-left: 3vmin;
                            }
                        }
                    }
            }
        }
    }    
</style>
