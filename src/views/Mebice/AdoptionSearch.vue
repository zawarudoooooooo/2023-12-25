<script>
export default {
    data() {
        return {
            animalSpecies: null,

            
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
    },

    mounted() {
        this.search()
    },


    methods: {

        search() {
            const enteredAnimalSpecies = this.animalSpecies;


            // 构建带有账号和密码的 URL

            const url = `http://localhost:8080/api/adoption/search?area=${encodeURIComponent(enteredArea || "")}&city=${encodeURIComponent(enteredCity || "")}&nature=${encodeURIComponent(enteredNature || "")}&animalSpecies=${encodeURIComponent(enteredAnimalSpecies || "")}&institutionName=${encodeURIComponent(enteredInstitutionName || "")}`;


            console.log('URL:', url);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.mapSearchList = data.mapSearchList;
                    console.log(this.mapSearchList);

                })
                .catch(error => {
                    console.error('搜尋過程出現錯誤:', error);
                    alert('搜尋過程出現錯誤');
                });
        },




    }
}
</script>
<template>
    <div class="bgArea">

        <div class="mapSearch">


            <div class="searchArea">


                <span>種類</span>
                <select v-model="this.animalSpecies">
                    <option value=""></option>
                    <option value="貓">貓</option>
                    <option value="狗">狗</option>
                    <option value="其他">其他</option>
                </select>

            </div>

            <div class="searchArea">
                <button @click="search()">Search</button>
            </div>

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
                    <div class="cardMiddlePhoto"></div>
                    <div class="cardMiddleDescription">
                        <p>{{ item.pet_status }}</p>
                    </div>
                </div>
                <div class="cardLast">
                    <!-- red btn -->
                    <!-- cancel -->
                    <button v-if="checkAdopted(item.final_adopter)" class="btn btn-specialRed modal-btn" data-bs-toggle="modal" data-bs-target="#cancelModal">
                        <i class="fa-solid fa-xmark" style="color: white"></i>
                        <p style="color: white;">取消領養</p>
                    </button>
                    <!-- quit -->
                    <button v-else class="btn btn-specialRed modal-btn" data-bs-toggle="modal" data-bs-target="#quitModal">
                        <i class="fa-solid fa-xmark" style="color: white;"></i>
                        <p style="color: white;">取消申請</p>
                    </button>
                    
                    <!-- green btn -->
                    <!-- confirm -->
                    <button v-if="checkAdopted(item.final_adopter)" class="btn btn-green modal-btn" data-bs-toggle="modal" data-bs-target="#confirmModal">
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
                <div  class="modal fade" id="quitModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <button class="btn btn-specialRed modal-btn">
                                    <i class="fa-solid fa-xmark" style="color: white;"></i>
                                    <p style="color: white;">取消申請</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- confirm Modal -->
                <div  class="modal fade" id="confirmModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <button v-if="!this.isGived" class="btn btn-green modal-btn">
                                    <i class="fa-solid fa-check" style="color: white"></i>
                                    <p style="color: white;">接受送養</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- cancel Modal -->
                <div  class="modal fade" id="cancelModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <button class="btn btn-specialRed modal-btn">
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
        height: 30%;
        background-color: #fff;
        border-radius: 3vw;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
        margin-top: 5vh;
        margin-bottom: 3vh;



        .searchArea {
            display: flex;
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
                width: 63%;
                height: 4.5vh;
                border-radius: 2.5vw;
                margin-left: 1vw;
                margin-right: 5vw;
                background-color: #DDDFEE;
                border: none;
                padding-left: 2vw;
            }

            button {
                width: 15%;
                height: 6vh;
                border-radius: 3.5vw;
                border: none;
                background-color: #E9D2A6;
                color: white;
                font-weight: 900;
                font-size: 2vw;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
        }
    }

    .showCardArea{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
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

</style>