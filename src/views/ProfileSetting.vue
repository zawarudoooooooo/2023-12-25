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
            foundFileName: null,

            ///更新資料 For V-model
            userName: null,
            profile: null,
            jobOccupation: null,
            address: null,
            phone: null,
            familyStatus: null,
            sentenceToAdopter: null,
            userRealName: null,
            age: null,
            gender: null,

        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
    },

    mounted() {
        this.searchAllUserInfo()
    },

    methods: {

        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.readFile(file);
            }
        },
        readFile(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // this.foundUser.userPhoto = event.target.result; // 将文件内容赋值给用户的照片字段
                this.imageUrl = event.target.result; // 也將其賦值給 imageUrl，用於預覽
            };
            reader.readAsDataURL(file);
        },

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
                        this.foundUser = foundUser
                    } else {
                        console.log('找不到對應的使用者');
                    }
                    const filePath = foundUser.userPhoto
                    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
                    this.foundFileName = fileName
                    console.log(this.foundFileName) // 輸出: image_1702435129913.jpg
                })
        },
        update() {

            const userInfo = {
                userId: this.foundUser.userId, //Id不修改 保留
                password: this.foundUser.password, // 保留原始密碼
                ///這裡開始 會修改
                userName: this.userName,
                userPhoto: this.imageUrl,
                profile: this.profile,
                jobOccupation: this.jobOccupation,
                address: this.address,
                phone: this.phone,
                familyStatus: this.familyStatus,
                sentenceToAdopter: this.sentenceToAdopter,
                userRealName: this.userRealName,
                age: this.age,
                gender: this.gender,

            };

            console.log(userInfo)
            fetch('http://localhost:8080/api/adoption/userInfo/updateUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInfo }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User information created/updated:', data);
                })
                .catch(error => {
                    console.error('Error creating/updating user information:', error);
                });

        },

    },


    components: {
        ProfileDashBoard
    },
}
</script>

<template>
    <!--12.14 router for admin 需要登入後才能使用的屬性 暫時放這裡-->
    <div class="BE line" v-if="foundUserInfo.permission >= 20">
        <i class="fa-solid fa-gear"></i>
        <RouterLink to="/BeManagement" class="router-link-custom">後台管理</RouterLink>
    </div>
    <div class="content" v-if="foundUser">
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
                <input type="text" name="" id="" style="border:none;" :placeholder=foundUser.userName
                    v-model="this.userName">
                <img :src="'../../public/' + foundFileName" alt="" style="border-radius: 50%;" height="120px" width="120px">
                <p>{{ foundUser.account }}</p>
            </div>
            <div>
                <input type="file" @change="onFileChange">
                <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl">
            </div>
            <button @click="update()">確定更新</button>
            <!-- 使用者簡介 -->
            <div class="profileinfo">
                使用者簡介
                <textarea name="" id="" cols="95" rows="6" :placeholder=foundUser.profile v-model="this.profile"></textarea>
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
                                <input type="text" name="" id="" :placeholder=foundUser.userRealName
                                    v-model="this.userRealName">
                            </div>
                            <div class="age">
                                <span>年齡 : </span>
                                <input type="number" :placeholder=foundUser.age v-model="this.age">
                            </div>
                            <div class="gender">
                                <span>性別 : </span>
                                {{ foundUser.gender }}
                                <select :placeholder=foundUser.gender v-model="this.gender">
                                    <option value="男性">男性</option>
                                    <option value="女性">女性</option>
                                    <option value="未填寫">未填寫</option>
                                </select>
                            </div>
                            <div class="work">
                                <span>職業 : </span>
                                <input type="text" name="" id="" :placeholder=foundUser.jobOccupation
                                    v-model="this.jobOccupation">
                            </div>
                        </div>
                    </div>
                    <!-- 聯絡方式 -->
                    <div class="contact">
                        <label for="">聯絡方式</label>
                        <div class="contactinfo">
                            <div class="address">
                                <span>地址 : </span>
                                <input type="text" name="" id="" :placeholder=foundUser.address v-model="this.address">
                            </div>
                            <div class="email">
                                <p>信箱 : {{ foundUser.email }}</p>
                            </div>
                            <div class="phone">
                                <span>聯絡電話 : </span>
                                <input type="text" :placeholder=foundUser.phone v-model="this.phone">
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
                                <textarea name="" id="" cols="30" rows="6" :placeholder=foundUser.familyStatus
                                    v-model="this.familyStatus"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 給送養人的一句話 -->
                <div class="memo">
                    <label for="">給送養人的一句話</label>
                    <div class="memoArea">
                        <textarea name="" id="" cols="80" rows="6" :placeholder=foundUser.sentenceToAdopter
                            v-model="this.sentenceToAdopter"></textarea>
                    </div>
                </div>
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
        box-shadow: 3px 3px 3px gray;

        //右上icon區
        .logoutAndsave {
            font-size: 40pt;
            color: #978989;
            margin-left: 150vmin;
            margin-top: 3vmin;

            i {
                margin-right: 3vmin;
            }
        }

        //使用者名稱和ID
        .usernameAndid {
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

            p {
                color: #978989;
                font-weight: bold;
                margin: 0;
            }

            i {
                color: #E9D2A6;
                font-size: 100pt;
                margin-left: 7vmin;
            }
        }

        //使用者簡介
        .profileinfo {
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
        .adoptInformation {
            width: 65vw;
            height: 85vh;
            background-color: white;
            border-radius: 10px;
            box-shadow: 3px 3px 3px 3px gray;
            margin-top: 8vmin;
            margin-left: 12vmin;
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
                height: 35vh;
                margin-left: 8vmin;
                display: flex;

                //基本資料
                .user {
                    width: 14vw;

                    .userinfo {
                        width: 13vw;
                        height: 24vh;
                        border: 2.5px solid #978989;
                        border-radius: 10px;
                        margin-top: 1vmin;

                        p {
                            padding-left: 3vmin;
                        }
                    }
                }

                //聯絡方式
                .contact {
                    width: 22vw;

                    .contactinfo {
                        width: 21vw;
                        height: 24vh;
                        border: 2.5px solid #978989;
                        border-radius: 10px;
                        margin-top: 1vmin;

                        p {
                            padding-left: 3vmin;
                        }
                    }
                }

                //家庭狀況
                .family {
                    .familyinfo {
                        width: 21vw;
                        height: 24vh;
                        border: 2.5px solid #978989;
                        border-radius: 10px;
                        margin-top: 1vmin;

                        p {
                            padding-left: 3vmin;
                        }
                    }
                }
            }

            //給送養人的一句話 
            .memo {
                margin-left: 8vmin;

                .memoArea {
                    width: 57vw;
                    height: 24vh;
                    border: 2.5px solid #978989;
                    border-radius: 10px;
                    margin-top: 1vmin;

                    p {
                        padding-left: 3vmin;
                    }
                }
            }
        }
    }
}</style>
