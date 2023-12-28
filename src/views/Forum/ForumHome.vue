<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
export default {
    data() {
        return {
            dog: "M149.365 19.2302H130.094L127.938 15.0094C127.138 13.4416 125.908 12.1231 124.386 11.2015C122.864 10.2799 121.11 9.79175 119.321 9.79163H103.176L94.9617 1.74528C91.9236 -1.22786 86.7356 0.878115 86.7356 5.08121V49.2772L125.277 62.7595V52.265H134.912C145.556 52.265 154.182 43.8146 154.182 33.388V23.9494C154.182 21.342 152.026 19.2302 149.365 19.2302ZM115.641 33.388C112.98 33.388 110.824 31.2761 110.824 28.6687C110.824 26.0613 112.98 23.9494 115.641 23.9494C118.303 23.9494 120.459 26.0613 120.459 28.6687C120.459 31.2761 118.303 33.388 115.641 33.388ZM28.9242 56.9843C23.6128 56.9843 19.289 52.7488 19.289 47.5458C19.289 42.3339 14.9742 38.1072 9.65379 38.1072C4.33333 38.1072 0.0185547 42.3339 0.0185547 47.5458C0.0185547 59.8336 8.09709 70.213 19.289 74.1212C19.289 74.1212 19.289 134.604 19.289 137.212C19.289 139.819 21.4449 141.931 24.1066 141.931H43.3771C46.0388 141.931 48.1947 139.819 48.1947 137.212V104.177H96.3709V137.212C96.3709 139.819 98.5267 141.931 101.188 141.931H120.459C123.121 141.931 125.277 139.819 125.277 137.212V72.7791L80.1265 56.9843H28.9242Z",
            cat: "M83.3225 39.3704C77.5361 39.3704 52.6931 39.847 36.7016 60.0611V39.3704C36.7016 26.6261 24.3546 16.2603 9.17467 16.2603C4.108 16.2603 -0.000976562 19.7099 -0.000976562 23.9636C-0.000976562 28.2173 4.108 31.667 9.17467 31.667C14.2328 31.667 18.3503 35.1239 18.3503 39.3704V100.997C18.3503 109.495 26.5797 116.404 36.7016 116.404H87.1677C89.7025 116.404 91.7555 114.68 91.7555 112.552V108.701C91.7555 104.447 87.6466 100.997 82.5799 100.997H73.4042L110.107 77.8872V112.552C110.107 114.68 112.16 116.404 114.695 116.404H123.87C126.405 116.404 128.458 114.68 128.458 112.552V62.9282C125.508 63.571 122.468 64.0211 119.282 64.0211C101.559 64.0211 86.7319 53.417 83.3225 39.3704ZM128.458 16.2603H110.107L91.7555 0.853516V33.2077C91.7555 45.9712 104.08 56.3178 119.282 56.3178C134.485 56.3178 146.809 45.9712 146.809 33.2077V0.853516L128.458 16.2603ZM107.813 35.5187C105.278 35.5187 103.225 33.795 103.225 31.667C103.225 29.5389 105.278 27.8153 107.813 27.8153C110.348 27.8153 112.401 29.5389 112.401 31.667C112.401 33.795 110.348 35.5187 107.813 35.5187ZM130.752 35.5187C128.217 35.5187 126.164 33.795 126.164 31.667C126.164 29.5389 128.217 27.8153 130.752 27.8153C133.287 27.8153 135.34 29.5389 135.34 31.667C135.34 33.795 133.287 35.5187 130.752 35.5187Z",
            pets: [
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "a; b; c; d; @wei0113__",
                    final_adopter: "@wei0113__",
                    pet_breed: "",
                    pet_status: "很健康; 親人親貓; 貪吃",
                    adoption_status: "正常",
                    adoption_conditions: "",
                    age: "三歲九個月",
                    vaccine: "",
                    pet_profile: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum assumenda cumque amet molestias sapiente id provident perferendis voluptatibus aliquid quia ea praesentium totam eveniet aspernatur, nobis, quod.",
                    ligation: false,
                    type: "狗",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "admin",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "送養中",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "",
                    pet_profile: "",
                    ligation: false,
                    type: "貓",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "已送養",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "",
                    pet_profile: "",
                    ligation: false,
                    type: "狗",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "送養中",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "",
                    pet_profile: "",
                    ligation: false,
                    type: "狗",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "正常",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "",
                    pet_profile: "",
                    ligation: false,
                    type: "狗",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
                {
                    pet_id: "",
                    user_id: "",
                    pet_name: "Ruby",
                    adopter_list: "",
                    final_adopter: "",
                    pet_breed: "",
                    pet_status: "",
                    adoption_status: "送養中",
                    adoption_conditions: "",
                    age: "三歲",
                    vaccine: "",
                    pet_profile: "",
                    ligation: false,
                    type: "貓",
                    pet_photo: "",
                    pet_other_phote: "",
                    location: "",
                },
            ],
            userInfo: {
                user_name: "短腿貓的爸",
                account: "@wei0113__",
                password: "",
                email: "",
                phone: "",
                address: "",
                profile: "",
                age: 0,
                birthday: "",
                gender: "",
                job_occupation: "",
                family_status: "",
                user_photo: "",
            },

            integratedData: null,
        }
    },
    components: {
        ArticleDashBoard
    },
    mounted() {
        this.groupAll()
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
                            // console.log(forumEntranceList)

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
                            this.integratedData = integratedData
                        });
                });
        },


        checkAdopted(adopter) {
            if (adopter == this.userInfo.account) {
                return true;
            }
            return false;
        },
        getPath(type) {
            if (type == "狗") {
                return this.dog;
            }
            if (type == "貓") {
                return this.cat;
            }
        },
        emitGo(item) {
            console.log(item)
            this.$emit("petInfo", item);
            this.$router.push('/AdoptPetDetail');
        },
        goTo(serialNo) {
            sessionStorage.setItem('postSerialNo', serialNo);
            this.$router.push('/ForumEntrance/pre_myArticle')
        },
    }
}
</script>


