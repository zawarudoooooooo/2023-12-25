<script>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
    data() {
        return {
            article: [1, 2, 3, 4],

            newInfoList: null,
            integratedData: null,
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
        }
    },
    mounted() {  //頁面初始化時調用searchAllNewInfo方法
        this.searchAllNewInfo()
        this.groupAll()
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

        hotArticlesToShow() {
            const articlesPerSlide = 3; // 每个轮播项目显示的文章数量
            const hotArticlesChunks = [];

            // 检查 integratedData 是否存在和非空
            if (this.integratedData && Array.isArray(this.integratedData)) {
                const sortedIntegratedData = [...this.integratedData]; // 获取 integratedData 的副本

                // 根据 likesCount 降序排列
                sortedIntegratedData.sort((a, b) => b.likesCount - a.likesCount);

                for (let i = 0; i < sortedIntegratedData.length; i += articlesPerSlide) {
                    hotArticlesChunks.push(sortedIntegratedData.slice(i, i + articlesPerSlide));
                }
            }
            return hotArticlesChunks;
        },


    },
    methods: {
        searchAllNewInfo() {
            //使用 fetch 函數向指定的後端端點發送 GET 請求
            fetch('http://localhost:8080/api/adoption/searchAllNewUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' //發送的是 JSON 數據
                },
            })
                .then(response => response.json()) //處理後端返回的數據，將返回的 JSON 字符串轉換為 JavaScript 對象
                .then(data => {
                    // 將每個含有圖片的資料轉換成可顯示的格式

                    this.newInfoList = data.newInfoList
                        // 過濾出 type 為 "科普" 的資料
                        .filter(info => info.type === '科普')
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
        goToZ(x) {
            this.$router.push(x)
        },
        goTo(serialNo) {
            sessionStorage.setItem('postSerialNo', serialNo);
            this.$router.push('/ForumEntrance/pre_myArticle')
        },
        groupAll() {
            const fetchData = () => {
                fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                        const userInfoList = data.userInfoList;

                        fetch('http://localhost:8080/api/adoption/searchAllPost', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                const forumEntranceList = data.forumEntranceList;

                                const integratedData = forumEntranceList.map(forumEntry => {
                                    const userInfo = userInfoList.find(user => user.userId === forumEntry.userId);
                                    return {
                                        postContent: forumEntry.postContent,
                                        postPhoto: forumEntry.postPhoto,
                                        serialNo: forumEntry.serialNo,
                                        title: forumEntry.title,
                                        userId: forumEntry.userId,
                                        likesCount: forumEntry.likesCount,
                                        userName: userInfo.userName,
                                        userPhoto: userInfo.userPhoto,
                                        account: userInfo.account,
                                    };
                                });
                                this.integratedData = integratedData;

                                fetch('http://localhost:8080/api/adoption/searchLikeByUserId?userId=' + this.foundUserInfo.userId, {
                                    method: 'GET',
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        const likesRecordList = data.likesRecordList;

                                        // 將 obtainedLikesRecords 整合到 integratedData 中
                                        this.integratedData.forEach(post => {
                                            const found = likesRecordList.find(record => record.postId === post.serialNo);
                                            post.liked = !!found; // 設置 liked 屬性為布爾值，表示是否按過讚
                                        });
                                        console.log(this.integratedData)
                                    });
                            });
                    });
            };

            // // 每隔一段時間自動執行 fetchData 函式
            // const interval = setInterval(fetchData, 300); // 5000毫秒，即5秒

            // 第一次立即执行
            fetchData();

            // 如果需要停止定時器，可以使用 clearInterval(interval);
        },
    }
}
</script>

