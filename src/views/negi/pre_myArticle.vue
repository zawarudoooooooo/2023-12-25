<script>
import view_Article from './view_Article.vue';
import create_Article from './create_Article.vue';
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';

export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            postSerialNo: JSON.parse(sessionStorage.getItem('postSerialNo')),

            myArticle: null,
            postCommentList: null,
            userReply: null,
            //最後某筆數留言
            lastFiveComments: null,

            showAllComments: false // 控制是否顯示所有留言的變數
        }
    },

    mounted() {
        this.groupAll()
        this.searchPostCommentBySerialNo()
    },

    components: {
        view_Article, create_Article,
        ArticleDashBoard
    },

    methods: {
        groupAll() {
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

                            // 使用 reduce 方法整合資訊
                            const integratedData = forumEntranceList.map(forumEntry => {
                                const userInfo = userInfoList.find(user => user.userId === forumEntry.userId);

                                // 創建一個新的物件整合所需的資訊
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

                            // 在這裡處理整合後的資料 integratedData
                            console.log(integratedData);
                            console.log(this.postSerialNo)
                            const specificUserArticles = integratedData.filter(entry => entry.serialNo === this.postSerialNo);
                            this.myArticle = specificUserArticles
                            console.log(this.myArticle)
                        });
                });
        },

        goTo(x) {
            this.$router.push(x)
        },
        createNewComment() {
            const postData = {
                postComment: {
                    postSerialNo: this.postSerialNo,
                    userId: this.foundUserInfo.userId,
                    userName: this.foundUserInfo.userName,
                    commentContent: this.userReply
                }
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            };

            fetch('http://localhost:8080/api/adoption/createNewComment', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);

                    this.userReply = null

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        searchPostCommentBySerialNo() {
            const postSerialNoToSearch = this.postSerialNo;

            const fetchData = () => {
                // 發送 GET 請求至後端 API，搜尋評論
                fetch(`http://localhost:8080/api/adoption/searchByPostSerialNo?postSerialNo=${postSerialNoToSearch}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const postCommentList = data.postCommentList;

                        fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo')
                            .then(response => response.json())
                            .then(data => {
                                const userInfoList = data.userInfoList;

                                // 整合 userId 為 key 的使用者資訊
                                const userInfoMap = userInfoList.reduce((acc, userInfo) => {
                                    acc[userInfo.userId] = userInfo;
                                    return acc;
                                }, {});

                                // 整合 postCommentList 和 userInfoList 中的資料
                                const integratedData = postCommentList.map(comment => ({
                                    commentContent: comment.commentContent,
                                    commentId: comment.commentId,
                                    userId: comment.userId,

                                    account: userInfoMap[comment.userId].account,
                                    userName: userInfoMap[comment.userId].userName,
                                    userPhoto: userInfoMap[comment.userId].userPhoto
                                }));

                                this.postCommentList = integratedData;
                                // 在這裡處理整合後的資料
                                // 只顯示最後的5筆留言
                                const lastFiveComments = integratedData.slice(-3);
                                this.lastFiveComments = lastFiveComments
                            });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };

            // 每隔一段時間自動執行 fetchData 函式
            const interval = setInterval(fetchData, 500); // 這裡是每隔5秒更新一次，可以根據需要調整時間間隔

            // 第一次執行
            fetchData();

            // 若需要停止自動更新，可以使用 clearInterval(interval);
        }
    }
}
</script>


<!-- 發文的人看自己發的文章 -->
<template>
    <div class="all" v-if="myArticle">
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
                        <div class="function_icon_area">
                            <i class="fa-solid fa-trash-can img-2"></i>
                            <i class="fa-solid fa-pen img-3" @click="goTo('/ForumEntrance/edit_myArticle')"></i>
                        </div>
                        <div class="article">
                            <div class="poster_area">
                                <div class="poster">
                                    <div class="div-13">
                                        <div class="div-14">
                                            <img class="poster_icon"
                                                :src="'data:image/jpeg;base64,' + this.myArticle[0].userPhoto" alt="">
                                            <div class="poster_data">
                                                <p class="poster_name">{{ this.myArticle[0].userName }}</p>
                                                <p class="poster_userId">{{ this.myArticle[0].account }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column-4">
                                        <div class="div-16">
                                            <div class="pet_state">with</div>
                                            <div class="pet">
                                                <div class="pet_name">Kiwi</div>
                                                <img loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5229e6b9f8129729e04753274f9898cd171972f078ea719bd686b4bf738bc61a?"
                                                    class="pet_type" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <div class="article_title">{{ this.myArticle[0].title }}</div>
                            <img class="article_img" :src="'data:image/jpeg;base64,' + this.myArticle[0].postPhoto" alt="">
                            <div class="article_contain">
                                <p>{{ this.myArticle[0].postContent }}</p>
                            </div>
                            <div class="div-23">
                                <span>Comment</span>
                                <div class="likesCount">
                                    <i class="fa-regular fa-heart"></i>
                                    <span>{{ this.myArticle[0].likesCount }}</span>
                                </div>
                            </div>
                            <div class="div-24"></div>

                            <div class="reply">
                                <button @click="showAllComments = !showAllComments">
                                    {{ showAllComments ? '收起留言' : '查看更多' }}
                                </button>
                                <div class="replier"
                                    v-for="(item, index) in showAllComments ? postCommentList : lastFiveComments">
                                    <img class="replier_img" :src="'data:image/jpeg;base64,' + item.userPhoto" alt="">
                                    <div class="replier_data">
                                        <p class="replier_name">{{ item.userName }}</p>
                                        <p class="replier_userId">{{ item.account }}</p>
                                        <div class="replier_text">{{ item.commentContent }}</div>
                                        <p>{{ showAllComments ? index + 1 : postCommentList.length - lastFiveComments.length
                                            + index + 1 }}樓</p>
                                    </div>
                                </div>
                            </div>
                            <div class="newReply">
                                <img class="replier_img" :src="'data:image/jpeg;base64,' + this.foundUserInfo.userPhoto"
                                    alt="">
                                <div class="nameAccount">
                                    <span>{{ this.foundUserInfo.userName }}</span>
                                    <span>{{ this.foundUserInfo.account }}</span>
                                </div>
                                <input type="text" v-model="userReply" @keyup.enter="createNewComment()">
                                <button @click="createNewComment()">回覆</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<style scoped>
.newReply {
    display: flex;

    .nameAccount {
        display: flex;
        flex-direction: column;
    }
}

.all {
    width: 100vw;
    height: auto;
    padding-top: 3vmin;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 5vmin;
    display: flex;
    justify-content: space-between;
    background-color: #DDDFEE;
}

.out_contain {
    align-self: center;
    width: 100%;
}

@media (max-width: 991px) {
    .out_contain {
        max-width: 100%;
        margin-top: 40px;
    }
}

.in_contain {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .in_contain {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.dashboard {
    width: 13vw;
}

@media (max-width: 991px) {
    .dashboard {
        width: 100%;
    }
}


.out_article_area {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 80%;
}

@media (max-width: 991px) {
    .out_article_area {
        width: 100%;
    }
}

.in_article_area {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: end;
    width: 78vw;
    padding: 45px 0;
    height: auto;
    color: #978989;
    padding: 20px 30px 20px 30px;
    font-size: 20pt;
}

@media (max-width: 991px) {
    .in_article_area {
        max-width: 100%;
        margin-top: 40px;
    }
}

.function_icon_area {
    display: flex;
    align-items: center;
    width: 119px;
    height: 50px;

    i {
        margin-right: 20px;
    }
}

.article {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    margin: 57px 0 4px;
    padding: 0 18px;
}

@media (max-width: 991px) {
    .article {
        max-width: 100%;
        margin-top: 40px;
    }
}

.poster_area {
    align-self: stretch;
}

@media (max-width: 991px) {
    .poster_area {
        max-width: 100%;
        padding-right: 20px;
    }
}

.poster {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .poster {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.div-13 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 57%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .div-13 {
        width: 100%;
    }
}

.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 18px;
}

@media (max-width: 991px) {
    .div-14 {
        margin-top: 40px;
    }
}

.poster_icon {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 96px;
    overflow: hidden;
    max-width: 100%;
    border-radius: 50%;
}

.poster_data {
    color: #978989;
    margin: auto 0;
    font: 800 32px Lexend, sans-serif;
}

.column-4 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 43%;
    margin-left: 20px;
}

@media (max-width: 991px) {
    .column-4 {
        width: 100%;
    }
}

.div-16 {
    display: flex;
    width: 100%;
    flex-grow: 1;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .div-16 {
        margin-top: 40px;
    }
}

.pet_state {
    color: #978989;
    margin-top: 69px;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 32px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_state {
        margin-top: 40px;
        white-space: initial;
    }
}

.pet {
    border-radius: 37px;
    background-color: #e9d2a6;
    align-self: stretch;
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 4px;
    padding: 14px 12px 0 24px;
}

@media (max-width: 991px) {
    .pet {
        padding-left: 20px;
    }
}

.pet_name {
    color: #fff;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 28px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_name {
        white-space: initial;
    }
}

.pet_type {
    aspect-ratio: 1.27;
    object-fit: contain;
    object-position: center;
    width: 147px;
    fill: #fff;
    overflow: hidden;
    margin-top: 10px;
    max-width: 100%;
}

.div-20 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 42px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-20 {
        max-width: 100%;
        margin-top: 40px;
    }
}

.article_title {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 27px 0 0 76px;
    font: 800 39px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_title {
        margin-left: 10px;
        white-space: initial;
    }
}

.article_img {
    aspect-ratio: 0.91;
    object-fit: contain;
    object-position: center;
    width: 369px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
    margin: 24px 0 0 66px;
}

@media (max-width: 991px) {
    .article_img {
        margin-left: 10px;
    }
}

.article_contain {
    color: #978989;
    align-self: start;
    width: 325px;
    max-width: 100%;
    margin: 36px 0 0 75px;
    font: 800 21px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_contain {
        margin-left: 10px;
    }
}

.div-23 {
    width:100%;
    padding-right: 45px;
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 151px 0 0 23px;
    font: 800 28px Lexend, sans-serif;
    display: flex;
    justify-content: space-between;

    .likesCount {
        display: flex;

        span {
            color: red;
        }

        i {
            color: red
        }
    }

}

@media (max-width: 991px) {
    .div-23 {
        white-space: initial;
        margin: 40px 0 0 10px;
    }
}

.div-24 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 11px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-24 {
        max-width: 100%;
    }
}

.reply {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 34px 0 0 23px;
    flex-direction: column;
}

@media (max-width: 991px) {
    .reply {
        margin-left: 10px;
    }
}

.replier_img {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
    border-radius: 50%;
}

.replier {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    /* flex-direction: column; */
}

.replier_data {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.replier_text {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.replier_replier {
    align-self: start;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0px;
    margin: 8px 0 0 90px;
}

@media (max-width: 991px) {
    .replier_replier {
        margin-left: 10px;
        justify-content: center;
    }
}

.img-8 {
    aspect-ratio: 0.03;
    object-fit: contain;
    object-position: center;
    width: 2px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
}

.img-9 {
    aspect-ratio: 5.33;
    object-fit: contain;
    object-position: center;
    width: 80px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    margin-top: 57px;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img-9 {
        margin-top: 40px;
    }
}

.replier_replier_img {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    align-self: end;
    margin-top: 26px;
    max-width: 100%;
}

.replier_replier_data {
    align-self: center;
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
    margin: auto 0;
}

.div-31 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-32 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.div-33 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 16px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-33 {
        max-width: 100%;
    }
}

.div-34 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 24px 0 0 23px;
}

@media (max-width: 991px) {
    .div-34 {
        margin-left: 10px;
    }
}

.img-11 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-35 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-36 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-37 {
    color: #978989;
    margin-top: 11px;
    font: 800 21px Lexend, sans-serif;
}

.div-38 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 33px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-38 {
        max-width: 100%;
    }
}

.div-39 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 30px 0 0 23px;
}

@media (max-width: 991px) {
    .div-39 {
        margin-left: 10px;
    }
}

.img-12 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-40 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-41 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-42 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}
</style>