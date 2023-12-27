<script>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')), //儲存資訊
            newInfoList: null,//用來存儲新訊息列表
            marqueeTitles: [], // 新增一個屬性用來存儲跑馬燈標題
        }
    },
    beforeCreate() {
    },

    mounted() {//生命周期(mounted)：被創建之後，會調用方法，用於初始的搜尋。
        this.searchAllNewInfo()
        // 設置跑馬燈標題
        this.setMarqueeTitles();
    },
    computed: {
        // 計算每次包含三個項目的 newInfoList 塊
        newInfoListShow() {
            const newInfoListSize = 3;
            const newInfoListMore = [];
            for (let i = 0; this.newInfoList && i < this.newInfoList.length; i += newInfoListSize) {
                newInfoListMore.push(this.newInfoList.slice(i, i + newInfoListSize));
            }
            return newInfoListMore;
        },
    },

    methods: {
        goLoginIn() {
            this.$router.push('/Login')
        },
        goProfile() {
            this.$router.push('/Profile')
        },
        //搜尋最新消息
        searchAllNewInfo() {
            fetch('http://localhost:8080/api/adoption/searchAllNewUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    //將處理後的數據賦值給組件的 newInfoList 屬性
                    this.newInfoList = data.newInfoList.map(info => {
                        if (info.image) { //如果項目有圖片，則在原始項目的基礎上加上 base64Image 屬性，其值為包含圖片前綴的 base64 字符串。
                            const base64Prefix = 'data:image/jpeg;base64,';
                            return { ...info, base64Image: base64Prefix + info.image };
                        } else {
                            return info;
                        }
                    });

                    // 將 newInfoList 按日期由最新到最舊排序
                    this.newInfoList.sort((a, b) => new Date(b.date) - new Date(a.date));

                    this.setMarqueeTitles();//處理完數據用此方法

                })
                .catch(error => {
                    // 處理錯誤
                    console.error('Error fetching data:', error);
                });
        },
        // 截斷內容，消息列表中顯示簡短的摘要。
        //content：要截斷的內容字符串。length：希望保留的最大長度。
        truncateContent(content, length) {//檢查 content 的長度是否超過指定的 length
            if (content.length > length) { //如果 content 的長度大於 length，則使用 content.slice(0, length) 截取字符串的前 length 個字符。
                return content.slice(0, length) + '...... 查看更多';
            } else { //如果 content 的長度未超過 length，則直接返回原始的 content。
                return content;
            }
        },

        // 展示完整內容，使用 SweetAlert2
        expandCard(newInfo) {
            Swal.fire({
                title: newInfo.title,
                //透過 HTML 字符串設置卡片的內容，包含類別、日期、內容和圖片。
                html: `
                <p style="font-size:17pt;">Category: ${newInfo.category}</p>
                <p style="font-size:17pt;">Date: ${newInfo.date}</p>
                <p style="line-height: 1.5;font-size:17pt;">${newInfo.content}</p>
                <img src="${newInfo.base64Image}" alt="New Info Image" style="max-width: 100%;padding-left: 0; padding-right: 0; padding-bottom: 0;">
            `,
                showCloseButton: true,//顯示關閉按鈕
                showConfirmButton: false,//不顯示確認按鈕
                width: '60%', // 調整內容區塊的寬度

            });
        },

        // 設置跑馬燈的標題
        setMarqueeTitles() {
            // 如果 newInfoList 存在，且有三個以上的項目，則隨機選擇三個標題
            if (this.newInfoList && this.newInfoList.length >= 3) {
                //使用 getRandomIndices 方法獲取三個隨機的索引
                const randomIndices = this.getRandomIndices(this.newInfoList.length, 3);
                // 使用這些隨機索引從 newInfoList 中選擇標題，並賦值給 marqueeTitles
                this.marqueeTitles = randomIndices.map(index => this.newInfoList[index].title);
            }
        },

        // 新增方法來獲取指定數量的隨機索引，生成並返回一個包含指定數量的不重複隨機索引的陣列
        getRandomIndices(max, count) {
            const indices = [];// 創建一個空陣列，用於存儲隨機索引
            // 使用 while 循環，直到獲取到指定數量的隨機索引，或者已經獲取了所有可能的索引
            while (indices.length < count && indices.length < max) {
                // 生成一個介於 0 和 max 之間的隨機整數
                const randomIndex = Math.floor(Math.random() * max);
                // 檢查生成的隨機索引是否已經存在於 indices 陣列中
                if (!indices.includes(randomIndex)) {
                    // 如果不存在，將它添加到 indices 陣列中
                    indices.push(randomIndex);
                }
            }
            return indices;// 返回包含指定數量的隨機索引的陣列
        },

        //跳轉至全部的消息頁NewInfoAll
        goTo(x) {
            this.$router.push(x)
        }

    }

}
</script>