<template>
    <div class="content">
        <!-- 側邊功能區 -->
        <div class="dashBoardArea">
            <ArticleDashBoard />
        </div>

        <!-- 主顯示頁面 -->
        <div class="showBoard">
            <!-- title -->
            <div class="title">
                <h1>Forum Home</h1>
            </div>


            <!-- v-for the card -->
            <div class="showCardArea">
                <div class="showCard" v-for="(item, index) in integratedData">
                    <div class="cardTop">
                        <img loading="lazy" class="poster_icon" :src="'data:image/jpeg;base64,' + item.userPhoto" />
                        <div class="poster_data">
                            <p class="poster_name">{{ item.userName }}</p>
                            <!-- 短腿貓的爸<br /> -->
                            <p class="poster_userId">{{ item.account }}</p>
                        </div>

                    </div>
                    <div class="cardMiddle">
                        <div class="article_title">{{ item.title }}</div>
                        <img class="img" :src="'data:image/jpeg;base64,' + item.postPhoto" alt="">
                        <div class="cardInfo">
                            <p class="infoText">{{ item.postContent }}</p>
                        </div>

                    </div>
                    <div class="cardLast">
                        <div class="likesCount">
                            <i class="fa-regular fa-heart"></i>
                            <span>{{ item.likesCount }}</span>
                        </div>
                        <p class="moreInfo" @click="goTo(item.serialNo)">...點我看更多</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../../assets/RStyle.scss';

.content {
    background-color: $forumBgc;
}

.showBoard {
    height: auto;
    display: flex;

    .showCardArea {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 20px;

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
                    right: 105px;
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
                    height: 90px;
                    border: 1px solid #978989;
                    border-radius: 20px;
                    margin-bottom: 10px;
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
                    margin-left: 125px;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>