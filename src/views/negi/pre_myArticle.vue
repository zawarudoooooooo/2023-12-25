<script>
import view_Article from './view_Article.vue';
import create_Article from './create_Article.vue';
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import Swal from 'sweetalert2';

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

            showAllComments: false, // 控制是否顯示所有留言的變數

            integratedData: null,
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

                            // Check if foundUserInfo exists before making the fetch request
                            if (this.foundUserInfo && this.foundUserInfo.userId) {
                                fetch('http://localhost:8080/api/adoption/searchLikeByUserId?userId=' + this.foundUserInfo.userId, {
                                    method: 'GET',
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        const likesRecordList = data.likesRecordList;

                                        integratedData.forEach(post => {
                                            const found = likesRecordList.find(record => record.postId === post.serialNo);
                                            post.liked = !!found;
                                        });
                                        console.log(integratedData);
                                        this.integratedData = integratedData;
                                        console.log(this.postSerialNo);
                                        const specificUserArticles = integratedData.filter(entry => entry.serialNo === this.postSerialNo);
                                        this.myArticle = specificUserArticles;
                                        console.log(this.myArticle);
                                        console.log(this.myArticle[0].userId);
                                        console.log(this.foundUserInfo.userId);
                                    })
                                    .catch(error => {
                                        console.error('Error fetching likes:', error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching posts:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        },


        // groupAll() {
        //     fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
        //         method: 'GET',
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             const userInfoList = data.userInfoList;

        //             fetch('http://localhost:8080/api/adoption/searchAllPost', {
        //                 method: 'GET',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //             })
        //                 .then(response => response.json())
        //                 .then(data => {
        //                     const forumEntranceList = data.forumEntranceList;

        //                     // 使用 reduce 方法整合資訊
        //                     const integratedData = forumEntranceList.map(forumEntry => {
        //                         const userInfo = userInfoList.find(user => user.userId === forumEntry.userId);

        //                         // 創建一個新的物件整合所需的資訊
        //                         return {
        //                             postContent: forumEntry.postContent,
        //                             postPhoto: forumEntry.postPhoto,
        //                             serialNo: forumEntry.serialNo,
        //                             title: forumEntry.title,
        //                             userId: forumEntry.userId,
        //                             likesCount: forumEntry.likesCount,

        //                             userName: userInfo.userName,
        //                             userPhoto: userInfo.userPhoto,
        //                             account: userInfo.account,
        //                         };
        //                     });

        //                     // 在這裡處理整合後的資料 integratedData


        //                     fetch('http://localhost:8080/api/adoption/searchLikeByUserId?userId=' + this.foundUserInfo.userId, {
        //                         method: 'GET',
        //                     })
        //                         .then(response => response.json())
        //                         .then(data => {
        //                             const likesRecordList = data.likesRecordList;

        //                             // 將 obtainedLikesRecords 整合到 integratedData 中
        //                             integratedData.forEach(post => {
        //                                 const found = likesRecordList.find(record => record.postId === post.serialNo);
        //                                 post.liked = !!found; // 設置 liked 屬性為布爾值，表示是否按過讚
        //                             });
        //                         });
        //                     console.log(integratedData);
        //                     this.integratedData = integratedData
        //                     console.log(this.postSerialNo)
        //                     const specificUserArticles = integratedData.filter(entry => entry.serialNo === this.postSerialNo);
        //                     this.myArticle = specificUserArticles
        //                     console.log(this.myArticle)
        //                     console.log(this.myArticle[0].userId)
        //                     console.log(this.foundUserInfo.userId)
        //                 });
        //         });
        // },

        createLike() {

            const requestBody = {
                likesRecord: {
                    postId: this.postSerialNo,
                    userId: this.foundUserInfo.userId
                }
            };

            fetch(`http://localhost:8080/api/adoption/createLike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    const postToUpdate = this.integratedData.find(post => post.serialNo === this.postSerialNo);
                    if (postToUpdate) {
                        // 如果当前帖子已经被喜欢，执行取消喜欢操作
                        if (postToUpdate.liked) {
                            // 在这里实现取消喜欢的逻辑
                            postToUpdate.liked = false; // 更新喜欢状态
                            postToUpdate.likesCount--; // 减少喜欢数
                        } else {
                            // 否则，执行喜欢操作
                            postToUpdate.liked = true; // 更新喜欢状态
                            postToUpdate.likesCount++; // 增加喜欢数
                        }
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        searchLikeByPostId() {
            fetch(`http://localhost:8080/api/adoption/searchLikeByPostId?postId=${this.postSerialNo}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
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
        },

        deletePost() {
            const serialNumber = this.myArticle[0].serialNo;

            fetch(`http://localhost:8080/api/adoption/deletePost?serialNo=${serialNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    Swal.fire({
                        title: "成功刪除貼文",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/ForumEntrance/ForumHome')
                        }
                    });
                })
                .catch(error => {
                    console.error('刪除失敗:', error.message);

                });
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


                <div class="article">
                    <div class="poster_area">
                        <div class="poster">

                            <div class="topLeft">
                                <img class="poster_icon" :src="'data:image/jpeg;base64,' + this.myArticle[0].userPhoto"
                                    alt="">
                                <div class="poster_data">
                                    <span class="poster_name">{{ this.myArticle[0].userName }}</span>
                                    <span class="poster_userId">@{{ this.myArticle[0].account }}</span>
                                </div>
                            </div>

                            <div class="function_icon_area">
                                <i v-if="this.foundUserInfo.userId == this.myArticle[0].userId"
                                    class="fa-solid fa-trash-can img-2" @click="deletePost()"></i>
                                <i v-if="this.foundUserInfo.userId == this.myArticle[0].userId"
                                    class="fa-solid fa-pen img-3" @click="goTo('/ForumEntrance/edit_myArticle')"></i>
                            </div>
                        </div>
                    </div>

                    <div class="div-20"></div>

                    <div class="article_title">{{ this.myArticle[0].title }}</div>

                    <div class="article_contain">
                        <img class="article_img" :src="'data:image/jpeg;base64,' + this.myArticle[0].postPhoto" alt="">
                        <p class="article_text">{{ this.myArticle[0].postContent }}</p>
                    </div>

                    <div class="div-23">
                        <span>留言</span>
                        <div class="likesCount">
                            <i :class="{ 'fa-solid fa-heart': this.myArticle[0].liked, 'fa-regular fa-heart': !this.myArticle[0].liked }"
                                @click="createLike()"></i>
                            <span @click="searchLikeByPostId()">{{ this.myArticle[0].likesCount }}</span>
                        </div>
                    </div>

                    <div class="div-24"></div>

                    <div class="reply">
                        <button style="margin-left: 950px; background-color:#6E75A8;color: white;border-radius: 15px;"
                            @click="showAllComments = !showAllComments">
                            {{ showAllComments ? '收起留言' : '查看更多' }}
                        </button>
                        <div class="replier" v-for="(item, index) in showAllComments ? postCommentList : lastFiveComments">
                            <img style="width: 70px;height: 70px;border-radius: 50px; margin-right: 10px;"
                                :src="'data:image/jpeg;base64,' + item.userPhoto" alt="">
                            <div class="replier_data">
                                <p class="replier_name">{{ item.userName }}</p>
                                <p class="replier_userId">@{{ item.account }}</p>
                                <div class="replier_text">{{ item.commentContent }}</div>
                                <p>{{ showAllComments ? index + 1 : postCommentList.length - lastFiveComments.length
                                    + index + 1 }}樓</p>
                            </div>
                        </div>
                    </div>

                    <div class="div-20"></div>

                    <div class="newReply" v-if="foundUserInfo">
                        <img class="replier_img" :src="'data:image/jpeg;base64,' + this.foundUserInfo.userPhoto" alt="">
                        <div class="nameAccount">
                            <span style="font-size: 16pt;">{{ this.foundUserInfo.userName }}</span>
                            <span style="font-size: 14pt;">@{{ this.foundUserInfo.account }}</span>
                        </div>
                        <input style="margin-left: 15px; width: 40%; height: 40px;" type="text" v-model="userReply"
                            @keyup.enter="createNewComment()">
                        <button style="margin-left: 15px; background-color:#6E75A8;color: white;border-radius: 15px;"
                            @click="createNewComment()">回覆</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>




<style scoped>
.newReply {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    /* align-items: end; */
    width: 78vw;
    padding: 45px 0;
    height: auto;
    color: #978989;
    padding: 20px 30px 20px 30px;
    font-size: 20pt;

}

@media (max-width: 991px) {
    .article {
        max-width: 100%;
        margin-top: 40px;
    }
}

.poster_area {
    width: 100%;
    align-self: stretch;
}

@media (max-width: 991px) {
    .poster_area {
        max-width: 100%;
        padding-right: 20px;
    }
}

.poster {
    width: 100%;
    gap: 20px;
    display: flex;
    justify-content: space-between;

    .topLeft {
        display: flex;
        padding-left: 20px;
        padding-top: 20px;
    }
}

@media (max-width: 991px) {
    .poster {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.poster_icon {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 96px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 30px;
}

.poster_data {
    display: flex;
    flex-direction: column;
    color: #978989;
    margin: auto 0;
    font: 800 32px Lexend, sans-serif;

    .poster_userId {
        font-size: 16pt;
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
        /* margin-top: 40px; */
    }
}

.article_title {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    font: 800 39px Lexend, sans-serif;
    margin: 40px 0px 40px 76px;
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
    width: 500px;
    height: 380px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    align-self: start;
    margin: 24px 0 0 66px;
}

@media (max-width: 991px) {
    .article_img {
        margin-left: 10px;
    }
}

.article_contain {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #978989;
    align-self: start;

    font: 800 21px Lexend, sans-serif;

    .article_text {
        width: 45%;
        height: 100%;
    }
}

@media (max-width: 991px) {
    .article_contain {
        margin-left: 10px;
    }
}

.div-23 {
    width: 100%;
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
    margin-left: 40px;
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
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
}

.replier {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    /* flex-direction: column; */
}

.replier_data {
    color: #978989;
    font: 800 14pt Lexend, sans-serif;

    .replier_name {
        margin: 0px;
        font-size: 16pt;
    }
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
}</style>