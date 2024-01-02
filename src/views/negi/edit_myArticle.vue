<script>
import view_Article from './view_Article.vue';
import create_Article from './create_Article.vue';
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    data() {
        return {

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            postSerialNo: JSON.parse(sessionStorage.getItem('postSerialNo')),
            foundUser: null,
            userInfoList: null,
            updateDataList: null,
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
            myArticle: null,
        }
    },
    components: {
        view_Article, create_Article,
        ArticleDashBoard,
        VueCropper,
    },
    mounted() {
        this.groupAll()
        this.searchAllUserInfo()
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
    },
    methods: {
        showImgChange() {
            if (!this.imgChA) {
                this.imgChA = true;
                this.imgChB = true;
            }
        },
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

                            const integratedData = forumEntranceList.map(forumEntry => {
                                const userInfo = userInfoList.find(user => user.userId === forumEntry.userId);

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

                            const specificUserArticles = integratedData.filter(entry => entry.serialNo === this.postSerialNo);
                            this.myArticle = specificUserArticles
                            this.title = specificUserArticles[0].title
                            this.postContent = specificUserArticles[0].postContent
                        });
                });
        },
        updateArticle() {
            let updateData;
            if (this.imageUrl) {
                updateData = {
                    serialNo: this.postSerialNo,
                    title: this.title,
                    postContent: this.postContent,
                    postPhoto: this.imageUrl.split(',')[1],
                };
            } else {
                updateData = {
                    serialNo: this.postSerialNo,
                    title: this.title,
                    postContent: this.postContent,
                };
            }
            const requestData = {
                forumEntrance: updateData
            };
            fetch('http://localhost:8080/api/adoption/updatePost', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.updateDataList = data.updateDataList;
                    console.log(this.updateDataList);
                    Swal.fire({
                        title: "成功更新貼文",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/ForumEntrance/ForumMyArticle')
                        }
                    });


                })
                .catch(error => {
                    console.error('Error publishing post:', error);
                });
        },

        searchAllUserInfo() {
            fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.userInfoList = data.userInfoList;
                    const foundUser = this.userInfoList.find(user => user.userId === this.foundUserInfo.userId);

                    if (foundUser) {

                        const base64Prefix = 'data:image/jpeg;base64,';
                        const filePath = base64Prefix + foundUser.userPhoto;
                        foundUser.filePath = filePath;

                        this.$emit("userInfo", foundUser);
                        this.foundUser = foundUser;
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
                this.croppedImageUrl = event.target.result;
            };
            reader.readAsDataURL(file);
        },
    }
}
</script>


<template>
    <div class="all" v-if="this.myArticle">
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
                        <div class="function_icon_area">
                            <i class="fa-solid fa-floppy-disk img-3" @click="updateArticle"></i>
                        </div>
                        <div class="article">
                            <div class="poster_area">
                                <div class="poster">
                                    <div class="div-13">
                                        <div class="div-14">
                                            <div class="profileArea" v-if="foundUser">
                                                <img v-if="this.foundUser.userPhoto" :src="this.foundUser.filePath" alt=""
                                                    style="border-radius: 50%; border: 3px solid;" height="100px"
                                                    width="100px">
                                                <div class="poster_data">
                                                    <p class="poster_name">{{ foundUser.userName }}</p>
                                                    <p>@{{ foundUser.account }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <input class="article_title" type="text" v-bind:placeholder="this.myArticle[0].title"
                                v-model="title" />
                            <input type="file" @change="handleFileChange" @click="showImgChange">
                            <div class="imgChA" id="imgChA" v-if="imgChA">
                                <img :src="croppedImageUrl" alt="" class="cropper-img">
                            </div>
                            <div class="imgChB" id="imgChB" v-if="!imgChA && imgChB">
                                <img class="article_img" :src="'data:image/jpeg;base64,' + this.myArticle[0].postPhoto"
                                    alt="">
                            </div>
                            <div class="article_contain">
                                <textarea class="article_text" v-model="postContent" type="text"
                                    v-bind:placeholder="this.myArticle[0].postContent"></textarea>
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

.fa-solid :hover {
    width: 120%;
    height: 120%;
}

.fa-solid :active {
    width: 110%;
    height: 110%;
}

.cropper {
    width: 360px;
    height: 600px;
}

.btm {
    width: 100px;
    height: 50px;
}

.cropper-img {
    width: 550px;
    height: 300px;
    border-radius: 15px;
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



.in_contain {
    gap: 20px;
    display: flex;
}



.dashboard {
    width: 13vw;
}




.out_article_area {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 80%;
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
    padding: 20px 30px 20px 30px;
}



.function_icon_area {
    display: flex;
    margin-left: 15px;
    width: 119px;
    max-width: 100%;
    padding-right: 5px;
    justify-content: space-between;
    gap: 20px;
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



.poster_area {
    align-self: stretch;
}



.poster {
    gap: 20px;
    display: flex;
}



.div-13 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 57%;
    margin-left: 0px;
}



.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 18px;

    .profileArea {
        display: flex;

        img {
            margin-right: 30px;
        }
    }
}

.poster_data {
    width: 950px;
    justify-content: space-between;
    display: flex;
    color: #978989;
    margin: auto 0;
    font: 800 32px Lexend, sans-serif;
}


.div-20 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 42px;
    height: 5px;
}



.article_title {
    width: 550px;
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin-top: 15px;
    font: 800 39px Lexend, sans-serif;
    margin-bottom: 15px;
}



.article_img {
    aspect-ratio: 0.91;
    object-fit: contain;
    object-position: center;
    width: 550px;
    height: 300px;
    border-radius: 15px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    align-self: start;
    max-width: 100%;

}


.article_contain {
    color: #978989;
    align-self: start;
    width: 325px;
    max-width: 100%;
    font: 800 21px Lexend, sans-serif;
}


.article_text {
    margin-top: 15px;
    width: 550px;
    height: 400px;
    border-radius: 15px;
}
</style>