<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),//從sessionStorage中获取
            newInfo: {//最新消息中包括標題、内容、日期、種類和圖片
                title: '',
                content: '',
                date: '',
                category: '',
                image: null,
                type: null,
            },
            newInfoList: null,//多個最新消息的List


        };
    },
    mounted() {  //頁面初始化時調用searchAllNewInfo方法
        this.searchAllNewInfo()
    },
    computed: {
        //計算屬性 filteredCities
        // 根據選擇的類型動態生成分類選項
        filteredCities() {
            // 如果選擇了類型，根據不同的類型返回相應的分類選項
            switch (this.newInfo.type) {
                case "最新消息":
                    return ["新聞", "活動", "教育"];
                case "科普":
                    return ["法規", "行為訓練", "醫學", "心理"];
            }
        },
    },

    methods: {


        //新增
        createNewInfo() {
            // Fetch the image file from input
            //通过獲取页面上类型為文件的输入框。用來獲取所選择的文件設為1個
            const file = document.querySelector('input[type="file"]').files[0];
            const reader = new FileReader();//用來讀取文件內容

            reader.onloadend = () => {//當文件加载完成时執行此事件
                const arrayBuffer = reader.result;//result 將以 ArrayBuffer 物件來表示讀入的資料內容。
                const bytes = new Uint8Array(arrayBuffer);//使用 Uint8Array 來表示二進制數據的一種類型。

                // Prepare the data to send to the backend
                //將输入的最新消息以及转换后的圖片數據封裝成請求數據對象。
                const requestData = {
                    newInfo: {
                        title: this.newInfo.title,
                        content: this.newInfo.content,
                        date: this.newInfo.date,
                        category: this.newInfo.category,
                        type: this.newInfo.type,
                        image: Array.from(bytes), // Convert Uint8Array to a regular array for JSON serialization
                    }
                };
                //使用 Fetch API 發送 POST 請求到後端
                fetch('http://localhost:8080/api/adoption/createNewInfo', {
                    method: 'POST',
                    headers: {        //請求頭部 表示發送的是 JSON 數據
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)     //請求體 將請求數據對象轉換為 JSON 字符串
                })
                    .then(response => response.json()) //處理後端返回的結果

                    .then(data => { //如果請求成功
                        console.log(data);
                        Swal.fire('新增成功!');    //使用 SweetAlert2 彈窗顯示“新增成功”

                        // 刷新信息列表（或执行其他需要的逻辑）
                        this.searchAllNewInfo();

                        // 清空欄位
                        this.newInfo.title = '';
                        this.newInfo.content = '';
                        this.newInfo.date = '';
                        this.newInfo.category = '';
                        this.newInfo.type = null;
                        fileInput.value = null;

                    })
                    .catch(error => {  //如果請求失敗
                        // Handle errors
                    });
            };

            // Read the file as ArrayBuffer (binary data)
            reader.readAsArrayBuffer(file);
        },

        searchAllNewInfo() {
            //使用 fetch 函數向指定的後端端點發送 GET 請求
            fetch('http://localhost:8080/api/adoption/searchAllNewUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' //發送的是 JSON 數據
                },
            })
                .then(response => response.json()) //處理後端返回的數據，將返回的 JSON 字符串轉換為 JavaScript 對象
                .then(data => {//處理轉換後的數據
                    // 將每個含有圖片的資料轉換成可顯示的格式
                    this.newInfoList = data.newInfoList.map(info => {// 迭代後端返回的列表
                        //檢查是否存在圖片
                        if (info.image) {//如果有圖片，則將其加上前綴 data:image/jpeg;base64,，形成一個完整的 Base64 圖片數據
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

        deleteInfo(serialNo) {
            // 使用 SweetAlert2 彈出確認刪除的模態視窗
            Swal.fire({
                title: '確認刪除?',
                text: '',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: '確認刪除',
                cancelButtonText: '取消'
            }).then((result) => {//點擊確認按鈕後
                if (result.isConfirmed) {
                    // 如果確認刪除，執行刪除的邏輯
                    const clickedInfo = this.newInfoList.find(info => info.serialNo === serialNo);//使用 this.newInfoList.find() 方法查找特定 serialNo
                    clickedInfo.deleting = true;//為了在界面上標記該信息為正在刪除狀態
                    const apiUrl = 'http://localhost:8080/api/adoption/deleteNewUserInfo';//API
                    //使用 fetch 函數向後端發送 POST 請求
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            serialNo: serialNo,
                        }),
                    })
                        .then(response => {//處理後端返回的數據
                            //如果刪除成功（HTTP 狀態碼為 OK），則打印成功的信息並執行刷新信息列表的操作（this.searchAllNewInfo()）
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            // 处理删除成功的逻辑
                            console.log('Deleted successfully:', data);

                            // 刷新信息列表（或执行其他需要的逻辑）
                            this.searchAllNewInfo();
                        })
                        .catch(error => {
                            // 处理删除失败的逻辑
                            console.error('Error:', error);
                        });
                }
            })
        },

        //預覽圖片
        handleFileUpload(event) {
            const file = event.target.files[0]; // 從事件中獲取上傳的檔案，這裡假設只處理第一個檔案
            const reader = new FileReader();  // FileReader 用於讀取檔案內容的物件

            reader.onloadend = () => {
                // Set image data to the newInfo object
                this.newInfo.image = reader.result; //// 當檔案讀取完成時，將檔案的數據設定到 newInfo 物件的 image 屬性中
            };

            if (file) {
                reader.readAsDataURL(file); // 如果有選擇檔案，則以DataURL的方式讀取檔案內容
            }
        },

        //更新圖片預覽
        handleImageUpload(newInfo) {
            const fileInput = event.target; // 獲取觸發事件的目標元素，即上傳文件的 input 元素
            const file = fileInput.files[0];// 從 input 元素中獲取選擇的文件，這裡假設只處理第一個文件

            if (file) {
                const reader = new FileReader();  // FileReader 用於讀取文件內容的物件

                reader.onloadend = () => {
                    // 去除 base64 圖片數據的前綴部分
                    const base64WithoutPrefix = reader.result.split(',')[1];

                    // 將處理後的 base64 圖片數據存儲到 newInfo 中
                    newInfo.image = base64WithoutPrefix;
                    // 將處理後的 base64 圖片數據存儲到 newInfo 中，用於編輯時的預覽
                    newInfo.editedImage = `data:image/jpeg;base64,${base64WithoutPrefix}`;

                };

                // 讀取文件為 base64 格式
                reader.readAsDataURL(file);
            }
        },

        editInfo(serialNo) {
            // 找到點擊的div，即相應的資訊，透過 find 方法，在 this.newInfoList 中找到 serialNo 符合點擊的那筆資訊
            const clickedInfo = this.newInfoList.find(info => info.serialNo === serialNo);
            // 將該div標記為編輯狀態，前端就知道這則正在進行編輯
            clickedInfo.editing = true;

            // 初始化編輯欄的數據，從點擊的資訊中獲取原始的標題、類別、日期和內容，並分別存儲到對應的編輯屬性中（editedTitle、editedCategory、editedDate、editedContent）。這樣，進入編輯模式後，編輯欄會顯示原始的資訊。
            clickedInfo.editedTitle = clickedInfo.title;
            clickedInfo.editedCategory = clickedInfo.category;
            clickedInfo.editedDate = clickedInfo.date;
            clickedInfo.editedContent = clickedInfo.content;

            // 重置 deleting 狀態，確保刪除狀態為 false，確保資訊不處於刪除狀態
            clickedInfo.deleting = false;
        },

        //將編輯後的資訊保存至後端
        saveInfo(serialNo) {
            // 找到點擊的div，即相應的資訊，透過 find 方法，在 this.newInfoList 中找到 serialNo 符合點擊的那則資訊
            const clickedInfo = this.newInfoList.find(info => info.serialNo === serialNo);
            console.log(clickedInfo)
            // 呼叫後端保存 API，使用 fetch 函數向後端發送 POST 請求，將編輯後的新聞資訊數據以 JSON 格式發送到指定的 API 端點
            fetch('http://localhost:8080/api/adoption/updateUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: clickedInfo.editedTitle,
                    content: clickedInfo.editedContent,
                    date: clickedInfo.editedDate,
                    category: clickedInfo.editedCategory,
                    image: clickedInfo.image,
                    serialNo: serialNo,
                }),
            })
                .then(response => response.json())//處理後端返回的結果
                .then(data => {
                    console.log(data);

                    // 保存成功後，將該div標記為非編輯狀態
                    clickedInfo.editing = false;
                    // 刷新資訊列表
                    this.searchAllNewInfo();
                    // 顯示成功信息
                    Swal.fire('更新成功!');
                })
                .catch(error => {
                    console.error('Error:', error);
                    // 處理錯誤情況
                });
        },
    },


};
</script>

