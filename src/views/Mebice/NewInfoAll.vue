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
    mounted() {//生命周期(mounted)：被創建之後，會調用方法，用於初始的搜尋。
        this.searchAllNewInfo()
    },
    methods: {
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

                    this.newInfoList = data.newInfoList
                        // 過濾出 type 為 "科普" 的資料
                        .filter(info => info.type === '新聞')
                        // 針對過濾出來的資料處理圖片，如果有圖片，則加上前綴，形成完整的 Base64 圖片數據
                        .map(info => {
                            if (info.image) {
                                const base64Prefix = 'data:image/jpeg;base64,';
                                return { ...info, base64Image: base64Prefix + info.image };
                            } else {
                                return info;
                            }
                        });
                    console.log(this.newInfoList)


                    // 將 newInfoList 按日期由最新到最舊排序
                    this.newInfoList.sort((a, b) => new Date(b.date) - new Date(a.date));

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
    }
}

</script>

<template>
    <div class="bgArea">
        <h1 class="bgAreaTitle">所有相關消息</h1>
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
                <div class="imgArea">
                    <!-- 如果 newInfo.base64Image 存在，則顯示一個圖片。 -->
                    <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    width: 100vw;

    .bgAreaTitle {
        margin-top: 4vh;
        margin-left: 45vw;
        font-weight: 700;
    }

    .searchAllNewInfo {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin: 20px 0;
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
}
</style>