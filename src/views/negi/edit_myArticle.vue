<script>
import view_Article from './view_Article.vue';
import create_Article from './create_Article.vue';
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    data(){
        return{

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            postSerialNo: JSON.parse(sessionStorage.getItem('postSerialNo')),
            foundUser: null,
            userInfoList: null,
            updateDataList:null,
            article: {
                    userId: '',
                    userName: '',
                    account: '',
                    title: '',
                    description: '',
                    image: null,
            },

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            foundUser: null,

            imgChA: false,
            imgChB: true,

            //發文變數
            title: null,
            postContent: null,

            //圖片邏輯
            imageUrl: null,
            croppedImageUrl: null,
            showImageCropper: false, // 控制彈跳視窗顯示
        }
    },
    components:{
        view_Article, create_Article,
        ArticleDashBoard,
        VueCropper,
    },
    mounted() {
        this.groupAll()
        this.searchAllUserInfo()
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
    },
    methods:{
        // A是更新後的圖片 B是更新前的圖片
        // A預設是不顯示而B是顯示的
        showImgChange(){
            if (!this.imgChA) {
                this.imgChA = true;
                this.imgChB = true;
            }
        },
        //抓使用者+文章資料
        groupAll() {
            fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    const userInfoList = data.userInfoList;

                    fetch('http://localhost:8080/api/adoption/searchAllPost', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            const forumEntranceList = data.forumEntranceList;

                            // 使用 reduce 方法整合資訊
                            const integratedData = forumEntranceList.map(forumEntry => {
                                const userInfo = userInfoList.find(user => user.userId === forumEntry.userId);

                                // 創建一個新的物件整合所需的資訊
                                return {
                                    postContent: forumEntry.postContent,
                                    postPhoto: forumEntry.postPhoto,
                                    serialNo: forumEntry.serialNo,
                                    title: forumEntry.title,
                                    userId: forumEntry.userId,
                                    userName: userInfo.userName,
                                    userPhoto: userInfo.userPhoto,
                                    account: userInfo.account,
                                };
                            });

                            // 在這裡處理整合後的資料 integratedData
                            console.log(integratedData);
                            console.log(this.postSerialNo)
                            const specificUserArticles = integratedData.filter(entry => entry.serialNo === this.postSerialNo);
                            this.myArticle = specificUserArticles
                            console.log(this.myArticle)
                        });
                });
        },
        //更新文章
        updateArticle(){
            const updateData = {
                serialNo: this.postSerialNo,
                title: this.title,
                postContent: this.postContent,
                postPhoto: this.imageUrl.split(',')[1],
            };
            const requestData = {
                forumEntrance: updateData
            };
            fetch('http://localhost:8080/api/adoption/updatePost', {
                method:'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => {
                return response.json();
            })
            .then(data=>{
                console.log(data);
                this.updateDataList = data.updateDataList;
                console.log(this.updateDataList);
                Swal.fire({
                    title: "成功更新貼文",
                    icon: "success"
                })
            })
            .catch(error => {
                    console.error('Error publishing post:', error);
            });
        },

        //拿user資料
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

        //上傳檔案
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
    }

}
</script>