<template>
    <!-- 跑馬燈 -->
    <div class="marquee">
        <!-- 喇叭圖示 -->
        <img loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06062d6238a6691ea533dbc096994639c6e1407d07d6742eb34d44f9d98fe771?"
            class="trumpet" />
        <!-- 最新消息標題 -->
        <div v-for="title in marqueeTitles" :key="title" class="marquee-item">{{ title }}</div>
    </div>
    <div class="topCarousel"></div>
    <!-- 輪播 -->
    <!-- carousel-fade 表示使用淡入淡出的效果 -->
    <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="TitleArea">
            <h1 class="strokeText" data-storke="毛起來愛" id="title">furry child love</h1>
        </div>
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item" data-bs-interval="3000">
                <img src="https://article.murata.com/sites/default/files/styles/large/public/static/ja-jp/images/article/iot-changes-life-with-pets/iot-changes-life-with-pets-main.jpg?itok=fXIwQlD2"
                    class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item active" data-bs-interval="3000">
                <img src="../../public/首頁貓.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="3000">
                <img src="../../public/首頁狗.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
    </div>
    <div class="contentArea">

        <!-- 喇叭圖示 -->
        <!-- <img loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06062d6238a6691ea533dbc096994639c6e1407d07d6742eb34d44f9d98fe771?"
                            class="img-2" /> -->

        <!-- 輪播 -->
        <div id="carouselNewInfo" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <!-- 循環遍歷 newInfoList 並每次顯示三張卡片 -->
                <div v-for="(newInfoList, index) in newInfoListShow" :key="index"
                    :class="['carousel-item', index === 0 ? 'active' : '']">
                    <div class="searchAllNewInfo">
                        <!-- 每個 newInfo 對象都被用來生成一個消息卡片。v-for 根據 newInfoList 的內容動態生成消息卡片。 -->
                        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card"
                            @click="expandCard(newInfo)">
                            <div>
                                <div class="info-card2">
                                    <h2>{{ newInfo.title }}</h2>
                                    <p>Category: {{ newInfo.category }}</p>
                                    <p>Date: {{ newInfo.date }}</p>
                                    <!-- 使用截斷內容的方法 -->
                                    <p>{{ truncateContent(newInfo.content, 46) }}</p>
                                </div>
                            </div>
                            <div class="imgArea">
                                <!-- 如果 newInfo.base64Image 存在，則顯示一個圖片。 -->
                                <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 左右輪播控制按鈕 -->
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselNewInfo" data-bs-slide="prev">
                <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselNewInfo" data-bs-slide="next">
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
        <div class="infoMoreBtnArea">
            <button class="infoMoreBtn" @click="goTo('/NewInfoAll')">查看更多消息</button>
        </div>
    </div>
</template>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.marquee {
    overflow: hidden; //溢出隱藏
    white-space: nowrap; //避免換行，單行顯示
    animation: marquee-scroll 20s linear infinite; //動畫時間為 20 秒，動畫效果為線性，且無限循環
    height: 5vh;
    display: flex;
    align-items: center;
}

.trumpet {
    width: 30px;
    height: 30px;
    margin-right: 20px;
}

