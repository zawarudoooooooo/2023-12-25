<script>
export default {
    data() {
        return {
            area: null,
            city: null,
            nature: null,
            animalSpecies: null,
            institutionName: null,

            mapSearchList: null
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
    },

    mounted() {
        this.search()
    },

    computed: {
        // 根據選擇的區域動態生成城市選項
        filteredCities() {
            if (this.area) {
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
            const enteredArea = this.area;
            const enteredCity = this.city;
            const enteredNature = this.nature;
            const enteredAnimalSpecies = this.animalSpecies;
            const enteredInstitutionName = this.institutionName;


            // 构建带有账号和密码的 URL

            const url = `http://localhost:8080/api/adoption/search?area=${encodeURIComponent(enteredArea || "")}&city=${encodeURIComponent(enteredCity || "")}&nature=${encodeURIComponent(enteredNature || "")}&animalSpecies=${encodeURIComponent(enteredAnimalSpecies || "")}&institutionName=${encodeURIComponent(enteredInstitutionName || "")}`;


            console.log('URL:', url);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.mapSearchList = data.mapSearchList;
                    console.log(this.mapSearchList);

                })
                .catch(error => {
                    console.error('搜尋過程出現錯誤:', error);
                    alert('搜尋過程出現錯誤');
                });
        },
        toWebsite(website) {
            if (website) {
                window.open(website, '_blank');
            } else {
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
                <button @click="search()">Search</button>
            </div>

        </div>

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
                    <i class="fa-solid fa-arrow-up-right-from-square" @click="toWebsite(item.website)"
                        style="cursor: pointer;"></i>

                    <div class="phoneArea">
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



        .searchArea {
            display: flex;
            margin: 4vh 5vw;

            span {
                font-size: 1.5vw;
                font-weight: bold;
                color: #978989;
            }

            select {
                width: 15%;
                height: 4.5vh;
                margin-left: 4vw;
                margin-right: 5vw;
                border-radius: 2.5vw;
                background-color: #DDDFEE;
                border: none;
                text-align: center;

            }



            input {
                width: 63%;
                height: 4.5vh;
                border-radius: 2.5vw;
                margin-left: 1vw;
                margin-right: 5vw;
                background-color: #DDDFEE;
                border: none;
                padding-left: 2vw;
            }

            button {
                width: 15%;
                height: 6vh;
                border-radius: 3.5vw;
                border: none;
                background-color: #E9D2A6;
                color: white;
                font-weight: 900;
                font-size: 2vw;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
        }
    }

    .mapInfo {
        width: 85%;
        height: 40%;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        display: flex;
        margin-bottom: 3vh;


        .img {
            width: 40%;
            height: 80%;
            border: 1px solid #978989;
            margin: 4vh 2.5vw;
            border-radius: 2.5vw;

            img {
                width: 100%;
                height: 100%;
                border-radius: 2.5vw;
            }
        }

        .info {
            margin-top: 2vh;

            .title {
                font-size: 2.5vw;
                font-weight: bold;
                color: #978989;
                margin-bottom: 3vh;

            }

            .main {
                font-size: 1.5vw;
                font-weight: bold;
                color: #978989;
            }

            .icon {
                margin-bottom: 4vh;
                display: flex;

                .fa-arrow-up-right-from-square {
                    font-size: 3vw;
                    margin-right: 2vw;
                    margin-top: 8vh;

                    &:hover {
                        color: rgb(68, 51, 48);
                    }

                }

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
    }
}
</style>