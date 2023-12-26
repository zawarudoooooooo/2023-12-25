<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            dog: "M149.365 19.2302H130.094L127.938 15.0094C127.138 13.4416 125.908 12.1231 124.386 11.2015C122.864 10.2799 121.11 9.79175 119.321 9.79163H103.176L94.9617 1.74528C91.9236 -1.22786 86.7356 0.878115 86.7356 5.08121V49.2772L125.277 62.7595V52.265H134.912C145.556 52.265 154.182 43.8146 154.182 33.388V23.9494C154.182 21.342 152.026 19.2302 149.365 19.2302ZM115.641 33.388C112.98 33.388 110.824 31.2761 110.824 28.6687C110.824 26.0613 112.98 23.9494 115.641 23.9494C118.303 23.9494 120.459 26.0613 120.459 28.6687C120.459 31.2761 118.303 33.388 115.641 33.388ZM28.9242 56.9843C23.6128 56.9843 19.289 52.7488 19.289 47.5458C19.289 42.3339 14.9742 38.1072 9.65379 38.1072C4.33333 38.1072 0.0185547 42.3339 0.0185547 47.5458C0.0185547 59.8336 8.09709 70.213 19.289 74.1212C19.289 74.1212 19.289 134.604 19.289 137.212C19.289 139.819 21.4449 141.931 24.1066 141.931H43.3771C46.0388 141.931 48.1947 139.819 48.1947 137.212V104.177H96.3709V137.212C96.3709 139.819 98.5267 141.931 101.188 141.931H120.459C123.121 141.931 125.277 139.819 125.277 137.212V72.7791L80.1265 56.9843H28.9242Z",
            cat: "M83.3225 39.3704C77.5361 39.3704 52.6931 39.847 36.7016 60.0611V39.3704C36.7016 26.6261 24.3546 16.2603 9.17467 16.2603C4.108 16.2603 -0.000976562 19.7099 -0.000976562 23.9636C-0.000976562 28.2173 4.108 31.667 9.17467 31.667C14.2328 31.667 18.3503 35.1239 18.3503 39.3704V100.997C18.3503 109.495 26.5797 116.404 36.7016 116.404H87.1677C89.7025 116.404 91.7555 114.68 91.7555 112.552V108.701C91.7555 104.447 87.6466 100.997 82.5799 100.997H73.4042L110.107 77.8872V112.552C110.107 114.68 112.16 116.404 114.695 116.404H123.87C126.405 116.404 128.458 114.68 128.458 112.552V62.9282C125.508 63.571 122.468 64.0211 119.282 64.0211C101.559 64.0211 86.7319 53.417 83.3225 39.3704ZM128.458 16.2603H110.107L91.7555 0.853516V33.2077C91.7555 45.9712 104.08 56.3178 119.282 56.3178C134.485 56.3178 146.809 45.9712 146.809 33.2077V0.853516L128.458 16.2603ZM107.813 35.5187C105.278 35.5187 103.225 33.795 103.225 31.667C103.225 29.5389 105.278 27.8153 107.813 27.8153C110.348 27.8153 112.401 29.5389 112.401 31.667C112.401 33.795 110.348 35.5187 107.813 35.5187ZM130.752 35.5187C128.217 35.5187 126.164 33.795 126.164 31.667C126.164 29.5389 128.217 27.8153 130.752 27.8153C133.287 27.8153 135.34 29.5389 135.34 31.667C135.34 33.795 133.287 35.5187 130.752 35.5187Z",
            pets: [
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "a; b; c; d",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "很健康; 親人親貓; 貪吃",
                    adoption_status: "正常",
                    adoption_conditions: "",
                    age: "三個月",
                    vaccine: "三合一疫苗, 狂犬病疫苗",
                    pet_profile: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum assumenda cumque amet molestias sapiente id provident perferendis voluptatibus aliquid quia ea praesentium totam eveniet aspernatur, nobis, quod.",
                    ligation: false,
                    type: "狗",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "送養中",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "五合一疫苗, 狂犬病疫苗",
                    pet_profile: "",
                    ligation: true,
                    type: "貓",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
            ],

            isCheckPage:false,

            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            foundUser: null,
            userInfoList: null,
            article: {
                    userId: '',
                    userName: '',
                    account: '',
                    title: '',
                    description: '',
                    image: null,
            },
        }
    },
    components:{
        ArticleDashBoard
    },
    mounted() {
        this.searchAllUserInfo()
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
        this.getData()
    },
    methods:{
        //主要發文功能
        fetchCreateData() {
            const postTime = new Date();
            const file = document.querySelector('input[type="file"]').files[0];
            const reader = new FileReader();//用來讀取文件內容

            reader.onloadend = () => {//當文件加载完成时執行此事件
                const arrayBuffer = reader.result;//result 將以 ArrayBuffer 物件來表示讀入的資料內容。
                const bytes = new Uint8Array(arrayBuffer);//使用 Uint8Array 來表示二進制數據的一種類型。

            const requestData = {
                article: {
                    userId: this.foundUser.userId,
                    userName: this.foundUser.userName,
                    account: this.foundUser.account,
                    title: this.title,
                    description: this.description,
                    image: Array.from(bytes), // Convert Uint8Array to a regular array for JSON serialization
                },
            };
            fetch('http://localhost:8080/api/adoption/postArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Swal.fire('新增成功!');
            })
            .catch(error => {
                console.error('Error creating:', error);
            });
        };
        reader.readAsArrayBuffer(file);
        },

        //開關發文確認視窗
        switch_check_page(){
            this.isCheckPage = !this.isCheckPage
        },
        //預覽圖片
        handleFiles() {
            const uploadButton = document.getElementById('upload');
            const imgDOM = document.getElementById('article-img');
            const fileList = uploadButton.files;
            const [file] = fileList;
            const p1 = this.createImageFromFile(imgDOM, file);
            const p2 = this.getFileBase64Encode(file);
            Promise.all([p1, p2])
            .then(([img, b64]) => {
                img.width = 360;
                img.height = 400;
            })
            .catch(error => {
            console.error(error);
            }
            );
        },
        //放圖片
        createImageFromFile(img, file) {
            return new Promise((resolve, reject) => {
            img.src = URL.createObjectURL(file);
            img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img);
            };
            img.onerror = () => reject('Failure to load image.');
            });
        },
        //圖片轉碼
        getFileBase64Encode(blob) {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
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

        getData(){
            this.userId = this.userInfo.userId;
            this.pets = [];
            console.log("emit id", this.userId)

            axios.get('http://localhost:8080/api/adoption/petInfo/getPetInfo', {
                params: {
                    "userId": this.userId
                }
            })
            .then( response => {
                console.log(response.data)
                this.pets = response.data.petInfoList
                sessionStorage.setItem("petInfo", JSON.stringify(this.pets))
            })
            .catch( error => {
                console.error(error);
            })
        },
        getPath(type){
            if(type == "狗"){
                return this.dog;
            }
            if(type == "貓"){
                return this.cat;
            }
        },
    },
}
</script>


