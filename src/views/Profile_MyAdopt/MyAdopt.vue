<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import ProfileDashBoard from '../../components/profiledashboard.vue';
export default{
    data(){
        return{
            dog: "M149.365 19.2302H130.094L127.938 15.0094C127.138 13.4416 125.908 12.1231 124.386 11.2015C122.864 10.2799 121.11 9.79175 119.321 9.79163H103.176L94.9617 1.74528C91.9236 -1.22786 86.7356 0.878115 86.7356 5.08121V49.2772L125.277 62.7595V52.265H134.912C145.556 52.265 154.182 43.8146 154.182 33.388V23.9494C154.182 21.342 152.026 19.2302 149.365 19.2302ZM115.641 33.388C112.98 33.388 110.824 31.2761 110.824 28.6687C110.824 26.0613 112.98 23.9494 115.641 23.9494C118.303 23.9494 120.459 26.0613 120.459 28.6687C120.459 31.2761 118.303 33.388 115.641 33.388ZM28.9242 56.9843C23.6128 56.9843 19.289 52.7488 19.289 47.5458C19.289 42.3339 14.9742 38.1072 9.65379 38.1072C4.33333 38.1072 0.0185547 42.3339 0.0185547 47.5458C0.0185547 59.8336 8.09709 70.213 19.289 74.1212C19.289 74.1212 19.289 134.604 19.289 137.212C19.289 139.819 21.4449 141.931 24.1066 141.931H43.3771C46.0388 141.931 48.1947 139.819 48.1947 137.212V104.177H96.3709V137.212C96.3709 139.819 98.5267 141.931 101.188 141.931H120.459C123.121 141.931 125.277 139.819 125.277 137.212V72.7791L80.1265 56.9843H28.9242Z",
            cat: "M83.3225 39.3704C77.5361 39.3704 52.6931 39.847 36.7016 60.0611V39.3704C36.7016 26.6261 24.3546 16.2603 9.17467 16.2603C4.108 16.2603 -0.000976562 19.7099 -0.000976562 23.9636C-0.000976562 28.2173 4.108 31.667 9.17467 31.667C14.2328 31.667 18.3503 35.1239 18.3503 39.3704V100.997C18.3503 109.495 26.5797 116.404 36.7016 116.404H87.1677C89.7025 116.404 91.7555 114.68 91.7555 112.552V108.701C91.7555 104.447 87.6466 100.997 82.5799 100.997H73.4042L110.107 77.8872V112.552C110.107 114.68 112.16 116.404 114.695 116.404H123.87C126.405 116.404 128.458 114.68 128.458 112.552V62.9282C125.508 63.571 122.468 64.0211 119.282 64.0211C101.559 64.0211 86.7319 53.417 83.3225 39.3704ZM128.458 16.2603H110.107L91.7555 0.853516V33.2077C91.7555 45.9712 104.08 56.3178 119.282 56.3178C134.485 56.3178 146.809 45.9712 146.809 33.2077V0.853516L128.458 16.2603ZM107.813 35.5187C105.278 35.5187 103.225 33.795 103.225 31.667C103.225 29.5389 105.278 27.8153 107.813 27.8153C110.348 27.8153 112.401 29.5389 112.401 31.667C112.401 33.795 110.348 35.5187 107.813 35.5187ZM130.752 35.5187C128.217 35.5187 126.164 33.795 126.164 31.667C126.164 29.5389 128.217 27.8153 130.752 27.8153C133.287 27.8153 135.34 29.5389 135.34 31.667C135.34 33.795 133.287 35.5187 130.752 35.5187Z",
            pets: [],
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
        }
    },
    components: {
        ProfileDashBoard
    },
    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
        this.getMyAdoptList()
    },
    methods: {
        getMyAdoptList(){
            axios.get('http://localhost:8080/api/adoption/petInfo/getAdoptPetList', {
                params: {
                    "userId": this.userInfo.userId
                }
            })
            .then(response => {
                console.log("response adopted pet", response.data)
                this.pets = response.data.petInfoList
            })
            .catch(error => {
                console.error(error)
            })
        },
        checkAdopted(adopter){
            if(adopter == this.userInfo.userId){
                return true;
            }
            return false;
        },
        getPath(type){
            if(type == "狗"){
                return this.dog;
            }
            if(type == "貓"){
                return this.cat;
            }
        },
        emitGo(item){
            console.log(item)
            this.$emit("petId", item.pet_id);
            sessionStorage.setItem("the pet", JSON.stringify(item))
            this.$router.push('/AdoptPetDetail');
        },
        quitApply(item){
            const user = JSON.parse(sessionStorage.getItem("foundUserInfo"));

            axios.post('http://localhost:8080/api/adoption/petInfo/quitAdoptPet', {
                petId: item.pet_id,
                userId: user.userId
            })
            .then(response => {
                console.log(response.data);
                if (response.data.rtnCode == 'SUCCESSFUL') {
                    Swal.fire({
                        title: "取消申請成功！!",
                        icon: "success"
                    })
                    this.send_noti_type2(item.user_id,user.userId,item.pet_id)
                } else {
                    Swal.fire('出了些錯誤，請再次檢查');
                }
            })
            .catch(error => {
                console.error(error);
            })

            
        },
        send_noti_type2(userId,sendId,petId){
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: userId,
                    sendId: sendId,
                    petId: petId,
                    notifiType: 2
                }
            }
            )
                .then(response => {
                    console.log(response.data)
                    // this.notifi_arr = response.data.notifiReq
                    // console.log(this.notifi_arr.reverse())//反轉了就整個反轉了
                })
                .catch(error => {
                    console.error(error);
                })

        },
        rejectApply(item){
            const user = JSON.parse(sessionStorage.getItem("foundUserInfo"));
            
            axios.post('http://localhost:8080/api/adoption/petInfo/adopterConfirm', {
                petId: item.pet_id,
                ownerId: item.user_id,
                adopterId: user.userId,
                adopterRes: 2
            })
            .then(response => {
                console.log(response.data);
                if (response.data.rtnCode == 'SUCCESSFUL') {
                    Swal.fire({
                        title: "取消認養成功！!",
                        icon: "success"
                    })
                    
                    this.send_noti_type6(item.user_id,user.userId,item.pet_id)
                } else {
                    Swal.fire('出了些錯誤，請再次檢查');
                }
            })
            .catch(error => {
                console.error(error);
            })
            
        },
        confirmApply(item){
            const user = JSON.parse(sessionStorage.getItem("foundUserInfo"));

            const thing = {
                petId: item.pet_id,
                ownerId: item.user_id,
                adopterId: user.userId,
                adopterRes: 2
            }
            console.log("the entered thing", thing)
            
            axios.post('http://localhost:8080/api/adoption/petInfo/adopterConfirm', {
                petId: item.pet_id,
                ownerId: item.user_id,
                adopterId: user.userId,
                adopterRes: 1
            })
            .then(response => {
                console.log(response.data);
                if (response.data.rtnCode == 'SUCCESSFUL') {
                    Swal.fire({
                        title: "同意領養成功！!",
                        icon: "success"
                    })
                    this.send_noti_type5(item.user_id,user.userId,item.pet_id)
                } else {
                    Swal.fire('出了些錯誤，請再次檢查');
                }
            })
            .catch(error => {
                console.error(error);
            })

        },
        send_noti_type5(userId,sendId,petId){
            console.log(userId);
            console.log(sendId);
            console.log(petId);
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: userId,
                    sendId: sendId,
                    petId: petId,
                    notifiType: 5
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
        send_noti_type6(userId,sendId,petId){
            console.log(userId);
            console.log(sendId);
            console.log(petId);
            axios.post(`http://localhost:8080/api/notification/Noti`, {
                notification: {
                    userId: userId,
                    sendId: sendId,
                    petId: petId,
                    notifiType: 6
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
    }
}
</script>


<template>
<div class="content">
    <!-- 側邊功能區 -->
    <div class="dashBoardArea">
        <ProfileDashBoard />
    </div>

    <!-- 主顯示頁面 -->
    <div class="showBoard">
        <!-- title -->
        <div class="title">
            <h1>我的領養</h1>
        </div>

        <!-- v-for the card -->
        <div class="showCardArea" >
            <div class="showCard" v-for="(item, index) in pets">
                <div class="cardTop">
                    <div :class="{'yellowCard' : item.adoption_status == '正常'}, {'redCard' : item.adoption_status == '送養中'}, {'greenCard' : item.adoption_status == '已送養'}" class="circle">
                        <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path :d="getPath(item.type)" fill="white"/>
                        </svg>
                    </div>
                    <h4 class="petNameClick" style="color: #978989;" @click="emitGo(item)">{{ item.pet_name }}</h4>
                </div>
                <div class="cardMiddle">
                    <div class="cardMiddlePhoto">
                        <!--加入這裡-->
                        <img style="height: 240px ; width: 238px; border-radius: 15px;"  :src="'data:image/jpeg;base64,' + item.pet_photo" alt="">
                    </div>
                    <div class="cardMiddleDescription">
                        <p>{{ item.pet_status }}</p>
                    </div>
                </div>
                <div v-if=" !(item.adoption_status == '已送養' && item.final_adopter_id == this.userInfo.userId)" class="cardLast">
                    <!-- red btn -->
                    <!-- cancel -->
                    <button v-if="checkAdopted(item.final_adopter_id)" class="btn btn-specialRed modal-btn" data-bs-toggle="modal" :data-bs-target="'#cancelModal'+index">
                        <i class="fa-solid fa-xmark" style="color: white"></i>
                        <p style="color: white;">取消領養</p>
                    </button>
                    <!-- quit -->
                    <button v-else class="btn btn-specialRed modal-btn" data-bs-toggle="modal" :data-bs-target="'#quitModal'+index">
                        <i class="fa-solid fa-xmark" style="color: white;"></i>
                        <p style="color: white;">取消申請</p>
                    </button>
                    
                    <!-- green btn -->
                    <!-- confirm -->
                    <button v-if="checkAdopted(item.final_adopter_id)" class="btn btn-green modal-btn" data-bs-toggle="modal" :data-bs-target="'#confirmModal'+index">
                        <i class="fa-solid fa-check" style="color: white"></i>
                        <p style="color: white;">確定領養</p>
                    </button>
                    <!-- blue btn -->
                    <!-- chat -->
                    <button v-else class="btn btn-specialBlue modal-btn">
                        <i class="fa-solid fa-comments" style="color: white;"></i>
                        <p style="color: white;">聊聊了解</p>
                    </button>
                </div>
                
                <!-- quit Modal -->
                <div  class="modal fade" :id="'quitModal'+index" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <h4>確定要取消認養 {{ item.pet_name  }} 的申請嗎？</h4>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close" >
                                    <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                    <p style="color: white;">再想一下</p>
                                </button>
                                <button class="btn btn-specialRed modal-btn" data-bs-dismiss="modal" aria-label="Close" @click="quitApply(item)">
                                    <i class="fa-solid fa-xmark" style="color: white;"></i>
                                    <p style="color: white;">取消申請</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- confirm Modal -->
                <div  class="modal fade" :id="'confirmModal'+index" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <h4>確定要接受 {{ item.pet_name  }} 的送養嗎？</h4>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close" >
                                    <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                    <p style="color: white;">再想一下</p>
                                </button>
                                <button v-if="!this.isGived" class="btn btn-green modal-btn" @click="confirmApply(item)">
                                    <i class="fa-solid fa-check" style="color: white"></i>
                                    <p style="color: white;">接受送養</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- cancel Modal -->
                <div  class="modal fade" :id="'cancelModal'+index" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <h4>確定要放棄 {{ item.pet_name  }} 的領養嗎？</h4>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close" >
                                    <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                    <p style="color: white;">再想一下</p>
                                </button>
                                <button class="btn btn-specialRed modal-btn" @click="rejectApply(item)">
                                    <i class="fa-solid fa-xmark" style="color: white;"></i>
                                    <p style="color: white;">放棄領養</p>
                                </button>
                            </div>
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

.content{
    background-color: $primaryBgc;
}
.showBoard{
    height: auto;
    display: flex;
    .showCardArea{
        width: 100%;
        height: auto;
        display: flex;
        // justify-content: center;
        flex-wrap: wrap;
        padding-top: 20px;
        .showCard{
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
            &:hover{
                box-shadow: 3px 3px 5px gray;
                transition: 0.8s;
            }
            .cardTop{
                width: 90%;
                height: 50px;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .cardTopSvg{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    padding: 10px 0px 0px 0px;
                    margin-right: 10px;
                    .svg{
                        width: 50px;
                        height: 45px;
                    }
                }
                .petNameClick{
                    &:hover{
                        color: $primary;
                        text-decoration: underline;
                        transition: 0.3s;
                    }
                }
            }
            .cardMiddle{
                width: 100%;
                height: 250px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .cardMiddlePhoto{
                    width: 90%;
                    height: 120px;
                    background-color: aliceblue;
                }
                .cardMiddleDescription{
                    width: 90%;
                    height: 100px;
                    color: #978989;
                    font-size: 12pt;
                    padding: 5px 5px 5px 5px;
                }
            }
            .cardLast{
                width: 85%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btn{
                    width: 100px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 9pt;
                    padding-left: 10px;
                    padding-right: 10px;
                    i{
                        margin-right: 5px;
                    }
                }
                .btn-green{
                    background-color: $adoption;
                    &:hover{
                        background-color: $adoptionBgc;
                        transition: 0.3s;
                    }
                }
            }
        }
    }
}

.circle{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    svg{
        width: 50px;
        height: 45px;
    }
}

// modal
.modal-content{
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 10px 10px;
    .modal-header{
        width: 90%;
        display: flex;
        justify-content: end;
    }
    .modal-body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #978989;
    }
    .modal-footer{
        width: 90%;
        display: flex;
        justify-content: center;;
        align-items: center;
        .btn-green{
            background-color: $adoption;
            &:hover{
                background-color: $adoptionBgc;
                transition: 0.3s;
            }
        }
        .modal-btn{
            width: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 12pt;
            margin: 5px;
            i{
                margin-right: 5px;
            }
        }
    }
}


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