<!-- 發文的人編輯自己發的文章 -->
<template>
    <div class="all" v-if="myArticle">
        <!-- <div class="div-2"></div> -->
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
                        <div class="function_icon_area">
                            <i class="fa-solid fa-right-from-bracket img-2"></i>
                            <i class="fa-solid fa-floppy-disk img-3" @click="updateArticle"></i>
                        </div>
                        <div class="article">
                            <div class="poster_area">
                                <div class="poster">
                                    <div class="div-13">
                                        <div class="div-14">
                                            <div class="profileArea" v-if="foundUser">
                                                <img v-if="this.foundUser.userPhoto" :src="this.foundUser.filePath" alt=""
                                                    style="border-radius: 50%; border: 3px solid;" height="100px" width="100px">
                                                <div class="poster_data">
                                                    <p class="poster_name">{{ foundUser.userName }}</p>
                                                    <div class="toMid">
                                                        <div class="poster_icon" v-if="!this.foundUser.userPhoto"
                                                        style="border: 3px solid; height: 100px; width: 100px; border-radius: 50%;">
                                                        </div>
                                                    </div>
                                                    <p>@{{ foundUser.account }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <input class="article_title" type="text"  v-bind:placeholder="this.myArticle[0].title" v-model="title"/>
                            <input type="file" @change="handleFileChange" @click="showImgChange">
                    <div class="cropper-modal" v-if="showImageCropper">
                        <vue-cropper v-if="imageUrl" :src="imageUrl" :key="imageUrl" ref="cropper" class="cropper"></vue-cropper>
                        <button class="btm" @click="cancelImageCrop">取消</button>
                        <button class="btm" @click="saveCroppedImage">保存</button>
                    </div>
                    <!-- 更新的圖 更新上去後出現 -->
                    <div class="imgChA" id="imgChA" v-if="imgChA">
                        <img :src="croppedImageUrl" alt="" class="cropper-img">
                    </div>
                    <!-- 原本的圖 更新上去後消失-->
                    <div class="imgChB" id="imgChB" v-if="!imgChA && imgChB">
                        <img class="article_img" :src="'data:image/jpeg;base64,' + this.myArticle[0].postPhoto" alt="">
                    </div>
                            <div class="article_contain">
                                <textarea class="article_text" v-model="postContent" type="text"  v-bind:placeholder="this.myArticle[0].postContent"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
@import '../../assets/RStyle.scss';
.fa-solid :hover{
    width: 120%;
    height: 120%;
}
.fa-solid :active{
    width: 110%;
    height: 110%;
}
.cropper{
    width: 360px;
    height: 600px;
}
.btm{
        width: 100px;
        height: 50px;
    }
.cropper-img{
    width: 480px;
    height: 600px;
}
.all {
    width: 100vw;
    height: auto;
    padding-top: 3vmin;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 5vmin;
    display: flex;
    justify-content: space-between;
    background-color: #DDDFEE;
}

.out_contain {
    align-self: center;
    width: 100%;
}

@media (max-width: 991px) {
    .out_contain {
        max-width: 100%;
        margin-top: 40px;
    }
}

.in_contain {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .in_contain {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.dashboard {
    width: 13vw;
}

@media (max-width: 991px) {
    .dashboard {
        width: 100%;
    }
}


.out_article_area {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 80%;
}

@media (max-width: 991px) {
    .out_article_area {
        width: 100%;
    }
}

.in_article_area {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: end;
    width: 78vw;
    padding: 45px 0;
    height: auto;
    color: #978989;
    font-size: 14pt;
    padding: 20px 30px 20px 30px ;
}

@media (max-width: 991px) {
    .in_article_area {
        max-width: 100%;
        margin-top: 40px;
    }
}

.function_icon_area {
    display: flex;
    margin-right: 60px;
    width: 119px;
    max-width: 100%;
    padding-right: 5px;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .function_icon_area {
        margin-right: 10px;
    }
}

.img-2 {
    font-size: 32pt;
}

.img-3 {
    font-size: 32pt;
}

.article {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    margin: 57px 0 4px;
    padding: 0 18px;
}

@media (max-width: 991px) {
    .article {
        max-width: 100%;
        margin-top: 40px;
    }
}

.poster_area {
    align-self: stretch;
}

@media (max-width: 991px) {
    .poster_area {
        max-width: 100%;
        padding-right: 20px;
    }
}

.poster {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .poster {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.div-13 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 57%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .div-13 {
        width: 100%;
    }
}

.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 18px;
}

@media (max-width: 991px) {
    .div-14 {
        margin-top: 40px;
    }
}

.poster_icon {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 96px;
    overflow: hidden;
    max-width: 100%;
}

.poster_data {
    color: #978989;
    margin: auto 0;
    font: 800 32px Lexend, sans-serif;
}

.column-4 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 43%;
    margin-left: 20px;
}

@media (max-width: 991px) {
    .column-4 {
        width: 100%;
    }
}

.div-16 {
    display: flex;
    width: 100%;
    flex-grow: 1;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .div-16 {
        margin-top: 40px;
    }
}

.pet_state {
    color: #978989;
    margin-top: 69px;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 32px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_state {
        margin-top: 40px;
        white-space: initial;
    }
}

.pet {
    border-radius: 37px;
    background-color: #e9d2a6;
    align-self: stretch;
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 4px;
    padding: 14px 12px 0 24px;
}

@media (max-width: 991px) {
    .pet {
        padding-left: 20px;
    }
}

.pet_name {
    color: #fff;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 28px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_name {
        white-space: initial;
    }
}

.pet_type {
    aspect-ratio: 1.27;
    object-fit: contain;
    object-position: center;
    width: 147px;
    fill: #fff;
    overflow: hidden;
    margin-top: 10px;
    max-width: 100%;
}

.div-20 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 42px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-20 {
        max-width: 100%;
        margin-top: 40px;
    }
}

