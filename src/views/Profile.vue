<script>
    export default{
        data(){
            return{

            }
        },
        //進入頁面時，變更背景顏色
        beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
        },
    }

</script>

<template>
    <div class="content">
        <div class="dashboardArea">
            <div class="notification">
                <i class="fa-solid fa-bell"></i>
                <p>Notification</p>
            </div>
            <div class="setting">
                <i class="fa-solid fa-user-gear"></i>
                <p>Settings</p>
            </div>
            <div class="pet">
                <i class="fa-solid fa-dog"></i>
                <p>My Pet</p>
            </div>
            <div class="article">
                <i class="fa-solid fa-pencil"></i>
                <p>My Articles</p>
            </div>
            <div class="adopt">
                <i class="fa-solid fa-user-tie"></i>
                <p>My Adopt</p>
            </div>
            <div class="chat">
                <i class="fa-brands fa-rocketchat"></i>
                <p>Chat</p>
            </div>
        </div>
        <div class="profileArea">
            <div class="usernameAndid">
                <p>User Name</p>
                <i class="fa-solid fa-circle-user"></i>
                <p>@Example1117</p>
            </div>
            <div class="userinfo">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat assumenda suscipit tempora quo quaerat libero? Perferendis, ab est assumenda, natus modi deserunt autem saepe facilis iure omnis esse, at veniam.</p>
            </div>
            <div class="mypetArea">
                <div class="title">
                    <p>My Pet</p>
                    <div class="state">
                        <div class="regular">
                        </div>
                        <p>正常</p>
                        <div class="ing">
                        </div>
                        <p>送養中</p>
                        <div class="finish">
                        </div>
                        <p>已送養</p>
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
                <div class="petimg">
                    <div class="ruby">
                        <p>Ruby</p>
                        <i class="fa-solid fa-dog"></i>
                    </div>
                    <div class="kiwi">
                        <p>Kiwi</p>
                        <i class="fa-solid fa-cat"></i>
                    </div>
                    <div class="lucky">
                        <p>Lucky</p>
                        <i class="fa-solid fa-dog"></i>
                    </div>
                </div>
            </div>
            <div class="otherArea">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 95vw;
        height: 200vh;
        margin: auto;
        margin-top: 3vmin;
        display: flex;
        justify-content: space-around;

        .dashboardArea{
            width: 10vw;
            height: 35vh;
            background-color: white;
            border-radius: 10px;
            color: #978989;
            font-size: 13pt;
            box-shadow: 3px 3px 3px gray;

            i{
                margin-right: 1vmin
            }
            .notification{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 2vmin;
            }

            .setting{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .pet{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .article{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .adopt{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .chat{
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .profileArea{
            width: 80vw;
            height: 195vh;
            background-color: white;
            border-radius: 10px;
            text-align: center;
            box-shadow: 3px 3px 3px gray;

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
                margin-top: 10vmin;
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

            .userinfo{
                width: 65vw;
                height: 30vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                margin-top: 10vmin;
                margin-left: 12vmin;
                padding: 5vmin;
            }

            .mypetArea{
                width: 65vw;
                height: 40vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                margin-top: 10vmin;
                margin-left: 12vmin;
                padding: 4vmin;

                .title{
                    height: 10vh;
                    display: flex;
                    justify-content: space-between;

                    p{
                        color: #978989;
                        font-weight: bold;
                        font-size: 22pt;
                        margin: 0;
                    }

                    .state{
                        height: 5vh;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        p{
                            font-size: 16pt;
                            margin-right: 1vmin;
                        }

                        .regular{
                            width: 3vmin;
                            height: 3vmin;
                            border-radius: 50%;
                            background-color: #E9D2A6;
                            margin-right: 1vmin;
                        }

                        .ing{
                            width: 3vmin;
                            height: 3vmin;
                            border-radius: 50%;
                            background-color: #C79CA4;
                            margin-right: 1vmin;
                        }

                        .finish{
                            width: 3vmin;
                            height: 3vmin;
                            border-radius: 50%;
                            background-color: #B2D2CB;
                            margin-right: 1vmin;
                        }

                        i{
                            color: #978989;
                            font-size: 28pt;
                        }
                    }
                }

                .petimg{
                    display: flex;
                    justify-content: space-around;

                    .ruby{
                        width: 40vmin;
                        height: 20vmin;
                        border-radius: 20px;
                        background-color: #E9D2A6;
                        display: flex;
                        color: white;
                        padding-left: 3vmin;
                        margin-top: 1vmin;

                        p{
                            font-weight: bold;
                            font-size: 26pt;
                            margin-top: 0;
                        }

                        i{
                            font-size: 135pt;
                            margin-top: 1vmin;
                        }
                    }

                    .kiwi{
                        width: 40vmin;
                        height: 20vmin;
                        border-radius: 20px;
                        background-color: #C79CA4;
                        display: flex;
                        color: white;
                        padding-left: 3vmin;
                        margin-top: 1vmin;

                        p{
                            font-weight: bold;
                            font-size: 26pt;
                            margin-top: 0;
                        }

                        i{
                            font-size: 135pt;
                            margin-top: 1vmin;
                        }
                    }

                    .lucky{
                        width: 40vmin;
                        height: 20vmin;
                        border-radius: 20px;
                        background-color: #B2D2CB;
                        display: flex;
                        color: white;
                        padding-left: 3vmin;
                        margin-top: 1vmin;

                        p{
                            font-weight: bold;
                            font-size: 26pt;
                            margin-top: 0;
                        }

                        i{
                            font-size: 135pt;
                            margin-top: 1vmin;
                        }
                    }
                }

            }

            .otherArea{
                width: 65vw;
                height: 30vh;
                background-color: white;
                border-radius: 10px;
                box-shadow: 3px 3px 3px 3px gray;
                margin-left: 12vmin;
                margin-top: 10vmin;
                padding: 5vmin;

            }
        }


    }
</style>