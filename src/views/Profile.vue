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
                <img v-if="foundUserInfo.userPhoto" :src="'../../public/' + foundFileName" alt="" style="border-radius: 50%;" height="100px" width="100px">
                <div v-if="!foundUserInfo.userPhoto" style="border: 2px solid; height: 100px; width: 100px; border-radius: 50%;">
                </div>
                <p>@{{ foundUser.account }}</p>
            </div>

            <!-- 使用者簡介 -->
            <div class="userinfo">
                <div class="userInfoTop">
                    <h4 style="text-align: center;" >個人簡介</h4>
                </div>
                <div class="userInfoContent">
                    <p v-html="foundUser.profile ? foundUser.profile.replace(/\n/g, '<br>') : '未填寫'"></p>
                </div>
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
                                <span>真實姓名 : </span>
                                <input class="blockSmall blockData" type="text" name="" id="" :placeholder=foundUser.userRealName
                                    v-model="this.userRealName">
                            </div>
                            <div class="age">
                                <span>年齡 : </span>
                                <input class="blockSmall blockData" type="number" :placeholder=foundUser.age v-model="this.age">
                            </div>
                            <div class="gender">
                                <span>性別 : </span>
                                {{ foundUser.gender }}
                                <select class="blockSmall blockData" :placeholder=foundUser.gender v-model="this.gender">
                                    <option value="男性">男性</option>
                                    <option value="女性">女性</option>
                                    <option value="未填寫">未填寫</option>
                                </select>
                            </div>
                            <div class="work">
                                <span>職業 : </span>
                                <input class="blockSmall blockData" type="text" name="" id="" :placeholder=foundUser.jobOccupation
                                    v-model="this.jobOccupation">
                            </div>
                        </div>
                    </div>
                    <div class="infoRight">
                        <!-- 聯絡方式 -->
                        <div class="contact">
                            <label for="">聯絡方式</label>
                            <div class="contactinfo">
                                <div class="address contactInfoInput">
                                    <span>地址 : </span>
                                    <input class="blockSmall blockContact" type="text" name="" id="" :placeholder=foundUser.address v-model="this.address">
                                </div>
                                <div class="email contactInfoInput">
                                    <p>信箱 : {{ foundUser.email }}</p>
                                </div>
                                <div class="phone contactInfoInput">
                                    <span>聯絡電話 : </span>
                                    <input class="blockSmall blockContact" type="text" :placeholder=foundUser.phone v-model="this.phone">
                                </div>
                            </div>
                        </div>
                        <!-- 家庭狀況 -->
                        <div class="family">
                            <label for="">家庭狀況</label>
                            <textarea class="block familyinfo" name="" id="" cols="30" rows="6" :placeholder=foundUser.familyStatus
                                v-model="this.familyStatus"></textarea>
                        </div>
                    </div>
                </div>
                <!-- 給送養人的一句話 -->
                <div class="memo">
                    <label for="">給送養人的一句話</label>
                    <textarea class="block memoArea" name="" id="" cols="80" rows="6" :placeholder=foundUser.sentenceToAdopter
                        v-model="this.sentenceToAdopter"></textarea>
                </div>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<style lang="scss" scoped>
$inputBorder: #e2dbca;
.content {
    width: 100vw;
    height: auto;
    padding-top: 3vmin;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 5vmin;
    display: flex;
    justify-content: space-between;
    .dashBoardArea{
        width: 13vw;
    }

    //使用者資料區
    .profileArea {
        width: 78vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: 20px;
        color: #978989;
        font-size: 14pt;
        padding: 20px 30px 20px 30px ;
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
            height: 250px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px 3px gray;
            margin-top: 10vmin;
            display: flex;
            flex-direction: column;
            align-items: center;
            .userInfoTop{
                width: 90%;
                height: 50px;
                display: flex;
                align-items: center;
                font-weight: bolder;
                margin-top: 20px;
            }
            .userInfoContent{
                width: 90%;
                height: 150px;
                margin-bottom: 15px;
            }
        }

        //使用者領養資料
    .adoptInformation {
        width: 65vw;
        height: auto;
        background-color: white;
        border-radius: 10px;
        box-shadow: 3px 3px 3px 3px gray;
        margin-top: 10vmin;
        padding: 5vmin;
        font-weight: bold;

        p {
            color: #978989;
        }

        label {
            color: #978989;
            font-weight: bold;
            font-size: 16pt;
            margin-left: 2vmin;
        }

        .title {
            height: 15vh;
            text-align: center;

            p {
                font-size: 28pt;
                margin: 0;
            }

            h4 {
                color: #A63A50;
                margin: 0;
            }
        }

        //詳細領養資料
        .infoArea {
            width: 60vw;
            height: auto;
            display: flex;
            justify-content: space-between;

            //基本資料
            .user {
                width: 20vw;

                .userinfo {
                    width: 100%;
                    height: 390px;
                    border: 2.5px solid #978989;
                    border-radius: 10px;
                    margin-top: 1vmin;
                    padding: 15px 25px 15px 25px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .blockData{
                        width: 95%;
                    }
                }
            }

            .infoRight{
                display: flex;
                flex-direction: column;
                align-items: center;
                //聯絡方式
                .contact {
                    width: 35vw;
                    margin-bottom: 20px;

                    .contactinfo {
                        width: inherit;
                        height: 230px;
                        border: 2.5px solid #978989;
                        border-radius: 10px;
                        margin-top: 1vmin;
                        padding: 10px 25px 10px 25px;
                        .contactInfoInput{
                            display: flex;
                            flex-direction: column;
                            margin-bottom: 10px;
                        }
                    }
                }
                //家庭狀況
                .family {
                    width: 35vw;
                    .familyinfo {
                        width: inherit;
                        height: 100px;
                        border: 2.5px solid #978989;
                        border-radius: 10px;
                        margin-top: 1vmin;
                    }
                }
            }
            

            
        }

        //給送養人的一句話 
        .memo {
            margin-top: 20px;
            .memoArea {
                width: 60vw;
                height: 120px;
                border: 2.5px solid #978989;
                border-radius: 10px;
                margin-top: 1vmin;
            }
        }
    }
    }
}
</style>