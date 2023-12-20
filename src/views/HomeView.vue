<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            newInfoList: null,
        }
    },
    beforeCreate() {
    },

    mounted() {
        this.searchAllNewInfo()
    },

    methods: {
        goLoginIn() {
            this.$router.push('/Login')
        },
        goProfile() {
            this.$router.push('/Profile')
        },
        searchAllNewInfo() {
            fetch('http://localhost:8080/api/adoption/searchAllNewUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    // 將每個含有圖片的資料轉換成可顯示的格式
                    this.newInfoList = data.newInfoList.map(info => {
                        if (info.image) {
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
    }
}
</script>



<template>
    <div class="div">
        <div class="div-3">
            <div class="div-4">
                <div class="column">
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
        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card">
            <h2>{{ newInfo.title }}</h2>
            <p>Category: {{ newInfo.category }}</p>
            <p>Date: {{ newInfo.date }}</p>
            <p>Content: {{ newInfo.content }}</p>
            <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />
        </div>
    </div>
</template>



<style scoped>
.div {
    background-color: #fff;
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
}




.img {
    aspect-ratio: 0.94;
    object-fit: contain;
    object-position: center;
    width: 48px;
    fill: rgba(0, 0, 0, 0.45);
    overflow: hidden;
    max-width: 100%;
}

.div-3 {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    align-self: center;
    width: 1304px;
    max-width: 100%;
    margin: 80px 0 256px;
    padding: 46px 80px 46px 55px;
}



.div-4 {
    gap: 20px;
    display: flex;
}



.column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 23%;
    margin-left: 0px;
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
}

.info-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: calc(33.33% - 20px);
    /* 調整每個消息卡片的寬度，這裡假設每行三個 */
    box-sizing: border-box;
    background-color: #f9f9f9;
}

.info-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.info-card img {
    max-width: 100%;
    border-radius: 4px;
    margin-top: 10px;
}
</style>