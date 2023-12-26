<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import Swal from 'sweetalert2'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    data() {
        return {
            isCheckPage: false,

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            foundUser: null,

            //發文變數
            title: null,
            postContent: null,

            //圖片邏輯
            imageUrl: null,
            croppedImageUrl: null,
            showImageCropper: false, // 控制彈跳視窗顯示

        }
    },
    components: {
        ArticleDashBoard,
        VueCropper,
    },
    mounted() {
        this.searchAllUserInfo()
    },
    methods: {
        switch_check_page() {
            this.isCheckPage = !this.isCheckPage
        },

        //論壇 12.26玉翔
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
                        foundUser.filePath = filePath; // 將處理後的圖片路徑存儲在 foundUser 中的 filePath 屬性

                        this.$emit("userInfo", foundUser);
                        this.foundUser = foundUser; // 將整理後的 foundUser 存入 this.foundUser
                    } else {
                        console.log('找不到對應的使用者');
                    }
                });
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.imageUrl = event.target.result;
                this.showImageCropper = true;
            };
            reader.readAsDataURL(file);
        },
        saveCroppedImage() {
            this.cropper = this.$refs.cropper;
            const croppedCanvas = this.cropper && this.cropper.getCroppedCanvas();
            this.croppedImageUrl = croppedCanvas ? croppedCanvas.toDataURL('image/jpeg') : null;
            console.log('Cropped image saved:', this.croppedImageUrl);
            this.showImageCropper = false;
        },
        cancelImageCrop() {
            this.showImageCropper = false;
        },
        publishPost() {
            const postData = {
                userId: this.foundUser.userId,
                title: this.title,
                postContent: this.postContent,
                postPhoto: this.imageUrl.split(',')[1],
            };

            const requestData = {
                forumEntrance: postData
            };

            fetch('http://localhost:8080/api/adoption/createNewPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Post published:', data);

                    Swal.fire({
                        title: "成功新增貼文",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/ForumEntrance/ForumMyArticle');
                        }
                    });


                })
                .catch(error => {
                    console.error('Error publishing post:', error);
                });
        }

    },
}
</script>


<!-- 論談的人來看文章 -->
<template>
    <div class="all" v-if="foundUser">
        <div class="dashboard">
            <ArticleDashBoard />
        </div>
        <div class="rightArea">
            <div class="userInfo">
                <img class="userPhoto" :src="'data:image/jpeg;base64,' + foundUser.userPhoto" alt="">
                <div class="userNameAndId">
                    <p class="poster_name">{{ foundUser.userName }}</p>
                    <p class="poster_userId">{{ foundUser.account }}</p>
                </div>
            </div>
            <div class="articleArea">
                <input class="article_title" type="text" placeholder="輸入標題" v-model="title" />

                <div class="artitle_pic">
                    <input type="file" @change="handleFileChange">
                    <div class="cropper-modal" v-if="showImageCropper">
                        <vue-cropper v-if="imageUrl" :src="imageUrl" :key="imageUrl" ref="cropper"></vue-cropper>
                        <button @click="cancelImageCrop">取消</button>
                        <button @click="saveCroppedImage">保存</button>
                    </div>
                    <img :src="croppedImageUrl" alt="">
                </div>

                <div class="article_contain">
                    <textarea name="" id="" cols="30" rows="10" v-model="postContent"></textarea>
                </div>

                <button class="dashboard_btn" @click="switch_check_page()">
                    <i class="fa-solid fa-plus plus_icon"></i>
                    <div class="dashboard_btn_text">我要發文</div>
                </button>
            </div>
        </div>
    </div>
    <div class="check_post" v-if="isCheckPage">
        <div class="check_area">
            <div class="check_text">
                <p>確定送出?</p>
            </div>
            <div class="check_btn">
                <button class="cancal" @click="switch_check_page()">再考慮一下</button>
                <button @click="publishPost()" class="ok">好!現在就發</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.all {
    display: flex;
    margin-top: 25px;

    .dashboard {
        margin-left: 45px;
        margin-right: 45px;
    }

    .rightArea {
        width: 1200px;
        height: 600px;
        border-radius: 15px;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);

        .userInfo {
            display: flex;

            .userPhoto {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        }

        .articleArea {
            .article_title {}

            .artitle_pic {

                input[type="file"] {}

                .cropper-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #ffffff;
                    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
                    overflow: auto;

                    button {}
                }

                img {}
            }

            .article_contain {}

            .dashboard_btn {

                // 根據你的需求修改發文按鈕的樣式
                i {
                    // 根據你的需求修改圖示的樣式
                }

                .dashboard_btn_text {
                    // 根據你的需求修改按鈕文字的樣式
                }
            }
        }
    }

    .check_post {
        .check_area {
            // 根據你的需求修改確認視窗的樣式

            .check_text {
                // 根據你的需求修改確認文字的樣式
            }

            .check_btn {

                // 根據你的需求修改確認按鈕的樣式
                .cancal {
                    // 根據你的需求修改取消按鈕的樣式
                }

                .ok {
                    // 根據你的需求修改確認按鈕的樣式
                }
            }
        }
    }
}
</style>


