<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapActions } from "pinia"
import indexState from "../stores/indexState"
import ProfileDashBoard from '../components/ProfileDashBoard.vue'
import Swal from 'sweetalert2'


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

            imageUrl: null, // 新增用於顯示預覽圖的變數

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

        chooseImage() {
            document.getElementById('imageInput').click(); // 觸發選擇檔案的 input 欄位
        },

        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.readFile(file);
            }
        },
        readFile(file) {
            const reader = new FileReader();
            reader.onloadend = (event) => {
                const arrayBuffer = event.target.result;
                const bytes = new Uint8Array(arrayBuffer);
                this.userPhoto = Array.from(bytes);

                // 顯示預覽圖
                this.imageUrl = URL.createObjectURL(file); // 使用 URL.createObjectURL 顯示預覽圖
            };
            reader.readAsArrayBuffer(file);
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
                    console.log(this.userInfoList);

                    // 根據 foundUserId 找到對應的 foundUser
                    const foundUser = this.userInfoList.find(user => user.userId === this.foundUserInfo.userId);

                    // 如果找到了對應的 foundUser，你可以做一些操作
                    if (foundUser) {
                        console.log('找到了對應的使用者:', foundUser);

                        // 在這裡加入 base64 前綴
                        const base64Prefix = 'data:image/jpeg;base64,';
                        const filePath = base64Prefix + foundUser.userPhoto; // 在這裡將路徑轉換為 base64 圖片前綴
                        console.log(filePath);
                        foundUser.filePath = filePath; // 將處理後的圖片路徑存儲在 foundUser 中的 filePath 屬性

                        this.$emit("userInfo", foundUser);
                        this.foundUser = foundUser; // 將整理後的 foundUser 存入 this.foundUser
                    } else {
                        console.log('找不到對應的使用者');
                    }
                });
        },



        update() {
            const userInfo = {
                userId: this.foundUser.userId, //Id不修改 保留
                password: this.foundUser.password, // 保留原始密碼
                ///這裡開始 會修改
                userName: this.userName,

                userPhoto: this.userPhoto,
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

                    Swal.fire({
                        title: "成功更新個人資料",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/Profile')
                            sessionStorage.setItem('foundUserInfo', JSON.stringify(foundUser));
                            this.updateUser(foundUser); // 调用 updateUser 方法更新用户信息
                        }
                    });

                })
                .catch(error => {
                    console.error('Error creating/updating user information:', error);
                });

        },

        updateUser(newUserInfo) {
            this.updateUserInfo(newUserInfo);
        }
    },


    components: {
        ProfileDashBoard
    },
}
</script>

