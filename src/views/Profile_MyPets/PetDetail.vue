<script>
export default{
    data(){
        return{
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
            isAdopted: false,
            // 待接到資料後，由字串轉成陣列
            petWaterfall: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
            ]
        }
    },
    props: [
        "petInfo"
    ],
    mounted(){
        console.log("pet info", this.petInfo)
    },
    methods: {
        checkStatus(){
            let bgc = "";
            if(this.petInfo.adoption_status == '正常'){
                bgc = '#F8F5EE';
            }
            if(this.petInfo.adoption_status == '送養中'){
                this.isAdopted = true;
                bgc = '#F7E1E5';
            }
            if(this.petInfo.adoption_status == '已送養'){
                this.isAdopted = true;
                bgc = '#EDFDF9';
            }
            return bgc;
        }
    }
}
</script>


<template>
<div class="content">

    <!-- 寵物資訊頁面 -->
    <div class="showBoard" :style="{ 'background-color' : checkStatus()}">
        <!-- 飼主資訊＋icon -->
        <div class="top">
            <div class="topLeft">
                <div class="topLeftPhoto"></div>
                <div class="topLeftText">
                    <p>{{ this.userInfo.user_name }}</p>
                    <p>{{ this.userInfo.account }}</p>
                </div>
            </div>
            <div class="topRight">
                <i class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-pen"></i>
            </div>
        </div>

        <!-- 寵物基本資訊 -->
        <div class="middle">
            <!-- 寵物照片 -->
            <div class="middleLeft">
                <div class="middleLeftPic">

                </div>
            </div>

            <!-- 寵物資訊 -->
            <div class="middleRight">
                <div class="middleRightTop">
                    <div class="circle"></div>
                    <h5>{{ this.petInfo.pet_name }}</h5>
                </div>
                <div class="middleRightContent">
                    <div class="middleRightContentTop">
                        <div class="blockData">
                            <p>基本資料</p>
                            <div class="block blockDataContent">
                                <p>地點：{{ this.petInfo.location }}</p>
                                <p>年齡：</p>
                                <p>  {{ this.petInfo.age }}</p>
                                <p>品種：{{ this.petInfo.pet_breed }}</p>
                            </div>
                        </div>
                        <div class="blockVaccine">
                            <p>疫苗</p>
                            <div class="block blockVaccineContent">
                                <!-- 待轉成動態識別 -->
                                <p>{{  }} 五合一疫苗</p>
                                <p>{{  }} 三合一疫苗</p>
                                <p>{{  }} 狂犬病疫苗</p>
                                <p>{{ this.petInfo.ligation }} 結紮</p>
                            </div>
                        </div>
                        <div class="blockStatus">
                            <p>寵物狀態</p>
                            <div class="block blockStatusContent">
                                <p>{{ this.petInfo.pet_status }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="middleRightContentLast">
                        <div class="block blockDescription">
                            <p>{{ this.petInfo.pet_profile }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 送養資訊 -->
        <div v-if="isAdopted" class="middleAdoption">
            <div class="condition">
                <div class="conditionTop blockTitle">
                    <div class="circle"></div>
                    <h5>認養條件</h5>
                </div>
                <div class="conditionContent">
                    <p>{{ this.petInfo.adoption_conditions }}</p>
                </div>
            </div>
            <div class="adopter">
                <div class="adopterTop blockTitle">
                    <div class="circle"></div>
                    <h5>申請認養</h5>
                </div>
                <!-- v-for -->
                <!-- 1 -->
                <div class="adopterContent">
                    <div class="adopterFile">
                        <div class="adopterFileTop">
                            <div class="adopterPhoto">
                                <div class="circle"></div>
                            </div>
                            <div class="adopterText">
                                <p>someone</p>
                                <p>@someone01</p>
                            </div>
                        </div>

                        <div class="adopterFileMiddle">
                            <p>someone's description is here.</p>
                        </div>

                        <div class="adopterFileBtn">
                            <button class="btn btn-specialRed">
                                <i class="fa-solid fa-circle-info" style="color: white;"></i>
                                <p style="color: white;">查看詳細</p>
                            </button>
                            <button class="btn btn-specialBlue">
                                <i class="fa-solid fa-comments" style="color: white;"></i>
                                <p style="color: white;">聊聊了解</p>
                            </button>
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class="adopterFile">
                        <div class="adopterFileTop">
                            <div class="adopterPhoto">
                                <div class="circle"></div>
                            </div>
                            <div class="adopterText">
                                <p>someone</p>
                                <p>@someone01</p>
                            </div>
                        </div>

                        <div class="adopterFileMiddle">
                            <p>someone's description is here.</p>
                        </div>

                        <div class="adopterFileBtn">
                            <button class="btn btn-specialRed">
                                <i class="fa-solid fa-circle-info" style="color: white;"></i>
                                <p style="color: white;">查看詳細</p>
                            </button>
                            <button class="btn btn-specialBlue">
                                <i class="fa-solid fa-comments" style="color: white;"></i>
                                <p style="color: white;">聊聊了解</p>
                            </button>
                        </div>
                    </div>
                    <!-- 3 -->
                    <div class="adopterFile">
                        <div class="adopterFileTop">
                            <div class="adopterPhoto">
                                <div class="circle"></div>
                            </div>
                            <div class="adopterText">
                                <p>someone</p>
                                <p>@someone01</p>
                            </div>
                        </div>

                        <div class="adopterFileMiddle">
                            <p>someone's description is here.</p>
                        </div>

                        <div class="adopterFileBtn">
                            <button class="btn btn-specialRed">
                                <i class="fa-solid fa-circle-info" style="color: white;"></i>
                                <p style="color: white;">查看詳細</p>
                            </button>
                            <button class="btn btn-specialBlue">
                                <i class="fa-solid fa-comments" style="color: white;"></i>
                                <p style="color: white;">聊聊了解</p>
                            </button>
                        </div>
                    </div>
                    <!-- 4 -->
                    <div class="adopterFile">
                        <div class="adopterFileTop">
                            <div class="adopterPhoto">
                                <div class="circle"></div>
                            </div>
                            <div class="adopterText">
                                <p>someone</p>
                                <p>@someone01</p>
                            </div>
                        </div>

                        <div class="adopterFileMiddle">
                            <p>someone's description is here.</p>
                        </div>

                        <div class="adopterFileBtn">
                            <button class="btn btn-specialRed">
                                <i class="fa-solid fa-circle-info" style="color: white;"></i>
                                <p style="color: white;">查看詳細</p>
                            </button>
                            <button class="btn btn-specialBlue">
                                <i class="fa-solid fa-comments" style="color: white;"></i>
                                <p style="color: white;">聊聊了解</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 寵物照片 -->
        <div class="last">
            <div class="picArea">
                <!-- 接到資料後改為陣列 -->
                <ul v-for="item in petWaterfall">
                    <li>
                        <img class="img" :src="item" alt="">
                    </li>
                </ul>
            </div>
        </div>

        <!-- <div class="clear_fix"></div> -->
    </div>
</div>
</template>


<style lang="scss" scoped>
@import '../../assets/main.scss';
@import '../../assets/RStyle.scss';

.content{
    justify-content: center;
    background-color: #fff;
    .showBoard{
        width: 85vw;
        flex-grow: 1;
        .top{
            width: 90%;
            height: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            .topLeft{
                display: flex;
                align-items: center;
                .topLeftPhoto{
                    width: 70px;
                    height: 70px;
                    background-color: $secondary;
                    border-radius: 50%;
                    margin-right: 20px;
                }
            }
            .topRight{
                display: flex;
                align-items: center;
                i{
                    font-size: 16pt;
                    margin: 0px 10px 0px 10px;
                }
            }
        }
        .middle{
            width: 90%;
            height: 430px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            .middleLeft{
                width: 28%;
                height: 430px;
                display: flex;
                justify-content: center;
                align-items: center;
                .middleLeftPic{
                    width: 100%;
                    height: 430px;
                    background-color: #fff;
                    border-radius: 20px;
                    box-shadow: 0 0 2px 2px lightgray;
                }
            }
            .middleRight{
                width: 70%;
                height: 430px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 0 0 2px 2px lightgray;
                padding: 10px 10px 10px 10px;
                .middleRightTop{
                    width: 90%;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    margin: 10px 0px 10px 0px;
                }
                .middleRightContent{
                    width: 85%;
                    height: 85%;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 10px;
                    .middleRightContentTop{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .blockData{
                            width: 25%;
                            font-size: 12pt;
                            .blockDataContent{
                                width: 100%;
                            }
                        }
                        .blockVaccine{
                            width: 25%;
                            font-size: 12pt;
                            .blockVaccineContent{
                                width: 100%;
                            }
                        }
                        .blockStatus{
                            width: 40%;
                            font-size: 12pt;
                        }
                    }
                    .middleRightContentLast{
                        .blockDescription{
                            width: 100%;
                            font-size: 12pt;
                        }
                    }
                }
            }
        }
        .middleAdoption{
            width: 90%;
            height: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .condition{
                width: 100%;
                height: 280px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 0 0 2px 2px lightgray;
                margin-bottom: 30px;
                padding: 10px 10px 10px 10px;
                .conditionContent{
                    width: 85%;
                    height: 150px;
                    padding: 10px 10px 10px 10px;
                    border: 2px solid lightgray;
                    border-radius: 10px;
                    margin-bottom: 10px;
                }
            }
            .adopter{
                width: 100%;
                height: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 0 0 2px 2px lightgray;
                margin-bottom: 30px;
                padding: 10px 10px 10px 10px;
                .adopterContent{
                    width: 90%;
                    height: 280px;
                    padding: 0px 10px 0px 10px;
                    display: flex;
                    overflow: scroll;
                    align-items: center;
                    .adopterFile{
                        width: 350px;
                        height: 250px;
                        padding: 10px 15px 10px 15px;
                        border: 2px solid lightgray;
                        border-radius: 10px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .adopterFileTop{
                            width: 95%;
                            height: 50px;
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                        }
                        .adopterFileMiddle{
                            width: 90%;
                            height: 120px;
                            overflow: hidden;
                            border: 2px solid lightgray;
                            border-radius: 10px;
                            padding: 0px 10px 0px 10px;
                            margin-bottom: 10px;
                        }
                        .adopterFileBtn{
                            width: 95%;
                            height: 40px;
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
                        }
                    }
                }
            }
            .blockTitle{
                width: 90%;
                height: 80px;
                display: flex;
                align-items: center;
            }
        }
        .last{
            width: 90%;
            min-height: 400px;
            height: auto;
            display: flex;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 0 2px 2px lightgray;
            margin-bottom: 30px;
            // column-count: 5;
            // column-gap: 10px;
            padding: 20px 20px 20px 20px;
            flex-grow: 1;
            flex-shrink: 0;
            ul{
                margin: 0px;
                padding: 0px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px; // = column-gap: 10px;
                li{
                    flex: 1;
                    width: calc(20% - 10px);
                    list-style-type: none;
                    .img{
                        width: 100%;
                        height: auto;
                        object-fit: contain;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}

.block{
    height: 120px;
    padding: 10px 10px 10px 10px;
    border: 2px solid lightgray;
    border-radius: 10px;
    margin: 10px 0px 10px 0px;
}
</style>