<template>
    <div class="createNewInfo">
        <table>
            <tr>
                <td class="tdName">標題</td>
                <td colspan="5"><input class="inputTitle" type="text" v-model="newInfo.title" /></td>
            </tr>
            <tr>
                <td class="tdName">內容</td>
                <td colspan="5"><textarea v-model="newInfo.content"></textarea></td>
            </tr>
            <tr>
                <td class="tdName">日期</td>
                <td colspan="1"><input class="inputThree" type="date" v-model="newInfo.date" /></td>

                <td class="tdName">類型</td>
                <td colspan="1">
                    <select class="inputThree" name="" id="" v-model="newInfo.type">
                        <option value="最新消息">最新消息</option>
                        <option value="科普">科普</option>
                    </select>
                </td>

                <td class="tdName">分類</td>
                <td colspan="1">
                    <select class="inputThree" v-model="newInfo.category">
                        <option v-for="typeOption in filteredCities" :value="typeOption">
                            {{ typeOption }}
                        </option>
                    </select>
                </td>
            </tr>

            <tr>
                <td class="tdName">圖片</td>
                <td colspan="5"><input type="file" @change="handleFileUpload" /></td>
            </tr>
        </table>
        <button @click="createNewInfo">新增</button>
    </div>

    <div class="searchAllNewInfo">
        <!-- v-for迭代 newInfoList 中的每一則資訊。:key="newInfo.serialNo" 用於確保每個循環元素都有唯一的 key -->
        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card"
            :class="{ 'editing': newInfo.editing }">
            {{ newInfo.serialNo }}

            <!-- 刪除按鈕 -->
            <i v-if="!newInfo.editing && !newInfo.deleting" class="fa-solid fa-trash"
                @click="deleteInfo(newInfo.serialNo)"></i>

            <!-- 編輯按鈕 -->
            <i v-if="!newInfo.editing" class="edit-icon" @click="editInfo(newInfo.serialNo)">&#9998;</i>
            <i v-else class="fa-solid fa-floppy-disk" @click="saveInfo(newInfo.serialNo)"></i>


            <!-- 根據是否處於編輯模式決定顯示原始資訊或編輯後的資訊 -->

            <h2 v-if="!newInfo.editing">{{ newInfo.title }}</h2>
            <textarea v-else v-model="newInfo.editedTitle" style="width: 100%; height: 100px;"></textarea>

            <p v-if="!newInfo.editing">Category: {{ newInfo.category }}</p>
            <input v-else type="text" v-model="newInfo.editedCategory" style="width: 100%;" />

            <p v-if="!newInfo.editing">Date: {{ newInfo.date }}</p>
            <input v-else type="date" v-model="newInfo.editedDate" style="width: 100%;" />

            <p v-if="!newInfo.editing">Content: {{ newInfo.content }}</p>
            <textarea v-else v-model="newInfo.editedContent" style="width: 100%; height: 200px;"></textarea>

            <!-- 文件選擇器 編輯模式下顯示並觸發方法處理圖片上傳-->
            <input v-if="newInfo.editing" type="file" @change="handleImageUpload(newInfo)" />

            <!-- 顯示原始圖片 -->
            <img v-if="!newInfo.editedImage" :src="newInfo.base64Image" alt="New Info Image" />

            <!-- 顯示編輯模式中的預覽圖片 -->
            <img v-if="newInfo.editing" :src="newInfo.editedImage" alt="Edited Image" />
        </div>
    </div>


    <!-- <div class="searchAllNewInfo">
        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card">
            {{ newInfo.serialNo }}
            <i class="trash-icon" @click="deleteInfo(newInfo.serialNo)">&#128465;</i>
            <h2>{{ newInfo.title }}</h2>
            <p>Category: {{ newInfo.category }}</p>
            <p>Date: {{ newInfo.date }}</p>
            <p>Content: {{ newInfo.content }}</p>
            <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />

        </div>
    </div> -->