<template>
    <div class="div">

        <div class="div-3">

            <div class="div-7">
                <h1>你知道嗎?</h1>
            </div>
            <!-- <div class="div-8" v-for="item in this.newInfoList">
                <div class="div-9">
                    <div class="column-3">
                        <img :src="item.base64Image" alt="">
                    </div>
                    <div class="div-10">
                        <div class="div-11">
                            <h2>{{ item.title }}</h2>
                        </div>
                        <div class="div-12">
                            <span>{{ item.content }}</span>
                        </div>
                    </div>

                </div>
            </div> -->

            <!-- 最新消息輪播 -->
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

                <!-- 最新消息左右輪播控制按鈕 -->
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselNewInfo" data-bs-slide="prev">
                    <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselNewInfo" data-bs-slide="next">
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
            <div class="infoMoreBtnArea">
                <button class="infoMoreBtn" @click="goToZ('/ForumEntrance/ForumPopularScienceAll')">查看更多科普</button>
            </div>

            <div class="div-14">
                <h1>熱門文章</h1>
            </div>
            <div id="carouselHotArticles" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div v-for="(articlesChunk, index) in hotArticlesToShow" :key="index"
                        :class="['carousel-item', index === 0 ? 'active' : '']">
                        <div class="d-flex justify-content-around">
                            <!-- 使用原始卡片模板 -->
                            <div v-for="item in articlesChunk" :key="item.serialNo" class="showCard"
                                @click="goTo(item.serialNo)">
                                <div class="cardTop">
                                    <img loading="lazy" class="poster_icon"
                                        :src="'data:image/jpeg;base64,' + item.userPhoto" />
                                    <div class="poster_data">
                                        <p class="poster_name">{{ item.userName }}</p>
                                        <p class="poster_userId">{{ item.account }}</p>
                                    </div>
                                </div>
                                <div class="cardMiddle">
                                    <div class="article_title">{{ item.title }}</div>
                                    <div class="img">
                                        <img :src="'data:image/jpeg;base64,' + item.postPhoto" alt="">
                                    </div>
                                    <div class="cardInfo">
                                        <!-- <p class="infoText">{{ item.postContent }}</p> -->
                                    </div>
                                </div>
                                <div class="cardLast">
                                    <div class="likesCount">
                                        <i class="fa-solid fa-fire"></i>
                                        <span @click="searchLikeByPostId(item.serialNo)">{{ item.likesCount }}</span>
                                    </div>
                                    <p class="moreInfo" @click="goTo(item.serialNo)">...點我看更多</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 輪播控制按鈕 -->
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselHotArticles"
                    data-bs-slide="prev">
                    <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselHotArticles"
                    data-bs-slide="next">
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>

            <div class="div-36">
                <button class="btn btn-big btn-specialBlue" style="color: white;"
                    @click="goToZ('/ForumEntrance/ForumHome')">閒聊版看更多</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/main.scss';

.div {
    background-color: #d8dae9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 0 50px;
    font-size: 16pt;
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
    background-color: #6E75A8;
    ;
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
        color: #6E75A8;
        ;
        box-shadow: 0px 2px 10px 5px #6E75A8;
        ;
        transform: scale(1.03);

    }
}

.showCard {
    width: 300px;
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
    padding: 20px 20px 20px 20px;
    margin: 20px 15px 25px 15px;
    background-color: white;
    color: #978989;
    font-size: 14pt;
    box-shadow: 0 0 3px 2px lightgray;
    color: white;

    &:hover {
        box-shadow: 3px 3px 5px gray;
        transition: 0.8s;
    }

    .cardTop {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        position: relative;

        .poster_icon {
            width: 60px;
            height: 60px;
            position: absolute;
            right: 25px;
            border-radius: 50%;
        }

        .poster_data {
            color: #978989;
            font-size: 17px;
            font-weight: 700;
        }

    }

    .cardMiddle {
        display: flex;
        flex-direction: column;
        align-items: center;


        .article_title {
            color: #978989;
            font-weight: 700;
        }

        .img {
            width: 230px;
            height: 180px;
            border: 1px solid #978989;
            border-radius: 20px;
            margin-bottom: 10px;

            img {
                width: 230px;
                height: 180px;
                border-radius: 20px;
            }
        }

        .cardInfo {

            .infoText {
                color: #978989;
                font-size: 16px;
                font-weight: 700;
            }
        }



    }

    .cardLast {
        width: 90%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .likesCount {
            display: flex;

            span {
                color: red;
            }

            i {
                color: red
            }
        }

        .moreInfo {
            color: #6E75A8;
            margin-left: 25px;
            font-weight: 700;
        }
    }
}


.fa-arrow-left {
    margin-right: 300px;
    margin-bottom: 220px;
}

.fa-arrow-right {
    margin-left: 300px;
    margin-bottom: 220px;

}

.infoMoreBtnArea {
    position: absolute;
    left: 45vw;
    bottom: 3vh;

    .infoMoreBtn {
        padding: 15px 20px;
        font-size: 1vw;
        border-radius: 1vw;
        background-color: #6E75A8;
        color: #ffffff;

        box-shadow: 0 0 3px 2px lightgray;
        font-weight: 600;

        &:hover {
            box-shadow: 0px 10px 5px -5px #0e0e0e;
            transform: scale(1.03);
            background-color: #9399c3;
            font-weight: 700;
        }

    }
}


.div-3 {
    display: flex;
    width: 85%;
    flex-direction: column;
    // margin: 69px 0 12px;
}

.img {
    aspect-ratio: 1.28;
    object-fit: contain;
    object-position: center;
    width: 60px;
    overflow: hidden;
    max-width: 100%;
}


.div-7 {
    color: #978989;
    align-self: stretch;
    margin-top: 34px;
    white-space: nowrap;

}


.div-14 {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin-top: 120px;

}

.cardTop {
    width: 90%;
    display: flex;
    justify-content: space-between;
    gap: 11px;
}

.div-36 {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 240px;
        height: 65px;
        font-size: 20pt;
    }
}
</style>