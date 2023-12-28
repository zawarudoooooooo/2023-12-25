<script>
import axios from 'axios';
import Swal from 'sweetalert2'


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
            inputArea: "",
            inputLocation: "",
            searchStatus: "送養中",
            owner: {
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
            },
            adopter: {
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
            },
        }
    },

    mounted() {
        this.search()
    },

    computed: {
        filteredCities() {
            if (this.inputArea) {
                switch (this.inputArea) {
                    case "北部":
                        return ["台北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣"];
                    case "中部":
                        return ["台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣"];
                    case "南部":
                        return ["高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣"];
                    case "東部":
                        return ["花蓮縣", "台東縣"];
                    default:
                        return [];
                }
            } else {
                return [
                    "台北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣",
                    "台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣",
                    "高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣",
                    "花蓮縣", "台東縣"
                ];
            }
        },
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
                    "status": this.searchStatus,
                    "type": this.inputType,
                    "area": this.inputArea,
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
            this.$router.push('/AdoptionSearch/AdoptSearchDetail');
        },
        confirmApply(item){

            const user = JSON.parse(sessionStorage.getItem("foundUserInfo"));

            if(user == null){
                Swal.fire('請先登錄！');
                return;
            }

            axios.post('http://localhost:8080/api/adoption/petInfo/adoptPet', {
                petId: item.pet_id,
                userId: user.userId
            })
            .then(response => {
                console.log(response.data);
                if (response.data.rtnCode == 'SUCCESSFUL') {
                    Swal.fire({
                        title: "申請領養成功！!",
                        icon: "success"
                    })
                    let adopterId = JSON.parse(sessionStorage.getItem("foundUserInfo")).userId
                    this.send_noti_type1(response.data.petInfo.user_id,adopterId,response.data.petInfo.pet_id)
                } else if (response.data.rtnCode == 'THE_USER_HAS_ALREADY_ADOPTED_THE_PET'){
                    Swal.fire('您已認養過此寵物！');
                } else {
                    Swal.fire('出了些錯誤，請再次檢查');
                }
            })
            .catch(error => {
                console.error(error);
            })
        },

        changeStatus(status){
                this.searchStatus = status;
                this.search();
        },
        getOwnerAndAdopterInfo(pet) {

            const ownerId = pet.user_id;
            const adopterId = pet.final_adopter_id;

            const idString = `${ownerId},${adopterId}`;

            axios.get('http://localhost:8080/api/adoption/userInfo/findAdopters', {
                params: {
                    idList: idString
                }
            })
            .then(response => {
                console.log(response.data)
                const resList = response.data.voList;
                for(let i = 0; i < resList.length; i++){
                    if(resList[i].userInfo.userId == ownerId){
                        this.owner = resList[i];
                    } else if (resList[i].userInfo.userId == adopterId){
                        this.adopter = resList[i];
                    }
                }
            })
            .catch(error => {
                console.error(error)
            })
        },

        send_noti_type1(userId,sendId,petId){
            console.log(userId);
            console.log(sendId);
            console.log(petId);
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: userId,
                    sendId: sendId,
                    petId: petId,
                    notifiType: 1
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                })
        },

        openChat(item){
            
            const user = JSON.parse(sessionStorage.getItem("foundUserInfo"));

            if(user == null){
                Swal.fire('請先登錄！');
                return;
            }

            const subList = [];
            subList.push(user.userId);
            subList.push(item.user_id);

            const subListStr = subList.join(',');


            axios.post(`http://localhost:8080/api/adoption/chat/create_room`, {
                creator: user.userId, 
                subscriberList: subListStr, 
                name: subListStr
            })
            .then(response => {
                console.log(response.data)
                this.$emit('callChat', response.data.chatRoom)
            })
            .catch(error => {
                console.error(error);
            })
        }
    }
}
</script>
<template>
    <div class="bgArea">

        <div class="mapSearch">

            <div class="searchArea">

                <div class="searchAreaSelect">
                    <span>種類</span>
                    <select v-model="inputType">
                        <option value=""></option>
                        <option value="貓">貓</option>
                        <option value="狗">狗</option>
                    </select>
                    
                    <span>區域</span>
                    <select v-model="inputArea">
                        <option value=""></option>
                        <option value="北部">北部</option>
                        <option value="中部">中部</option>
                        <option value="南部">南部</option>
                        <option value="東部">東部</option>
                    </select>

                    <span>縣市</span>
                    <select v-model="inputLocation">
                        <option value=""></option>
                        <option v-for="cityOption in filteredCities" :value="cityOption">
                            {{ cityOption }}
                        </option>
                    </select>
                </div>
                

                <div class="searchAreaIcon">
                    <i class="fa-solid fa-magnifying-glass"  @click="search()"></i>
                </div>

            </div>


        </div>


        <div class="statusArea">
            <button class="btn-choose" @click="changeStatus('送養中')" :class="{btnRedStyle: searchStatus == '送養中'}">送養中</button>
            <button class="btn-choose" @click="changeStatus('已送養')" :class="{btnGreenStyle: searchStatus == '已送養'}">已送養</button>
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


            <!-- new card for 送養中 -->
            <div v-show="searchStatus == '送養中'" class="testCardArea" v-for="(item, index) in pets">
                <div class="testCard" @click="emitGo(item)">
                        <div class="cardTop">
                            <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="circle">
                                <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path :d="getPath(item.type)" fill="white"/>
                                </svg>
                            </div>
                            <h4 class="petNameClick" style="color: #978989;">{{ item.pet_name }}</h4>
                        </div>
                    <div class="cardMiddle">
                        <img style="height: 240px; border-radius: 15px;"  :src="'data:image/jpeg;base64,' + item.pet_photo" alt="">
                        <div class="additionalInfo" @click.stop="emitGo(item)">
                            <p>{{ item.pet_status }}</p>

                            <div class="btnArea">
                                <button class="btn btn-specialRed modal-btn" data-bs-toggle="modal" :data-bs-target="'#confirmModal'+index">
                                    <i class="fa-solid fa-hand-holding-heart" style="color: white"></i>
                                    <p style="color: white;">申請領養</p>
                                </button>

                                <button class="btn btn-specialBlue modal-btn" @click.stop="openChat(item)">
                                    <i class="fa-solid fa-comments" style="color: white;"></i>
                                    <p style="color: white;">聊聊了解</p>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
                <!-- confirm  Modal -->
                <div class="modal fade" :id="'confirmModal'+index" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="confirmModal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h4>確定要申請領養 {{ item.pet_name }} 嗎？</h4>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                        <p style="color: white;">再想一下</p>
                                    </button>
                                    <button class="btn btn-specialRed modal-btn" data-bs-dismiss="modal" aria-label="Close" @click="confirmApply(item)">
                                        <i class="fa-solid fa-hand-holding-heart" style="color: white;"></i>
                                        <p style="color: white;">確定申請</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <!-- new card for 已送養 -->
            <div v-show="searchStatus == '已送養'" class="testCardArea" v-for="(item, index) in pets">
                <div class="testCard">
                        <div class="cardTop">
                            <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="circle">
                                <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path :d="getPath(item.type)" fill="white"/>
                                </svg>
                            </div>
                            <h4 class="petNameClick" style="color: #978989;">{{ item.pet_name }}</h4>
                        </div>
                    <div class="cardMiddle">
                        <img style="height: 240px; border-radius: 15px;"  :src="'data:image/jpeg;base64,' + item.pet_photo" alt="">
                        <div class="additionalInfo">
                            <p>{{ item.pet_status }}</p>

                            <div class="btnAreaForAdopted">
                                <button class="btn btn-specialBlue" data-bs-toggle="modal" :data-bs-target="'#detailModal'+index"
                                    @click="getOwnerAndAdopterInfo(item)">
                                    <i class="fa-solid fa-circle-info" style="color: white;"></i>
                                    <p style="color: white;">查看詳細</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" :id="'detailModal'+index" data-bs-backdrop="true" data-bs-keyboard="true"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" @click="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <div class="modalBodyTop">
                                    <div class="modalBodyTopTitle">
                                        <h5>送養人</h5>
                                    </div>
                                    <div class="usernameAndid">
                                        <p>{{ this.owner.userInfo.userName }}</p>
                                        <img :src="'data:image/jpeg;base64,' + this.owner.userInfo.userPhoto" alt="">
                                        <p>@{{ this.owner.userInfo.account }}</p>
                                    </div>
                                    <div class="modalBodyLast">
                                        <div class="modalBodyLastShow">
                                            <div class="modalBodyLastTitle">
                                                <h6>{{ this.owner.userInfo.userName }}的寵物</h6>
                                            </div>
                                            <!-- v-for -->
                                            <div class="modalBodyLastPet">
                                                <div class="showCard" v-for="(pet, index) in this.owner.petInfoList">
                                                    <div :class="{ 'yellowCard': pet.adoption_status == '正常' }, { 'redCard': pet.adoption_status == '送養中' }, { 'greenCard': pet.adoption_status == '已送養' }"
                                                        class="middleCard">
                                                        <svg viewBox="10 0 140 110" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path :d="getPath(pet.type)" fill="white" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modalBodyTop">
                                    <div class="modalBodyTopTitle">
                                        <h5>領養人</h5>
                                    </div>
                                    <div class="usernameAndid">
                                        <p>{{ this.adopter.userInfo.userName }}</p>
                                        <img :src="'data:image/jpeg;base64,' + this.adopter.userInfo.userPhoto" alt="">
                                        <p>@{{ this.adopter.userInfo.account }}</p>
                                    </div>
                                    <div class="modalBodyLast">
                                        <div class="modalBodyLastShow">
                                            <div class="modalBodyLastTitle">
                                                <h6>{{ this.adopter.userInfo.userName }}的寵物</h6>
                                            </div>
                                            <!-- v-for -->
                                            <div class="modalBodyLastPet">
                                                <div class="showCard" v-for="(pet, index) in this.adopter.petInfoList">
                                                    <div :class="{ 'yellowCard': pet.adoption_status == '正常' }, { 'redCard': pet.adoption_status == '送養中' }, { 'greenCard': pet.adoption_status == '已送養' }"
                                                        class="middleCard">
                                                        <svg viewBox="10 0 140 110" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path :d="getPath(pet.type)" fill="white" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal"
                                    aria-label="Close">
                                    <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                    <p style="color: white;">返回</p>
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
    height: auto;
    background-color: $giveBgcLight;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mapSearch {
        width: 90vw;
        height: 120px;
        background-color: #fff;
        border-radius: 2vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 80px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .searchArea {
            width: 90vw;
            height: 90px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 50px 10px 50px;
            .searchAreaSelect{
                width: 80%;
                display: flex;
                align-items: center;
            }

            span {
                font-size: 22pt;
                font-weight: bold;
                color: #978989;
                margin-right: 2vw;
            }

            select {
                width: 15%;
                height: 40px;
                font-size: 1.1vw;
                border-radius: 2.5vw;
                background-color: #DDDFEE;
                border: none;
                text-align: center;
                margin-right: 4vw;

            }

            .fa-magnifying-glass {
                color:  #C79CA4;
                font-size: 30pt;
                margin-right: 3vw;

                &:hover{
                    color: #c25367;
                    transition: 0.5s;
                    cursor: pointer;
                }
            }
        }
    }

    .statusArea{
        width: 90%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        .btn-choose{
            background-color: transparent;
            border: none;
            font-size: 18pt;
            // color:  #C79CA4;
            color: #978989;
            // 下劃線
            text-decoration: none;
            background-image: linear-gradient(#ffffff, #ffffff);
            background-position: left bottom;
            background-size: 0 3px; // 設定漸變的大小，一開始為 0
            background-repeat: no-repeat;
            transition: background-size 0.15s linear; //背景的大小會在 0.15 秒內以線性方式變成 100%
            z-index: 1;
            &:hover {
                transition: 0.7s;
                background-size: 100% 3px;
            }
        }
        .btnRedStyle{
            border-bottom: $specialRed 2px solid;
            // color: #c25367;
            color:  #C79CA4;
        }
        .btnGreenStyle{
            border-bottom: $adoption 2px solid;
            color: #B2D1C0;
        }
    }

    .cardArea {
        width: 90%;
        height: auto;
        min-height: 40vh;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 1vh;
        margin-bottom: 3vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px 10px 20px 10px;

        // .showCard {
        //     width: 300px;
        //     height: 380px;
        //     display: flex;
        //     flex-direction: column;
        //     align-items: center;
        //     border-radius: 30px;
        //     padding: 20px 20px 20px 20px;
        //     margin: 20px 15px 25px 15px;
        //     background-color: white;
        //     color: #978989;
        //     font-size: 14pt;
        //     box-shadow: 0 0 3px 2px lightgray;
        //     color: white;

        //     &:hover {
        //         box-shadow: 3px 3px 5px gray;
        //         transition: 0.8s;
        //     }

        //     .cardTop {
        //         width: 90%;
        //         height: 50px;
        //         display: flex;
        //         align-items: center;
        //         margin-bottom: 20px;

        //         .circle {
        //             width: 50px;
        //             height: 50px;
        //             border-radius: 50%;
        //             display: flex;
        //             justify-content: center;
        //             align-items: center;
        //             color: white;

        //             svg {
        //                 width: 50px;
        //                 height: 45px;
        //             }
        //         }

        //         .petNameClick {
        //             &:hover {
        //                 color: #978989;
        //                 text-decoration: underline;
        //                 transition: 0.3s;
        //             }
        //         }
        //     }

        //     .cardMiddle {
        //         width: 100%;
        //         height: 250px;
        //         display: flex;
        //         flex-direction: column;
        //         align-items: center;

        //         .cardMiddlePhoto {
        //             width: 90%;
        //             height: 120px;
        //             background-color: rgb(221, 234, 245);
        //         }

        //         .cardMiddleDescription {
        //             width: 90%;
        //             height: 100px;
        //             color: #978989;
        //             font-size: 12pt;
        //             padding: 5px 5px 5px 5px;
        //         }
        //     }

        //     .cardLast {
        //         width: 85%;
        //         height: 50px;
        //         display: flex;
        //         justify-content: space-between;
        //         align-items: center;

        //         .btn {
        //             width: 100px;
        //             height: 30px;
        //             display: flex;
        //             justify-content: center;
        //             align-items: center;
        //             font-size: 9pt;
        //             padding-left: 10px;
        //             padding-right: 10px;

        //             i {
        //                 margin-right: 5px;
        //             }
        //         }

        //         .btn-green {
        //             background-color: $adoption;

        //             &:hover {
        //                 background-color: $adoptionBgc;
        //                 transition: 0.3s;
        //             }
        //         }
        //     }

        // }

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
                        width: 100px;
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
                .btnAreaForAdopted{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 10px 0px 10px 0px;
                    button {
                        width: 100px;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-left: 10px;
                        padding-right: 10px;
                        font-size: 10pt;
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

        .modalBodyTop {
            width: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-bottom: 20px;

            .usernameAndid {
                width: 400px;
                height: 60px;
                background-color: white;
                border-radius: 10px;
                padding: 10px 10px 10px 10px;
                box-shadow: 3px 3px 3px 3px gray;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16pt;
                margin-bottom: 20px;

                i {
                    color: #E9D2A6;
                    font-size: 35pt;
                    position: absolute;
                    left: 200px;
                }

                img{
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    position: absolute;
                    left: 200px;
                }
            }
        }

        .modalBodyLast {
            display: flex;
            justify-content: center;
            align-items: center;

            .modalBodyLastShow {
                width: 400px;
                height: auto;
                min-height: 80px;
                background-color: white;
                border-radius: 10px;
                padding: 10px 10px 10px 10px;
                box-shadow: 3px 3px 3px 3px gray;
                font-size: 12pt;
                margin-bottom: 20px;

                .modalBodyLastPet {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    .middleCard {
                        width: 65px;
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        margin: 10px 5px 5px 5px;
                        color: white;

                        svg {
                            width: 50px;
                            height: 45px;
                        }
                    }
                }
            }
        }
    }

    .modal-footer {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
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
</style>