</template>

<style lang="scss" scoped>

body{
    background-color: #F8F5EE;
}
//新增的欄位
.createNewInfo {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    table {
        
        border: 3px #cccccc solid;
        background-color: #fff;
        font-family: 微軟正黑體;
        font-size: 16px;
        width: 200px;
        text-align: center;
        border-collapse: collapse;
        width: 80%;
        margin-top: 30px;
    }

    th {
        padding: 10px;
        border:3px #cccccc solid;
        color: #766a6a;
    }

    td {
        border:3px #cccccc solid;
    }

    .tdName {
        background-color: #DDDFEE;
        font-weight: 700;
        font-size: 15pt;
        color: #7c6969;
    }

    .inputTitle {
        width: 100%;
        height: 30px;
        border: none;
    }

    textarea {
        width: 100%;
        height: 100px;
        border: none;
    }

    .inputThree {
        width: 200px;
        text-align: center; //字體居中
    }

    //下拉選單
    // select {
    //     width: 15%;
    //     height: 4.5vh;
    //     font-size: 1.2vw;
    //     margin-left: 4vw;
    //     margin-right: 5vw;
    //     border-radius: 2.5vw;
    //     background-color: #DDDFEE;
    //     border: none;
    //     text-align: center; //字體居中

    // }

    button {
        margin: 1%;
        background-color:  #DDDFEE;
        color: #7c6969;
        font-weight: 700;
        font-size: 15pt;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer; //設定鼠標懸停時顯示為手型

        &:hover {
            background-color: #7c6969;
            color: #ffffff;
        }
    }

    // }
    // }
}


/* 用來排版消息卡片 */
.searchAllNewInfo {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; //  設定子元素之間的間距間距
    margin-top: 20px;
}

.info-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: calc(33.33% - 20px);
    /* 調整每個消息卡片的寬度，假設每行有三張卡片 */
    box-sizing: border-box; //設定框模型為邊框內計算
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: flex-start; //設定子元素靠左對齊。
}

.fa-trash {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer; // 將游標設定為手型，表示該元素可點擊。
    z-index: 1;
    /* 設定層級，確保垃圾桶圖示在其他內容之上 */

    &:hover {
        color: black;
    }
}

.edit-icon {
    position: absolute;
    top: -10px;
    right: 45px;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 1;
    /* 確保編輯圖示在其他內容之上 */

    &:hover {
        color: #2a6421;
    }
}

.fa-floppy-disk {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1;
    /* 確保儲存圖示在其他內容之上 */


    &:hover {
        color: rgb(73, 94, 144);
    }
}


.info-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.info-card img {
    max-width: 100%;
    border-radius: 4px;
    margin-top: 10px;
}</style>