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
    }

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
        <div v-for="newInfo in newInfoList" :key="newInfo.serialNo" class="info-card">
            <h2>{{ newInfo.title }}</h2>
            <p>Category: {{ newInfo.category }}</p>
            <p>Date: {{ newInfo.date }}</p>
            <p>Content: {{ newInfo.content }}</p>
            <img v-if="newInfo.base64Image" :src="newInfo.base64Image" alt="New Info Image" />
        </div>
    </div>
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