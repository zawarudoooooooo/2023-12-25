<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            newInfo: {
                title: '',
                content: '',
                date: '',
                category: '',
                image: null,
            },
            newInfoList: null,

        };
    },
    mounted() {
        this.searchAllNewInfo()
    },


    methods: {
        createNewInfo() {
            // Fetch the image file from input
            const file = document.querySelector('input[type="file"]').files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const bytes = new Uint8Array(arrayBuffer);

                // Prepare the data to send to the backend
                const requestData = {
                    newInfo: {
                        title: this.newInfo.title,
                        content: this.newInfo.content,
                        date: this.newInfo.date,
                        category: this.newInfo.category,
                        image: Array.from(bytes), // Convert Uint8Array to a regular array for JSON serialization
                    }
                };

                fetch('http://localhost:8080/api/adoption/createNewInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire('Successfully added the latest news');
                    })
                    .catch(error => {
                        // Handle errors
                    });
            };

            // Read the file as ArrayBuffer (binary data)
            reader.readAsArrayBuffer(file);
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

        deleteInfo(serialNo) {
            const apiUrl = 'http://localhost:8080/api/adoption/deleteNewUserInfo';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serialNo: serialNo,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // 处理删除成功的逻辑
                    console.log('Deleted successfully:', data);
                    alert('删除成功');

                    // 刷新信息列表（或执行其他需要的逻辑）
                    this.searchAllNewInfo();
                })
                .catch(error => {
                    // 处理删除失败的逻辑
                    console.error('Error:', error);
                });
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set image data to the newInfo object
                this.newInfo.image = reader.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },

        //更新邏輯
        handleImageUpload(newInfo) {
            const fileInput = event.target;
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // 去除 base64 圖片數據的前綴部分
                    const base64WithoutPrefix = reader.result.split(',')[1];

                    // 將處理後的 base64 圖片數據存儲到 newInfo 中
                    newInfo.image = base64WithoutPrefix;
                    // 將處理後的 base64 圖片數據存儲到 newInfo 中
                    newInfo.editedImage = `data:image/jpeg;base64,${base64WithoutPrefix}`;

                };

                // 讀取文件為 base64 格式
                reader.readAsDataURL(file);
            }
        },



        editInfo(serialNo) {
            // 找到點擊的div
            const clickedInfo = this.newInfoList.find(info => info.serialNo === serialNo);
            // 將該div標記為編輯狀態
            clickedInfo.editing = true;

            // 初始化編輯欄的數據（從原始貼文中獲取）
            clickedInfo.editedTitle = clickedInfo.title;
            clickedInfo.editedCategory = clickedInfo.category;
            clickedInfo.editedDate = clickedInfo.date;
            clickedInfo.editedContent = clickedInfo.content;

            // 如果需要，也可以在這裡初始化其他編輯欄的數據
        },

        saveInfo(serialNo) {
            // 找到點擊的div
            const clickedInfo = this.newInfoList.find(info => info.serialNo === serialNo);
            console.log(clickedInfo)
            // 呼叫後端保存 API
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
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // 保存成功後，將該div標記為非編輯狀態
                    clickedInfo.editing = false;
                    // 刷新信息列表（或執行其他需要的邏輯）
                    this.searchAllNewInfo();
                    // 顯示成功信息
                    Swal.fire('Update successful');
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
                <td>Title:</td>
                <td><input type="text" v-model="newInfo.title" /></td>
            </tr>
            <tr>
                <td>Content:</td>
                <td><textarea v-model="newInfo.content"></textarea></td>
            </tr>
            <tr>
                <td>Date:</td>
                <td><input type="date" v-model="newInfo.date" /></td>
            </tr>
            <tr>
                <td>Category:</td>
                <td><input type="text" v-model="newInfo.category" /></td>
            </tr>
            <tr>
                <td>imgage:</td>
                <td><input type="file" @change="handleFileUpload" /></td>
            </tr>
        </table>
        <button @click="createNewInfo">Create New Info</button>
    </div>


    <div class="searchAllNewInfo">
        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card"
            :class="{ 'editing': newInfo.editing }">
            {{ newInfo.serialNo }}
            <i class="fa-solid fa-trash" @click="deleteInfo(newInfo.serialNo)"></i>

            <i v-if="!newInfo.editing" class="edit-icon" @click="editInfo(newInfo.serialNo)">&#9998;</i>
            <i v-else class="save-icon" @click="saveInfo(newInfo.serialNo)">&#128190;</i>

            <h2 v-if="!newInfo.editing">{{ newInfo.title }}</h2>
            <textarea v-else v-model="newInfo.editedTitle" style="width: 100%; height: 100px;"></textarea>

            <p v-if="!newInfo.editing">Category: {{ newInfo.category }}</p>
            <input v-else type="text" v-model="newInfo.editedCategory" style="width: 100%;" />

            <p v-if="!newInfo.editing">Date: {{ newInfo.date }}</p>
            <input v-else type="date" v-model="newInfo.editedDate" style="width: 100%;" />

            <p v-if="!newInfo.editing">Content: {{ newInfo.content }}</p>
            <textarea v-else v-model="newInfo.editedContent" style="width: 100%; height: 200px;"></textarea>

            <!-- 文件選擇器 -->
            <input v-if="newInfo.editing" type="file" @change="handleImageUpload(newInfo)" />

            <!-- 顯示圖片 -->
            <img v-if="!newInfo.editedImage" :src="newInfo.base64Image" alt="New Info Image" />

            <!-- 顯示編輯模式中的預覽圖片 -->
            <img v-if="newInfo.editing " :src="newInfo.editedImage" alt="Edited Image" />
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
.createNewInfo {
    margin: 20px;
    /* Add margin around the component */

    table {
        border-collapse: collapse;
        width: 100%;

        tr {
            &:nth-child(odd) {
                background-color: #f2f2f2;
                /* Alternate row background color */
            }

            td {
                padding: 8px;
                border: 1px solid #ddd;
                text-align: left;
            }

            input[type='text'],
            textarea,
            input[type='date'] {
                width: 100%;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                margin-bottom: 10px;
            }

            textarea {
                height: 100px;
                /* Adjust height for textarea */
            }

            button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;

                &:hover {
                    background-color: #45a049;
                }
            }
        }
    }
}


/* 新增的樣式用來排版消息卡片 */
.searchAllNewInfo {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}

.info-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: calc(33.33% - 20px);
    /* 調整每個消息卡片的寬度，這裡假設每行三個 */
    box-sizing: border-box;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
}

.fa-trash {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    /* 這裡可以根據需要的大小調整 */
    cursor: pointer;
    z-index: 1;
    /* 確保垃圾桶圖示在其他內容之上 */
}

.edit-icon {
    position: absolute;
    top: -10px;
    right: 45px;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 1;
    /* 確保垃圾桶圖示在其他內容之上 */
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