.article_title {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 27px 0 0 76px;
    font: 800 39px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_title {
        margin-left: 10px;
        white-space: initial;
    }
}

.article_img {
    aspect-ratio: 0.91;
    object-fit: contain;
    object-position: center;
    width: 480px;
    height: 600px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
    margin: 24px 0 0 66px;
}

@media (max-width: 991px) {
    .article_img {
        margin-left: 10px;
    }
}

.article_contain {
    color: #978989;
    align-self: start;
    width: 325px;
    max-width: 100%;
    margin: 36px 0 0 75px;
    font: 800 21px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_contain {
        margin-left: 10px;
    }
}

.div-23 {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 151px 0 0 23px;
    font: 800 28px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .div-23 {
        white-space: initial;
        margin: 40px 0 0 10px;
    }
}

.div-24 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 11px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-24 {
        max-width: 100%;
    }
}

.reply {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 34px 0 0 23px;
    flex-direction: column;
}

@media (max-width: 991px) {
    .reply {
        margin-left: 10px;
    }
}

.replier_img {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.replier {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    /* flex-direction: column; */
}

.replier_data {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.replier_text {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.replier_replier {
    align-self: start;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0px;
    margin: 8px 0 0 90px;
}

@media (max-width: 991px) {
    .replier_replier {
        margin-left: 10px;
        justify-content: center;
    }
}

.img-8 {
    aspect-ratio: 0.03;
    object-fit: contain;
    object-position: center;
    width: 2px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
}

.img-9 {
    aspect-ratio: 5.33;
    object-fit: contain;
    object-position: center;
    width: 80px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    margin-top: 57px;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img-9 {
        margin-top: 40px;
    }
}

.replier_replier_img {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    align-self: end;
    margin-top: 26px;
    max-width: 100%;
}

.replier_replier_data {
    align-self: center;
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
    margin: auto 0;
}

.div-31 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-32 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.div-33 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 16px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-33 {
        max-width: 100%;
    }
}

.div-34 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 24px 0 0 23px;
}

@media (max-width: 991px) {
    .div-34 {
        margin-left: 10px;
    }
}

.img-11 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-35 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-36 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-37 {
    color: #978989;
    margin-top: 11px;
    font: 800 21px Lexend, sans-serif;
}

.div-38 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 33px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-38 {
        max-width: 100%;
    }
}

.div-39 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 30px 0 0 23px;
}

@media (max-width: 991px) {
    .div-39 {
        margin-left: 10px;
    }
}

.img-12 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-40 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-41 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-42 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.article_text{
    width: 600px;
    height: 400px;
}
</style>