<script>
export default {
    data() {
        return {
            area: null,//區域
            city: null,//城市
            nature: null,//性質
            animalSpecies: null,//種類
            institutionName: null,//機構名稱

            mapSearchList: null //儲存搜尋結果
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
    },

    mounted() { //生命周期(mounted)：被創建之後，會調用 search 方法，用於初始的搜尋。
        this.search()
    },

    computed: {//計算屬性 filteredCities
        // 根據選擇的區域動態生成城市選項
        filteredCities() {
            if (this.area) {
                // 如果選擇了區域，根據不同的區域返回相應的城市列表
                switch (this.area) {
                    case "北部":
                        return ["台北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣"];
                    case "中部":
                        return ["台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣"];
                    case "南部":
                        return ["高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣"];
                    case "東部":
                        return ["花蓮縣", "台東縣"];
                    default:
                        return [];
                }
            } else {
                // 如果未選擇區域，顯示所有城市選項
                return [
                    "台北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣",
                    "台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣",
                    "高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣",
                    "花蓮縣", "台東縣"
                ];
            }
        },
    },

    methods: {

        search() {
            //定義變數，用來存儲在搜尋區域、城市、性質、動物種類和機構名稱輸入框中輸入的值。
            const enteredArea = this.area;
            const enteredCity = this.city;
            const enteredNature = this.nature;
            const enteredAnimalSpecies = this.animalSpecies;
            const enteredInstitutionName = this.institutionName;


            //通過這些變數，構建了一個用於發送 GET 請求的 URL。這個 URL 包含了搜尋條件，以便後端服務能夠根據這些條件進行搜尋。這裡使用 encodeURIComponent 來對條件進行編碼，確保 URL 的正確性這樣組成的 URL 字符串的作用是將這些搜尋條件作為 URL 的 query parameters（查詢參數）附加到 API 的路由中，以便後端能夠根據這些條件進行相應的搜尋操作。

            const url = `http://localhost:8080/api/adoption/search?area=${encodeURIComponent(enteredArea || "")}&city=${encodeURIComponent(enteredCity || "")}&nature=${encodeURIComponent(enteredNature || "")}&animalSpecies=${encodeURIComponent(enteredAnimalSpecies || "")}&institutionName=${encodeURIComponent(enteredInstitutionName || "")}`;

            console.log('URL:', url);

            //使用 fetch 函數向後端發送 GET 請求，並在請求頭中指定 Content-Type 為 application/json
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                //處理後端返回的 JSON 數據。在成功的情況下（.then(response => response.json())），將後端返回的 data.mapSearchList 資料賦值給組件的 mapSearchList 屬性
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.mapSearchList = data.mapSearchList;
                    console.log(this.mapSearchList);

                })
                //在出現錯誤的情況下（.catch(error => {...})），在控制台輸出錯誤信息並彈出警告框提示用戶
                .catch(error => {
                    console.error('搜尋過程出現錯誤:', error);
                    alert('搜尋過程出現錯誤');
                });
        },
        toWebsite(website) {//打開一個新的瀏覽器窗口，顯示機構的網站
            // 檢查是否提供了網址
            if (website) {
                // 如果提供了網址，使用 window.open 打開新的瀏覽器窗口
                window.open(website, '_blank');
            } else {
                // 如果未提供網址，顯示警告框提示用戶
                alert('未提供網址');
            }
        }

    }
}
</script>
<template>
    <div class="bgArea">

        <div class="mapSearch">


            <div class="searchArea">

                <!-- 四個下拉式選單 -->
                <!-- v-model 雙向綁定全部 -->

                <span>區域</span>
                <select v-model="this.area">
                    <option value=""></option>
                    <option value="北部">北部</option>
                    <option value="中部">中部</option>
                    <option value="南部">南部</option>
                    <option value="東部">東部</option>
                </select>

                <span>縣市</span>
                <select v-model="this.city">

                    <option value=""></option>
                    <!-- 用於渲染根據選擇的區域動態生成的縣市下拉選單 -->
                    <!-- 使用 v-for 指令的迴圈結構，用來動態生成下拉選單的選項。filteredCities 是一個在 Vue 實例中定義的計算屬性，根據選擇的區域（this.area）動態生成相應的城市選項。
                    v-for="cityOption in filteredCities"：表示對 filteredCities 數組進行迴圈，將每個城市的名稱賦值給 cityOption。
                    :value="cityOption"：設置每個 <option> 元素的值為相應的城市名稱。
                    {{ cityOption }}：在每個 <option> 中顯示城市的名稱 -->
                    <option v-for="cityOption in filteredCities" :value="cityOption">
                        {{ cityOption }}
                    </option>

                    <!-- <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹縣">新竹縣</option>
                    <option value="宜蘭縣">宜蘭縣</option>

                    <option value="台中市">台中市</option>
                    <option value="苗栗縣">苗栗縣</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="雲林縣">雲林縣</option>

                    <option value="高雄市">高雄市</option>
                    <option value="台南市">台南市</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="澎湖縣">澎湖縣</option>

                    <option value="花蓮縣">花蓮縣</option>
                    <option value="台東縣">台東縣</option> -->
                </select>

            </div>

            <div class="searchArea">

                <span>性質</span>
                <select v-model="this.nature">
                    <option value=""></option>
                    <option value="私人">私人</option>
                    <option value="政府">政府</option>
                </select>

                <span>動物種類</span>
                <select v-model="this.animalSpecies">
                    <option value=""></option>
                    <option value="貓">貓</option>
                    <option value="狗">狗</option>
                    <option value="其他">其他</option>
                </select>

            </div>

            <div class="searchArea">
                <span>機構名稱</span>
                <input type="text" v-model="this.institutionName">
                <!-- 當點擊放大鏡按鈕就會調用search()方法 -->
                <i class="fa-solid fa-magnifying-glass" @click="search()">
                </i>
            </div>

        </div>

        <!-- v-for迭代顯示搜尋結果的區域 -->
        <div class="mapInfo" v-for="(item, index) in this.mapSearchList">

            <div class="img">
                <img :src="item.img" alt="">
            </div>

            <div class="info">
                <div class="title">
                    {{ item.institutionName }}
                </div>

                <div class="main">
                    {{ '地址 : ' + item.address }}
                </div>

                <div class="main">
                    {{ '營業時間 : ' + item.businessHours }}
                </div>

                <div class="icon">
                    <!-- 外部連結的icon -->
                    <i class="fa-solid fa-arrow-up-right-from-square" @click="toWebsite(item.website)"
                        style="cursor: pointer;"></i>

                    <div class="phoneArea">
                        <!-- 手機的icon -->
                        <i class="fa-solid fa-mobile-screen-button">
                            <span class="phone">{{ item.phone ? item.phone : "未填寫" }}</span>
                        </i>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.bgArea {
    width: 100vw;
    height: 100vh;
    background-color: #F8F5EE;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mapSearch {
        width: 85%;
        height: 30%;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 5vh;
        margin-bottom: 3vh;


        //搜尋區域
        .searchArea {
            display: flex;
            margin: 4vh 5vw;

            span {
                font-size: 1.5vw;
                font-weight: bold;
                color: #978989;
            }

            //下拉選單
            select {
                width: 15%;
                height: 4.5vh;
                font-size: 1.2vw;
                margin-left: 4vw;
                margin-right: 5vw;
                border-radius: 2.5vw;
                background-color: #DDDFEE;
                border: none;
                text-align: center; //字體居中

            }


            //輸入框
            input {
                width: 63%;
                height: 4.5vh;
                border-radius: 2.5vw;
                margin-left: 4vw;
                margin-right: 3vw;
                background-color: #DDDFEE;
                border: none;
                padding-left: 2vw;
            }

            //搜尋按鈕
            .fa-magnifying-glass {
                color: #E9D2A6;
                font-size: 2.5vw;

                &:hover {
                    cursor: pointer;
                    color: #ddaa4d;
                }
            }
        }
    }

    .mapInfo {
        width: 85%;
        height: 40%;
        background-color: #fff;
        border-radius: 3vw;
        //box-shadow: [水平偏移] [垂直偏移] [陰影模糊半徑] [陰影擴散半徑] [顏色:是一個黑色的半透明陰影，rgba 中的最後一個參數（0.28）是透明度，取值範圍為 0 到 1，越接近 1，陰影越不透明。];
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28); //向右下方偏移的、半透明的、有模糊效果和擴散效果的黑色陰影
        display: flex;
        margin-bottom: 3vh;


    }

    //放圖片的區域
    .img {
        width: 40%;
        height: 80%;
        border: 1px solid #978989;
        margin: 4vh 2.5vw;
        border-radius: 2.5vw;

        //讓圖片滿版
        img {
            width: 100%;
            height: 100%;
            border-radius: 2.5vw;
        }
    }

    //地點資訊
    .info {
        margin-top: 2vh;

        //機構名稱
        .title {
            font-size: 2.5vw;
            font-weight: bold;
            color: #978989;
            margin-bottom: 3vh;

        }

        //地址和營業時間
        .main {
            font-size: 1.5vw;
            font-weight: bold;
            color: #978989;
        }

        .icon {
            margin-bottom: 4vh;
            display: flex;

            //外部連結icon
            .fa-arrow-up-right-from-square {
                font-size: 3vw;
                margin-right: 2vw;
                margin-top: 8vh;

                &:hover {
                    color: rgb(68, 51, 48);
                }

            }

            //手機icon
            .fa-mobile-screen-button {
                font-size: 3vw;
                margin-top: 8vh;
            }

            .phone {
                font-size: 1.5vw;
                color: #978989;
                margin-left: 2vw;
            }
        }
    }
}</style>