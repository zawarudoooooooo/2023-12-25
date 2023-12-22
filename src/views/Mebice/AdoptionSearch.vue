<script>
import axios from 'axios';


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
            inputType: "",
            inputLocation: "",
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
    },

    mounted() {
        this.search()
    },


    methods: {
        getPath(type) {
            if (type == "狗") {
                return this.dog;
            }
            if (type == "貓") {
                return this.cat;
            }
        },
        search(){
            axios.get('http://localhost:8080/api/adoption/petInfo/getAdoptablePetList', {
                params: {
                    "type": this.inputType,
                    "location": this.inputLocation,
                }
            })
            .then(response => {
                console.log("res", response.data);
                this.pets = response.data.petInfoList;
            })
        },
        emitGo(item) {
            console.log(item)
            this.$emit("petId", item.pet_id);
            sessionStorage.setItem("adopt pet detail", JSON.stringify(item))
            this.$router.push('/AdoptPetDetail');
        }
    }
}
</script>
<template>
    <div class="bgArea">

        <div class="mapSearch">


            <div class="searchArea">


                <span>種類</span>
                <select v-model="inputType">
                    <option value="貓">貓</option>
                    <option value="狗">狗</option>
                </select>

                <span>地點</span>
                <input type="text" v-model="inputLocation">
                <button @click="search()">Search</button>

            </div>


        </div>

        <div class="cardArea">

            <!-- <div class="showCard" v-for="(item, index) in pets">
                <div class="cardTop">
                    <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="circle">
                        <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path :d="getPath(item.type)" fill="white"/>
                        </svg>
                    </div>
                    <h4 class="petNameClick" style="color: #978989;" @click="emitGo(item)">{{ item.pet_name }}</h4>
                </div>

                <div class="cardMiddle">
                    <div class="cardMiddlePhoto"></div>
                    <div class="cardMiddleDescription">
                        <p>{{ item.pet_status }}</p>
                    </div>
                </div>

                <div class="cardLast">
                    <button class="btn btn-specialRed modal-btn" data-bs-toggle="modal" data-bs-target="#confirmModal">
                        <i class="fa-solid fa-hand-holding-heart" style="color: white"></i>
                        <p style="color: white;">申請領養</p>
                    </button>
                    <button class="btn btn-specialBlue modal-btn">
                        <i class="fa-solid fa-comments" style="color: white;"></i>
                        <p style="color: white;">聊聊了解</p>
                    </button>
                </div>

                

            </div> -->


            <!-- new card -->
            <div class="testCardArea" v-for="(item, index) in pets">
                <div class="testCard">
                        <div class="cardTop">
                            <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="circle">
                                <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path :d="getPath(item.type)" fill="white"/>
                                </svg>
                            </div>
                            <h4 class="petNameClick" style="color: #978989;" @click="emitGo(item)">{{ item.pet_name }}</h4>
                        </div>
                    <div class="cardMiddle">
                        <img src="../../../public/cat2.jpg" alt="Placeholder Image">
                        <div class="additionalInfo">
                            <p>{{ item.pet_status }}</p>

                            <div class="btnArea">
                                <button class="btn btn-specialRed modal-btn" data-bs-toggle="modal" data-bs-target="#confirmModal">
                                    <i class="fa-solid fa-hand-holding-heart" style="color: white"></i>
                                    <p style="color: white;">申請領養</p>
                                </button>

                                <button class="btn btn-specialBlue modal-btn">
                                    <i class="fa-solid fa-comments" style="color: white;"></i>
                                    <p style="color: white;">聊聊了解</p>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- confirm  Modal -->
                <div class="modal fade" id="confirmModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        @click="closeModal()"></button>
                                </div>
                                <div class="modal-body">
                                    <h4>確定要申請領養 {{ item.pet_name }} 嗎？</h4>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                        <p style="color: white;">再想一下</p>
                                    </button>
                                    <button class="btn btn-specialRed modal-btn">
                                        <i class="fa-solid fa-hand-holding-heart" style="color: white;"></i>
                                        <p style="color: white;">確定申請</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
        </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../assets/RStyle.scss';


