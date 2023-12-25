<script>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')), //儲存資訊
            newInfoList: null,//用來存儲新訊息列表
        }
    },
    beforeCreate() {
    },

    mounted() {//生命周期(mounted)：被創建之後，會調用方法，用於初始的搜尋。
        this.searchAllNewInfo()
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
        }
    }

}
</script>



<template>
    <!-- 輪播 -->
    <!-- carousel-fade 表示使用淡入淡出的效果 -->
    <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
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
        <div class="div">
            <div class="div-3">
                <div class="div-4">
                    <div class="column">
                        <!-- 喇叭圖示 -->
                        <img loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06062d6238a6691ea533dbc096994639c6e1407d07d6742eb34d44f9d98fe771?"
                            class="img-2" />
                    </div>
                    <div class="column-2">
                        <div class="div-5">Announce(平台入口)</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="searchAllNewInfo">
            <!-- 每個 newInfo 對象都被用來生成一個消息卡片。v-for 根據 newInfoList 的內容動態生成消息卡片。 -->
            <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card" @click="expandCard(newInfo)">
                <div>
                    <div class="info-card2">
                        <h2>{{ newInfo.title }}</h2>
                        <p>Category: {{ newInfo.category }}</p>
                        <p>Date: {{ newInfo.date }}</p>
                        <!-- 使用截斷內容的方法 -->
                        <p>{{ truncateContent(newInfo.content, 46) }}</p>
                    </div>
                </div>
                <div>
                    <!-- 如果 newInfo.base64Image 存在，則顯示一個圖片。 -->
                    <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />
                </div>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>



<style lang="scss" scoped>
body {
    position: relative;

}


.carousel {
    width: 100%;
    height: 80%;
    position: fixed;
    top: 0;
    overflow: hidden; //溢出隱藏
}

//輪播指示器按鈕位置
.carousel-indicators {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 35vw;
}
//輪播指示器按鈕改為圓形
.carousel-indicators button {
    width: 10px;
    height: 10px;
    border-radius: 50%;    /* 將長方形轉換為圓形 */
    border: 1px solid #050505;
    margin: 0 10px;    /* 調整圓形之間的間距 */
    background-color: white;
    cursor: pointer;
}

//輪播按鈕活動時
.carousel-indicators .active {
    background-color: #fff;
    width: 12px;
    height: 12px;

}

//喇叭圖示和平台入口的區塊
.div {
    // background-color: #fff;
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
}
//喇叭圖示和平台入口的區塊
.div-3 {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    align-self: center;
    width: 1304px;
    max-width: 100%;
    margin: 58px 0 -23px;
    padding: 10px 0 25px 175px;
    z-index: 1;
}

.div-4 {
    gap: 20px;//兩者之間有間距
    display: flex;
}



.column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 23%;
    margin-left: 0px;
}

.contentArea {
    position: relative;
    top: 60vh;
    background-color: #F8F5EE;
}


.img-2 {
    aspect-ratio: 1.11;
    object-fit: contain;
    object-position: center;
    width: 60px;
    overflow: hidden;
    max-width: 100%;
}



.column-2 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 77%;
    margin-left: 20px;
}



.div-5 {
    color: #978989;
    margin-top: 16px;
    white-space: nowrap;
    font: 800 40px Lexend, sans-serif;
}

.searchAllNewInfo {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    padding: 0 30px;
}

.info-card {
    border: 1px solid #ddd;
    border-radius: 30px;
    margin: 20px 1px 0px 1px;
    background-color: white;
    color: #978989;
    font-size: 14pt;
    box-shadow: 0 0 3px 5px rgb(202, 202, 202);
    width: calc(33.33% - 20px);    /* 調整每個消息卡片的寬度，這裡假設每行三個 */
    box-sizing: border-box;
    transition: all 0.4s;//過渡效果，持續時間為 0.4 秒

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

.info-card img {
    vertical-align: middle;
    width: 100%;
    border-radius: 0px 0px 30px 30px;    /* 设置圆角 上右下左 */
    padding: 0;
}

.info-card {
    transition: box-shadow 0.8s; // 添加過渡效果
    cursor: pointer;
}

.info-card:hover {
    box-shadow: 3px 3px 5px gray; // 放大效果
}

.footer{
    width: 100%;
    height: 100px;

}


</style>