<template>
    <div class="content" v-if="foundUser">
        <!-- 側邊功能區 -->

        <div class="dashBoardArea">
            <ProfileDashBoard />
        </div>
        <!-- 使用者資料區 -->
        <div class="profileArea">
            <!-- 右上icon區 -->
            <div class="logoutAndsave">
                <i class="fa-solid fa-floppy-disk" @click="update()"></i>
            </div>
            <!-- 使用者名稱和ID -->
            <div class="usernameAndid">
                <input class="block" type="text" name="" id="" style="width: 200px;" :placeholder=foundUser.userName
                    v-model="this.userName">

                <div class="image-upload">
                    <img v-if="!imageUrl" :src="this.foundUser.filePath" alt=""
                        style="border-radius: 50%; border: 3px solid;" height="100px" width="100px">
                    <img v-else :src="imageUrl" alt="Uploaded Image" style="border-radius: 50%; border: 3px solid;"
                        height="100px" width="100px">
                    <div class="add-icon" @click="chooseImage">
                        <i class="fa-solid fa-plus"></i>
                        <input type="file" accept="image/*" id="imageInput" style="display: none;" @change="onFileChange">
                    </div>
                </div>

                <p>@{{ foundUser.account }}</p>
            </div>
            <div>
            </div>
            <!-- 使用者簡介 -->
            <div class="profileinfo">
                <div class="profileInfoTop">
                    <h4 style="text-align: center;">個人簡介</h4>
                </div>
                <textarea class="block profileInfoContent" name="" id="" cols="95" rows="6" :placeholder=foundUser.profile
                    v-model="this.profile"></textarea>
            </div>
            <!-- 使用者領養資料 -->
            <div class="adoptInformation">
                <div class="title">
                    <p>我的領養資料</p>
                    <h4>(以下資料僅提供給送養人)</h4>
                </div>
                <!-- 詳細領養資料 -->
                <div class="infoArea">
                    <!-- 基本資料 -->
                    <div class="user">
                        <label for="">基本資料</label>
                        <div class="userinfo">
                            <div class="name">
                                <span>真實姓名 : </span>
                                <input class="blockSmall blockData" type="text" name="" id=""
                                    :placeholder=foundUser.userRealName v-model="this.userRealName">
                            </div>
                            <div class="age">
                                <span>年齡 : </span>
                                <input disabled="disabled" class="blockSmall blockData" type="number"
                                    :placeholder=foundUser.age v-model="this.age">
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
                                <input class="blockSmall blockData" type="text" name="" id=""
                                    :placeholder=foundUser.jobOccupation v-model="this.jobOccupation">
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
                                    <input class="blockSmall blockContact" type="text" name="" id=""
                                        :placeholder=foundUser.address v-model="this.address">
                                </div>
                                <div class="email contactInfoInput">
                                    <p>信箱 : {{ foundUser.email }}</p>
                                </div>
                                <div class="phone contactInfoInput">
                                    <span>聯絡電話 : </span>
                                    <input class="blockSmall blockContact" type="text" :placeholder=foundUser.phone
                                        v-model="this.phone">
                                </div>
                            </div>
                        </div>
                        <!-- 家庭狀況 -->
                        <div class="family">
                            <label for="">家庭狀況</label>
                            <textarea class="block familyinfo" name="" id="" cols="30" rows="6"
                                :placeholder=foundUser.familyStatus v-model="this.familyStatus"></textarea>
                        </div>
                    </div>
                </div>
                <!-- 給送養人的一句話 -->
                <div class="memo">
                    <label for="">給送養人的一句話</label>
                    <textarea class="block memoArea" name="" id="" cols="80" rows="6"
                        :placeholder=foundUser.sentenceToAdopter v-model="this.sentenceToAdopter"></textarea>
                </div>
            </div>
        </div>
    </div>
    <RouterView />
</template>

<style lang="scss" scoped>
@import '../assets/RStyle.scss';

$inputBorder: #e2dbca;


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
    padding: 20px 30px 20px 30px;
    box-shadow: 3px 3px 3px gray;

    //右上icon區
    .logoutAndsave {
        width: 95%;
        // height: 70px;
        display: flex;
        justify-content: end;
        align-items: center;
        font-size: 30pt;
        color: #978989;
        margin-top: 8px;
    }

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
        margin-top: 30px;

        .image-upload {
            position: relative;
            display: inline-block;
            margin-right: 20px;
            /* 調整位置 */

            .add-icon {
                position: absolute;
                bottom: -10px;
                /* 控制底部位置 */
                right: -10px;
                /* 控制右側位置 */
                background-color: #ffffff;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
            }
        }

        p {
            color: #978989;
            font-weight: bold;
            margin: 0;
        }

    }

    //使用者簡介
    .profileinfo {
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

        .profileInfoTop {
            width: 90%;
            height: 50px;
            display: flex;
            align-items: center;
            font-weight: bolder;
            margin-top: 20px;
        }

        .profileInfoContent {
            width: 90%;
            height: 150px;
            margin-bottom: 15px;
            border: $inputBorder solid 2px;
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

                    .blockData {
                        width: 95%;
                    }
                }
            }

            .infoRight {
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

                        .contactInfoInput {
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

// textarea
.block {
    padding: 10px 10px 10px 10px;
    border: $inputBorder solid 2px;
    border-radius: 10px;
    margin: 10px 0px 10px 0px;
}

.blockSmall {
    padding: 0px 5px 0px 5px;
    border: $inputBorder solid 2px;
    border-radius: 10px;
    margin: 10px 0px 10px 0px;
}
</style>