.marquee-item {
    display: inline-block; //將元素設置為內聯塊元素，使其既具有塊元素的特性又不會破壞文本流
    margin-right: 20px;
    font-size: 20px;
    color: #756a6a;
}

@keyframes marquee-scroll {
    from {
        //起始
        transform: translateX(100%);
    }

    to {
        //結束
        transform: translateX(-100%);
    }
}


//輪播圖片大小
.carousel-item {
    width: 100%;
    height: 82vh;
    position: relative
}

//輪播指示器按鈕位置
.carousel-indicators {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 35vw;
}

//輪播指示器按鈕改為圓形
.carousel-indicators button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    /* 將長方形轉換為圓形 */
    border: 1px solid #050505;
    margin: 0 10px;
    /* 調整圓形之間的間距 */
    background-color: white;
    cursor: pointer;
}

//輪播按鈕活動時
.carousel-indicators .active {
    background-color: #fff;
    width: 12px;
    height: 12px;

}

.TitleArea{
    width: 20vw;

.strokeText {
    font-family: 'Pacifico', cursive;
    font-weight: 700;
    font-size: 7vw;
    color: #ffffff;
    z-index: 100;
    position: absolute;
    top: 10vh;
    left: 5vw;

}
}
.contentArea {
    position: relative;
    background-color: #F8F5EE;
}



.searchAllNewInfo {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    padding: 0 30px;
}

.info-card {
    height: 65%;
    border: 1px solid #ddd;
    border-radius: 30px;
    margin: 20px 1px 0px 1px;
    background-color: white;
    color: #978989;
    font-size: 14pt;
    box-shadow: 0 0 3px 5px rgb(202, 202, 202);
    width: calc(33.33% - 20px);
    /* 調整每個消息卡片的寬度，這裡假設每行三個 */
    box-sizing: border-box;
    transition: all 0.4s; //過渡效果，持續時間為 0.4 秒

    &:hover {
        transform: scale(1.03);
        border: 5px solid#978989;

    }
}

//消息卡片內容的區塊
.info-card2 {
    padding: 20px 20px 0px 20px;

}

.info-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #867e7e;
}

.imgArea {
    vertical-align: middle;
    border-radius: 0px 0px 30px 30px;
    width: 100%;
    padding: 0;
}

.info-card img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    border-radius: 0px 0px 30px 30px;
    /* 设置圆角 上右下左 */
    padding: 0;
    background-size: cover;
}

.info-card {
    transition: box-shadow 0.8s; // 添加過渡效果
    cursor: pointer;
}

.info-card:hover {
    box-shadow: 3px 3px 5px gray; // 放大效果
}



.fa-arrow-left,
.fa-arrow-right {
    background-color: #E9D2A6;
    border-radius: 50%;
    padding: 2vh 1vw;
    font-size: 40pt;
    box-shadow: 0px 5px 10px #000000;
    transition: all 0.3s;
    color: #ffffff;

    &:hover {
        // background-color: #E9D2A6;
        // box-shadow: 0px 15px 25px -5px #0057ab;
        background-color: #ffffff;
        color: #E9D2A6;
        box-shadow: 0px 2px 10px 5px #E9D2A6;
        transform: scale(1.03);

    }
}

.fa-arrow-left {
    margin-right: 150px;
    margin-bottom: 220px;
}

.fa-arrow-right {
    margin-left: 150px;
    margin-bottom: 220px;

}

.infoMoreBtnArea {
    position: absolute;
    left: 45vw;
    bottom: 6vh;

    .infoMoreBtn {
        padding: 15px 20px;
        font-size: 1vw;
        border-radius: 1vw;
        background-color: #c29f5d;
        color: #ffffff;

        box-shadow: 0 0 3px 2px lightgray;
        font-weight: 600;

        &:hover {
            box-shadow: 0px 10px 5px -5px #0e0e0e;
            transform: scale(1.03);
            background-color: #E9D2A6;
            font-weight: 700;
        }

    }
}

.footer {
    width: 100%;
    height: 100px;

}
</style>