<!-- 論壇的人來看文章 -->
<template>
    <div class="all">
        <!-- <div class="div-2"></div> -->
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
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
                                    <div class="middle">
                                        <div class="pet_state">with</div>
                                        <div class="showCard" v-for="(item, index) in pets.slice(0, 1)">
                                            <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="middleCard">
                                            <h3>{{ item.pet_name }}</h3>
                                            <svg width="155" height="142" viewBox="0 0 155 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path :d="getPath(item.type)" fill="white"/>
                                            </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <input class="article_title" type="text" placeholder="輸入標題" v-model="title"/>
                            <img loading="lazy" 
                            class="article_img" 
                            id="article-img"/>
                            <input
                                id="upload"
                                class="article_file"
                                type="file"
                                accept="image/*"
                                @change="handleFiles"
                            />
                            <div class="article_contain">
                                <textarea class="article_text" v-model="description" type="text" placeholder="輸入內文"></textarea>
                            </div>
                            <button class="dashboard_btn">
                                <i class="fa-solid fa-plus plus_icon"></i>
                                <div class="dashboard_btn_text" @click="switch_check_page()">我要發文</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="check_post" v-if="isCheckPage == true">
        <div class="bg">
            <div class="check_area">
                <div class="check_text">
                    <p>確定送出?</p>
                </div>
                <div class="check_btn">
                    <button class="cancal" @click="switch_check_page()">再考慮一下</button>
                    <button class="ok" @click="fetchCreateData()">好!現在就發</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/RStyle.scss';
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

.check_post {

    /* position: relative; */
    .bg {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: #eaeaea62;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .check_area {
        width: 60%;
        height: 50%;
        border: 1px solid black;
        border-radius: 20px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        /* position: absolute; */
        /* left: 500px; */
        .check_text {
            font-size: 26pt;
            /* margin-bottom: 250px; */
        }

        .check_btn {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cancal{
            border-radius: 35px;
            /* box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28); */
            color: white;
            align-self: stretch;
            display: flex;
            margin: 110px 80px;
            justify-content: center;
            align-items: center;
            gap: 11px;
            padding: 17px 21px;
            background-color: #a2a3ab;
        }
        .ok{
            border-radius: 35px;
            /* box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28); */
            color: white;
            align-self: stretch;
            display: flex;
            margin: 110px 80px;
            justify-content: center;
            align-items: center;
            gap: 11px;
            padding: 17px 21px;
            background-color: #6e75a8;
        }
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
    height: 13vw;
}

@media (max-width: 991px) {
    .dashboard {
        width: 100%;
    }
}

.dashboard_btn {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #6e75a8;
    align-self: stretch;
    display: flex;
    margin-top: 111px;
    justify-content: center;
    align-items: center;
    gap: 11px;
}

@media (max-width: 991px) {
    .dashboard_btn {
        /* padding-left: 20px; */
        margin-top: 40px;
    }
}

.plus_icon {
    font-size: 18pt;
    color: white;
}

.dashboard_btn_text {
    color: #fff;
    text-align: right;
    font: 800 31px Lexend, sans-serif;
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

.middle{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    .middleCard{
        width: 250px;
        height: 150px;
        display: flex;
        border-radius: 30px;
        padding: 20px 20px 20px 20px;
        margin: 15px 25px 15px 25px;
        color: white;
    }
    .yellowCard{
        background-color: $primary;
        &:hover{
            background-color: $primaryBgc;
            transition: 0.5s;
        }
    }
    .redCard{
        background-color: $give;
        &:hover{
            background-color: $giveBgc;
            transition: 0.5s;
        }
    }
    .greenCard{
        background-color: $adoption;
        &:hover{
            background-color: $adoptionBgc;
            transition: 0.5s;
        }
    }
}

.showCard {
    display: flex;
    width: 100%;
    flex-grow: 1;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .showCard {
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

.article_file {
    margin-left: 65px;
}

.article_img {
    aspect-ratio: 0.91;
    object-fit: contain;
    object-position: center;
    width: 369px;
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

.article_text{
    width: 600px;
    height: 400px;
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
</style>
