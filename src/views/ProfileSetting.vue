<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapActions } from "pinia"
import indexState from "../stores/indexState"
import ProfileDashBoard from '../components/ProfileDashBoard.vue'
import Swal from 'sweetalert2'

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    data() {
        return {
            // 與圖片處理有關
            imageUrl: null, // 顯示預覽圖的變數
            croppedImageUrl: null, // 保存裁切後圖片的變數
            showCropper: false, // 控制是否顯示裁切範圍的變數

            userPhoto: null, // 用於儲存上傳的圖片資料
            cropper: null, // Cropper 實例
            croppedImageUrl: null, // 儲存裁切後的圖片資料
            croppedImageUrlwithoutPrefix: null,//沒有前綴

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            foundUser: null,
            userInfoList: null,
            foundFileName: null,
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

    computed: {
        ...mapState(indexState, ["foundUserInfo"]),
    },

    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
    },

    mounted() {
        this.searchAllUserInfo()
    },

    methods: {

        ...mapActions(indexState, ["updateUserInfo", "clearUserInfo"]),

        // 举例：在某个地方需要更新用户信息时调用此方法
        updateUser(newUserInfo) {
            this.updateUserInfo(newUserInfo);
        },


        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.imageUrl = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        saveCroppedImage() {
            this.cropper = this.$refs.cropper;
            const croppedCanvas = this.cropper && this.cropper.getCroppedCanvas();
            this.croppedImageUrl = croppedCanvas ? croppedCanvas.toDataURL('image/jpeg') : null;
            console.log('Cropped image saved:', this.croppedImageUrl);
        },
        saveAndCloseCropper() {
            // 在這裡執行保存裁切圖片的操作
            this.saveCroppedImage();

            // 新增一個變數，不含 Base64 前綴
            this.croppedImageUrlwithoutPrefix = this.croppedImageUrl.replace(/^data:image\/[a-z]+;base64,/, '');

            // 打印新變數
            console.log('Cropped image without prefix:', this.croppedImageUrlwithoutPrefix);

            // 將裁切後的值賦予到 Uploaded Image
            this.$nextTick(() => {
                // 在這裡將裁切後的值賦予到 Uploaded Image
                const uploadedImage = this.croppedImageUrl;

                // 如果裁切後的值存在，將其賦值給 imageUrl 以顯示
                if (uploadedImage) {
                    this.imageUrl = uploadedImage;
                }

                // 隱藏裁切範圍並重置圖片變數
                this.showCropper = false;
                this.imageUrl = null;
            });
        },


        chooseImage() {
            document.getElementById('imageInput').click(); // 觸發選擇檔案的 input 欄位
        },

        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                // 將選擇的圖片設置為imageUrl
                this.imageUrl = reader.result;

                // 在成功讀取圖片後將 showCropper 設置為真
                this.showCropper = true;
            };

            console.log('Selected file:', file);

            if (!file) {
                // 如果未選擇圖片或選擇不支持的類型，重置圖片區域
                console.log('No file selected or unsupported type.');
                this.imageUrl = null; // 或者設置為空字符串，視需求而定
            } else {
                // 讀取選擇的圖片
                console.log('Reading file...');
                reader.readAsDataURL(file);
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

        handleError(event) {
            event.target.style.display = 'none';
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
            // 檢查是否有更新圖片
            if (this.croppedImageUrlwithoutPrefix) {
                userInfo.userPhoto = this.croppedImageUrlwithoutPrefix;
            }

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
                            sessionStorage.setItem('foundUserInfo', JSON.stringify(userInfo));
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
        ProfileDashBoard,
        VueCropper,
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

            <!-- 使用者名稱和ID 圖片處理區域 -->
            <div class="usernameAndid">
                <!-- Input field for username -->
                <input class="block" type="text" v-model="userName" :placeholder=foundUser.userName>

                <!-- Cropper popup -->
                <div v-if="showCropper" class="cropper-popup">
                    <h3 style="text-align: center;">裁切大頭貼</h3>
                    <!-- VueCropper component -->
                    <vue-cropper v-if="imageUrl" :src="imageUrl" :key="imageUrl" ref="cropper"></vue-cropper>
                    <!-- Button to save and close cropper -->
                    <button @click="saveAndCloseCropper">儲存並關閉</button>
                </div>

                <div class="image-upload">
                    <img v-if="croppedImageUrl" :src="croppedImageUrl" class="cropped-image">
                    <img v-else-if="!imageUrl && foundUser.filePath" :src="foundUser.filePath" class="uploaded-image"
                        @error="handleError">
                    <img v-else :src="imageUrl" class="default-image">

                    <div class="add-icon" @click="chooseImage">
                        <i class="fa-solid fa-plus"></i>
                        <input type="file" accept="image/*" id="imageInput" style="display: none;" @change="onFileChange">
                    </div>
                </div>


                <!-- User account information -->
                <p>{{ foundUser.account }}</p>
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
        position: relative;
        /* 將父元素設置為相對定位 */

        .image-upload {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid;
            // overflow: hidden;
            /* 其他樣式 */


            .cropped-image,
            .uploaded-image,
            .default-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        .add-icon {
            position: absolute;
            bottom: -12px;
            right: -12px;
            background-color: #ffffff;
            z-index: 1;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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

.cropper-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 添加陰影效果 */

    h3 {
        text-align: center;
        margin-bottom: 20px;
        /* 增加標題底部間距 */
        font-size: 20px;
        /* 調整標題字體大小 */
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        border: none;
        background-color: #4CAF50;
        color: white;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
            background-color: #45a049;
        }
    }
}
</style>
