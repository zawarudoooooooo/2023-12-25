<script>
import { RouterLink, RouterView } from 'vue-router'
import ProfileDashBoard from '../components/ProfileDashBoard.vue'
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),

            foundUser: null,
            userInfoList: null,
            imageUrl: null,
            foundFileName:null

        };
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE');
    },
    mounted() {
        this.searchAllUserInfo()
    },

    methods: {

        searchAllUserInfo() {
            fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.userInfoList = data.userInfoList;
                    console.log(this.userInfoList)

                    // 根據 foundUserId 找到對應的 foundUser
                    const foundUser = this.userInfoList.find(user => user.userId === this.foundUserInfo.userId);

                    // 如果找到了對應的 foundUser，你可以做一些操作
                    if (foundUser) {
                        console.log('找到了對應的使用者:', foundUser);
                        this.$emit("userInfo", foundUser);
                        this.foundUser = foundUser
                    } else {
                        console.log('找不到對應的使用者');
                    }
                    const filePath = foundUser.userPhoto
                    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
                    this.foundFileName=fileName
                    console.log(this.foundFileName) // 輸出: image_1702435129913.jpg
                })
        },

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
        <div class="profileArea" v-if="foundUser">
            <!-- 使用者名稱和ID -->
            <div class="usernameAndid">
                <p>{{ foundUser.userName }}</p>
                <img :src="'../../public/' + foundFileName" alt="" style="border-radius: 50%;" height="120px" width="120px">
                <p>{{ foundUser.account }}</p>
            </div>

            <!-- 使用者簡介 -->
            <div class="userinfo">
                <p style="text-align: center;" >個人簡介</p>
                <p v-html="foundUser.profile ? foundUser.profile.replace(/\n/g, '<br>') : '未填寫'"></p>
            </div>
            <!-- 使用者寵物專區 -->
            <div class="mypetArea">
                <div class="title">
                    <p>My Pet</p>
                    <!-- 寵物狀態區域 -->
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
                <!-- 寵物圖示區域 -->
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
            <!-- 其他區域 -->
            <div class="otherArea">

            </div>
        </div>
    </div>
    <RouterView />
</template>

<style lang="scss" scoped>
.content {
    width: 95vw;
    height: 200vh;
    margin: auto;
    margin-top: 3vmin;
    display: flex;
    justify-content: space-around;

    //使用者資料區
    .profileArea {
        width: 80vw;
        height: 195vh;
        background-color: white;
        border-radius: 10px;
        text-align: center;
        box-shadow: 3px 3px 3px gray;

        //使用者名稱和ID
        .usernameAndid {
            width: 65vw;
            height: 15vh;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px 3px gray;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 26pt;
            margin-top: 10vmin;
            margin-left: 12vmin;

            p {
                color: #978989;
                font-weight: bold;
                margin: 0;
            }

            img{
                margin-left: 115px;
            }

            i {
                color: #E9D2A6;
                font-size: 100pt;
                margin-left: 7vmin;
            }
        }

        //使用者簡介 
        .userinfo {
            text-align: left;
            width: 65vw;
            height: 30vh;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px 3px gray;
            margin-top: 10vmin;
            margin-left: 12vmin;
            padding: 5vmin;
        }

        //使用者寵物專區
        .mypetArea {
            width: 65vw;
            height: 40vh;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px 3px gray;
            margin-top: 10vmin;
            margin-left: 12vmin;
            padding: 4vmin;

            .title {
                height: 10vh;
                display: flex;
                justify-content: space-between;

                p {
                    color: #978989;
                    font-weight: bold;
                    font-size: 22pt;
                    margin: 0;
                }

                //寵物狀態區域
                .state {
                    height: 5vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    p {
                        font-size: 16pt;
                        margin-right: 1vmin;
                    }

                    //狀態 : 正常
                    .regular {
                        width: 3vmin;
                        height: 3vmin;
                        border-radius: 50%;
                        background-color: #E9D2A6;
                        margin-right: 1vmin;
                    }

                    //狀態 : 送養中
                    .ing {
                        width: 3vmin;
                        height: 3vmin;
                        border-radius: 50%;
                        background-color: #C79CA4;
                        margin-right: 1vmin;
                    }

                    //狀態 : 已送養                    
                    .finish {
                        width: 3vmin;
                        height: 3vmin;
                        border-radius: 50%;
                        background-color: #B2D2CB;
                        margin-right: 1vmin;
                    }

                    i {
                        color: #978989;
                        font-size: 28pt;
                    }
                }
            }

            //寵物圖示區域
            .petimg {
                display: flex;
                justify-content: space-around;

                //ruby
                .ruby {
                    width: 40vmin;
                    height: 20vmin;
                    border-radius: 20px;
                    background-color: #E9D2A6;
                    display: flex;
                    color: white;
                    padding-left: 3vmin;
                    margin-top: 1vmin;

                    p {
                        font-weight: bold;
                        font-size: 26pt;
                        margin-top: 0;
                    }

                    i {
                        font-size: 135pt;
                        margin-top: 1vmin;
                    }
                }

                //kiwi
                .kiwi {
                    width: 40vmin;
                    height: 20vmin;
                    border-radius: 20px;
                    background-color: #C79CA4;
                    display: flex;
                    color: white;
                    padding-left: 3vmin;
                    margin-top: 1vmin;

                    p {
                        font-weight: bold;
                        font-size: 26pt;
                        margin-top: 0;
                    }

                    i {
                        font-size: 135pt;
                        margin-top: 1vmin;
                    }
                }

                //lucky
                .lucky {
                    width: 40vmin;
                    height: 20vmin;
                    border-radius: 20px;
                    background-color: #B2D2CB;
                    display: flex;
                    color: white;
                    padding-left: 3vmin;
                    margin-top: 1vmin;

                    p {
                        font-weight: bold;
                        font-size: 26pt;
                        margin-top: 0;
                    }

                    i {
                        font-size: 135pt;
                        margin-top: 1vmin;
                    }
                }
            }
        }

        //其他區域
        .otherArea {
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