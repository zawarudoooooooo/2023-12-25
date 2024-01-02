<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            isCheckPage: false,
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            foundUser: null,
            title: null,
            postContent: null,
            imageUrl: null,
        }
    },
    components: {
        ArticleDashBoard,
    },
    mounted() {
        this.searchAllUserInfo()
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
    },
    methods: {
        //開關發文確認視窗
        switch_check_page() {
            this.isCheckPage = !this.isCheckPage
        },
        //拿user資料
        searchAllUserInfo() {
            fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const foundUser = data.userInfoList.find(user => user.userId === this.foundUserInfo.userId);
                    if (foundUser) {
                        console.log('找到了對應的使用者:', foundUser);

                        const base64Prefix = 'data:image/jpeg;base64,';
                        const filePath = base64Prefix + foundUser.userPhoto;
                        foundUser.filePath = filePath;

                        this.$emit("userInfo", foundUser);
                        this.foundUser = foundUser;
                    } else {
                        console.log('找不到對應的使用者');
                    }
                });
        },

        publishPost() {
            const postData = {
                userId: this.foundUser.userId,
                title: this.title,
                postContent: this.postContent,
                postPhoto: this.imageUrl.split(',')[1],
            };

            const requestData = {
                forumEntrance: postData
            };

            fetch('http://localhost:8080/api/adoption/createNewPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Post published:', data);

                    Swal.fire({
                        title: "成功新增貼文",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/ForumEntrance/ForumMyArticle');
                        }
                    });
                })
                .catch(error => {
                    console.error('Error publishing post:', error);
                });
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.imageUrl = event.target.result;
            };
            reader.readAsDataURL(file);
        },
    },
}
</script>


<template>
    <div class="all">
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
                        <div class="article">
                            <div class="poster_area">
                                <div class="poster">
                                    <div class="div-13">
                                        <div class="div-14">
                                            <div class="profileArea" v-if="foundUser">
                                                <img v-if="this.foundUser.userPhoto" :src="this.foundUser.filePath" alt=""
                                                    style="border-radius: 50%; border: 3px solid;" height="100px"
                                                    width="100px">

                                                <div class="poster_data">
                                                    <span class="poster_name">{{ foundUser.userName }}</span>
                                                    <p>@{{ foundUser.account }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <input class="article_title" type="text" placeholder="輸入標題" v-model="title" />


                            <input type="file" @change="handleFileChange">
                            <img :src="imageUrl" class="cropper-img">
                            <div class="article_contain">
                                <textarea class="article_text" v-model="postContent" type="text"
                                    placeholder="輸入內文"></textarea>
                            </div>
                            <button class="dashboard_btn">
                                <i class="fa-solid fa-plus plus_icon"></i>
                                <div class="dashboard_btn_text" @click="switch_check_page()">我要發文</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="check_post" v-if="isCheckPage == true">
        <div class="bg">
            <div class="check_area">
                <div class="check_text">
                    <p>確定送出?</p>
                </div>
                <div class="check_btn">
                    <button class="cancal" @click="switch_check_page()">再考慮一下</button>
                    <button class="ok" @click="publishPost()">好!現在就發</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/RStyle.scss';


.btm {
    width: 100px;
    height: 50px;
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

.check_post {

    /* position: relative; */
    .bg {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: #eaeaea62;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .check_area {
        width: 60%;
        height: 50%;
        border: 1px solid black;
        border-radius: 20px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        /* position: absolute; */
        /* left: 500px; */
        .check_text {
            font-size: 26pt;
            /* margin-bottom: 250px; */
        }

        .check_btn {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cancal {
            border-radius: 35px;
            /* box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28); */
            color: white;
            align-self: stretch;
            display: flex;
            margin: 110px 80px;
            justify-content: center;
            align-items: center;
            gap: 11px;
            padding: 17px 21px;
            background-color: #a2a3ab;
        }

        .ok {
            border-radius: 35px;
            /* box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28); */
            color: white;
            align-self: stretch;
            display: flex;
            margin: 110px 80px;
            justify-content: center;
            align-items: center;
            gap: 11px;
            padding: 17px 21px;
            background-color: #6e75a8;
        }
    }
}


.in_contain {
    gap: 20px;
    display: flex;
}



.dashboard {
    height: 13vw;
}



.dashboard_btn {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #6e75a8;
    align-self: stretch;
    display: flex;
    margin-top: 111px;
    justify-content: center;
    align-items: center;
    gap: 11px;
}



.plus_icon {
    font-size: 18pt;
    color: white;
}

.dashboard_btn_text {
    color: #fff;
    text-align: right;
    font: 800 31px Lexend, sans-serif;
}

.out_article_area {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 80%;
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
    font-size: 14pt;
    padding: 20px 30px 20px 30px;
}



.article {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    margin: 57px 0 4px;
    padding: 0 18px;
}



.poster_area {
    align-self: stretch;
}

.poster_name{
}


.poster {
    gap: 20px;
    display: flex;
}


.div-13 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    // width: 57%;
    margin-left: 0px;
}



.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 18px;

    .profileArea {
        width: 100%;
        display: flex;
        color: #978989;
        margin: auto 0;
        font: 800 32px Lexend, sans-serif;
        align-items: center;

        img {
            margin-right: 50px;
        }

        
    }
}





.poster_data {
    width: 900px;
    display: flex;
    justify-content:space-between;
    color: #978989;
    font: 800 32px Lexend, sans-serif;
}

.div-20 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 42px;
    height: 5px;
}



.article_title {
    width: 550px;
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin-top: 15px;
    margin-bottom: 15px;
    font: 800 39px Lexend, sans-serif;
}





.article_contain {
    color: #978989;
    align-self: start;
    margin-top: 15px;
    font: 800 21px Lexend, sans-serif;
}



.article_text {
    width: 550px;
    height: 400px;
    border-radius: 15px;
}


.cropper-img {
    width: 550px;
    height: 300px;
    border: 3px solid;
    border-radius: 15px;
}


.cropper-modal {

    padding: 20px;
    margin: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: white;

}
</style>
