<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
export default {
    data(){
        return{
            userId: 0,
            userName: '',
            account: '',
            title: '',
            description: '',
            isCheckPage:false
        }
    },
    components:{
        ArticleDashBoard
    },
    methods:{
        fetchCreateData() {
            const postTime = new Date();
            console.log(postTime);
            const requestData = {
                article: {
                    userId: 55,
                    userName: '修輔',
                    account: 'k299443977',
                    title: this.title,
                    description: this.description,
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
                console.log('Create success:',requestData.article);
            })
            .catch(error => {
                console.error('Error creating:', error);
            });
        },
        switch_check_page(){
            this.isCheckPage = !this.isCheckPage
        },
        handleFiles() {
            const uploadButton = document.getElementById('upload');
            const imgDOM = document.getElementById('upload-image');
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

        getFileBase64Encode(blob) {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            });
        },
    },
}
</script>


<!-- 論談的人來看文章 -->
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
                                            <img loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a90f93bf046cb34155d14545eaf092cbb5340f95d7851405d718068990aeece?"
                                                class="poster_icon" />
                                            <div class="poster_data">
                                                <p class="poster_name" id="poster_name">短腿貓的爸</p>
                                                <!-- 短腿貓的爸<br /> -->
                                                <p class="poster_userId" id="poster_userId">@wei0113__</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column-4">
                                        <div class="div-16">
                                            <div class="pet_state">with</div>
                                            <div class="pet">
                                                <div class="pet_name">Kiwi</div>
                                                <img loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5229e6b9f8129729e04753274f9898cd171972f078ea719bd686b4bf738bc61a?"
                                                    class="pet_type" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <input class="article_title" type="text" placeholder="輸入標題" v-model="title"/>
                            <!-- <div class="article_title">好像養了一隻迷因貓</div> -->
                            <img loading="lazy" 
                            class="article_img" 
                            id="upload-image"/>
                            <!-- <input class="article_file" type="file" accept="image/*"/> -->
                            <input
                                id="upload"
                                class="article_file"
                                type="file"
                                accept="image/*"
                                @change="handleFiles"
                            />
                            <div class="article_contain">
                                <textarea class="article_text" v-model="description" type="text" placeholder="輸入內文"></textarea>
                                <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fugiat odio nostrum tempore, quisquam incidunt, reiciendis quas eveniet mollitia deleniti eos dolore aliquam quibusdam consequuntur totam possimus asperiores, unde maiores.</p> -->
                                <!-- 先上最愛的一張照片，<br />快樂迷因仔，<br />不知道是不是腿短又肥肥的，<br />每次覺得睡覺阿腿都很可愛<br />就是一隻小笨貓<br />哈哈 -->
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

<style scoped>

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