.bgArea {
    width: 100vw;
    height: 100vh;
    background-color: #F8F5EE;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mapSearch {
        width: 85%;
        height: 20%;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 5vh;
        margin-bottom: 3vh;
        position: relative;



        .searchArea {
            margin: 4vh 5vw;

            span {
                font-size: 1.5vw;
                font-weight: bold;
                color: #978989;
            }

            select {
                width: 15%;
                height: 4.5vh;
                margin-left: 4vw;
                margin-right: 5vw;
                border-radius: 2.5vw;
                background-color: #DDDFEE;
                border: none;
                text-align: center;

            }



            input {
                width: 36%;
                height: 4.5vh;
                border-radius: 2.5vw;
                margin-left: 4vw;
                background-color: #DDDFEE;
                border: none;
                padding-left: 2vw;
            }

            button {
                width: 12%;
                height: 5vh;
                border-radius: 3.5vw;
                border: none;
                background-color: #E9D2A6;
                color: white;
                font-weight: 900;
                font-size: 2vw;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                // margin-left: 6vw;
                position: absolute;
                right: 6vw;
                bottom: 3.6vh;
            }
        }
    }

    .cardArea {
        width: 85%;
        height: 88%;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 1vh;
        margin-bottom: 3vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

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
                width: 90%;
                height: 50px;
                display: flex;
                align-items: center;
                margin-bottom: 20px;

                .circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;

                    svg {
                        width: 50px;
                        height: 45px;
                    }
                }

                .yellowCard {
                    background-color: $primary;
                }

                .redCard {
                    background-color: $give;
                }

                .greenCard {
                    background-color: $adoption;
                }

                .petNameClick {
                    &:hover {
                        color: #978989;
                        text-decoration: underline;
                        transition: 0.3s;
                    }
                }
            }

            .cardMiddle {
                width: 100%;
                height: 250px;
                display: flex;
                flex-direction: column;
                align-items: center;

                .cardMiddlePhoto {
                    width: 90%;
                    height: 120px;
                    background-color: rgb(221, 234, 245);
                }

                .cardMiddleDescription {
                    width: 90%;
                    height: 100px;
                    color: #978989;
                    font-size: 12pt;
                    padding: 5px 5px 5px 5px;
                }
            }

            .cardLast {
                width: 85%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .btn {
                    width: 100px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 9pt;
                    padding-left: 10px;
                    padding-right: 10px;

                    i {
                        margin-right: 5px;
                    }
                }

                .btn-green {
                    background-color: $adoption;

                    &:hover {
                        background-color: $adoptionBgc;
                        transition: 0.3s;
                    }
                }
            }

        }

    }

    // modal
    .modal-content {
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 10px 10px 10px;

        .modal-header {
            width: 90%;
            display: flex;
            justify-content: end;
        }

        .modal-body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #978989;
        }

        .modal-footer {
            width: 90%;
            display: flex;
            justify-content: center;
            ;
            align-items: center;

            .btn-green {
                background-color: $adoption;

                &:hover {
                    background-color: $adoptionBgc;
                    transition: 0.3s;
                }
            }

            .modal-btn {
                width: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 10px;
                padding-right: 10px;
                font-size: 12pt;
                margin: 5px;

                i {
                    margin-right: 5px;
                }
            }
        }
    }

}


    .testCardArea {
        width: 280px;
        height: 380px;
        position: relative;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 15px;
        margin: 10px;

        .testCard {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            box-sizing: border-box;
            transition: transform 0.5s ease;

            .cardTop {
                z-index: 1;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }

            .cardMiddle {
                position: relative;
                z-index: 0;

                img {
                    width: 100%;
                    height: auto;
                    transition: transform 0.5s ease;
                }

                .additionalInfo {
                    position: absolute;
                    top: 90%;
                    left: 0;
                    width: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    box-sizing: border-box;
                    transform: translateY(100%);
                    transition: transform 0.5s ease;
                    opacity: 0;

                    // p {
                    //     margin-bottom: 10px;
                    // }

                    .btnArea{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 10px 0px 10px 0px;
                        button {
                            width: 120px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding-left: 10px;
                            padding-right: 10px;
                            font-size: 10pt;
                            // padding: 8px 16px;
                            // background-color: #3498db;
                            // color: white;
                            // border: none;
                            // border-radius: 4spx;
                            // cursor: pointer;

                            i {
                                margin-right: 5px;
                            }
                            
                        }
                    }
                    
                }
            }

            &:hover {
                transform: translateY(-15%);

                .cardMiddle img {
                    transform: translateY(-20%);
                }

                .cardMiddle .additionalInfo {
                    transform: translateY(0%);
                    opacity: 1;
                }
            }
        }
    }



// pet card
.yellowCard{
    background-color: $primary;
}
.redCard{
    background-color: $give;
}
.greenCard{
    background-color: $adoption;
}
</style>