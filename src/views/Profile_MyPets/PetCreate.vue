<script>
import Swal from 'sweetalert2'
import axios from 'axios';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    data() {
        return {
            dog: "M149.365 19.2302H130.094L127.938 15.0094C127.138 13.4416 125.908 12.1231 124.386 11.2015C122.864 10.2799 121.11 9.79175 119.321 9.79163H103.176L94.9617 1.74528C91.9236 -1.22786 86.7356 0.878115 86.7356 5.08121V49.2772L125.277 62.7595V52.265H134.912C145.556 52.265 154.182 43.8146 154.182 33.388V23.9494C154.182 21.342 152.026 19.2302 149.365 19.2302ZM115.641 33.388C112.98 33.388 110.824 31.2761 110.824 28.6687C110.824 26.0613 112.98 23.9494 115.641 23.9494C118.303 23.9494 120.459 26.0613 120.459 28.6687C120.459 31.2761 118.303 33.388 115.641 33.388ZM28.9242 56.9843C23.6128 56.9843 19.289 52.7488 19.289 47.5458C19.289 42.3339 14.9742 38.1072 9.65379 38.1072C4.33333 38.1072 0.0185547 42.3339 0.0185547 47.5458C0.0185547 59.8336 8.09709 70.213 19.289 74.1212C19.289 74.1212 19.289 134.604 19.289 137.212C19.289 139.819 21.4449 141.931 24.1066 141.931H43.3771C46.0388 141.931 48.1947 139.819 48.1947 137.212V104.177H96.3709V137.212C96.3709 139.819 98.5267 141.931 101.188 141.931H120.459C123.121 141.931 125.277 139.819 125.277 137.212V72.7791L80.1265 56.9843H28.9242Z",
            cat: "M83.3225 39.3704C77.5361 39.3704 52.6931 39.847 36.7016 60.0611V39.3704C36.7016 26.6261 24.3546 16.2603 9.17467 16.2603C4.108 16.2603 -0.000976562 19.7099 -0.000976562 23.9636C-0.000976562 28.2173 4.108 31.667 9.17467 31.667C14.2328 31.667 18.3503 35.1239 18.3503 39.3704V100.997C18.3503 109.495 26.5797 116.404 36.7016 116.404H87.1677C89.7025 116.404 91.7555 114.68 91.7555 112.552V108.701C91.7555 104.447 87.6466 100.997 82.5799 100.997H73.4042L110.107 77.8872V112.552C110.107 114.68 112.16 116.404 114.695 116.404H123.87C126.405 116.404 128.458 114.68 128.458 112.552V62.9282C125.508 63.571 122.468 64.0211 119.282 64.0211C101.559 64.0211 86.7319 53.417 83.3225 39.3704ZM128.458 16.2603H110.107L91.7555 0.853516V33.2077C91.7555 45.9712 104.08 56.3178 119.282 56.3178C134.485 56.3178 146.809 45.9712 146.809 33.2077V0.853516L128.458 16.2603ZM107.813 35.5187C105.278 35.5187 103.225 33.795 103.225 31.667C103.225 29.5389 105.278 27.8153 107.813 27.8153C110.348 27.8153 112.401 29.5389 112.401 31.667C112.401 33.795 110.348 35.5187 107.813 35.5187ZM130.752 35.5187C128.217 35.5187 126.164 33.795 126.164 31.667C126.164 29.5389 128.217 27.8153 130.752 27.8153C133.287 27.8153 135.34 29.5389 135.34 31.667C135.34 33.795 133.287 35.5187 130.752 35.5187Z",
            isAdopted: false,
            cities: ["台北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣",
                "台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣",
                "高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣",
                "花蓮縣", "台東縣"],
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
            petInfo: {
                user_id: 0,
                pet_name: "",
                pet_breed: "",
                pet_status: "",
                adoption_status: "正常",
                adoption_conditions: "",
                age: "",
                vaccine: "",
                pet_profile: "",
                ligation: false,
                type: "狗",
                pet_photo: "",
                location: "",
            },
            vaccineArr: [],
            petWaterfall: [],

            imageUrl: null, // 顯示預覽圖的變數
            croppedImageUrl: null, // 保存裁切後圖片的變數
            showCropper: false, // 控制是否顯示裁切範圍的變數

            userPhoto: null, // 用於儲存上傳的圖片資料
            cropper: null, // Cropper 實例
            croppedImageUrlwithoutPrefix: null,//沒有前綴

        }
    },
    components: {
        VueCropper,
    },

    mounted() {
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
        this.petInfo.user_id = this.userInfo.userId;
    },
    computed: {
    },

    watch: {
        isAdopted(newValue, oldValue) {
            if (newValue) {
                this.petInfo.adoption_status = "送養中";
            } else {
                this.petInfo.adoption_status = "正常";
            }
        },
        'petInfo.type': function (newValue, oldValue) {
            if (newValue != oldValue) {
                this.vaccineArr = [];
                this.petInfo.ligation = false;
            }
        },



    },
    methods: {

        handleFileChange() {
            const fileInput = this.$refs.fileInput;
            const reader = new FileReader();

            if (fileInput.files && fileInput.files[0]) {
                reader.onload = (e) => {
                    this.imageUrl = e.target.result; // 设置预览图片的值

                    // 在使用 $refs.preview 之前進行檢查
                    if (this.$refs.preview) {
                        this.$refs.preview.src = this.imageUrl;
                        this.showCropper = true;
 }
                        const imageDataWithoutPrefix = e.target.result.split(',')[1];
                        this.petInfo.pet_photo = imageDataWithoutPrefix;
                    };
                }
                reader.readAsDataURL(fileInput.files[0]);
                console.log("file changed!!");
            },
            saveCroppedImage() {
                this.cropper = this.$refs.cropper;
                const croppedCanvas = this.cropper && this.cropper.getCroppedCanvas();
                this.croppedImageUrl = croppedCanvas ? croppedCanvas.toDataURL('image/jpeg') : null;
                console.log('Cropped image saved:', this.croppedImageUrl);
            },
            saveAndCloseCropper() {
                // 在这里执行保存裁切图片的操作
                this.saveCroppedImage();

                // 新增一个变量，不含 Base64 前缀
                this.croppedImageUrlwithoutPrefix = this.croppedImageUrl.replace(/^data:image\/[a-z]+;base64,/, '');

                // 打印新变量
                console.log('Cropped image without prefix:', this.croppedImageUrlwithoutPrefix);

                // 将裁切后的值赋予到 Uploaded Image
                this.$nextTick(() => {
                    // 如果裁切后的值存在，将其赋值给 imageUrl 以显示
                    if (this.croppedImageUrl) {
                        this.imageUrl = this.croppedImageUrl;
                    }
                    // 隐藏裁切范围并重置图片变量
                    this.showCropper = false;
                    this.imageUrl = null;

                    // 重置 FileReader 物件
                    const fileInput = this.$refs.fileInput;
                    fileInput.value = ''; // 清空 input，以便觸發新的 change 事件
                    this.showCropper = false; // 隱藏裁切器
                });
            },




            getPath(type) {
                if (type == "狗") {
                    return this.dog;
                }
                if (type == "貓") {
                    return this.cat;
                }
            },
            checkStatus() {
                let bgc = "";
                if (this.petInfo.adoption_status == '正常') {
                    bgc = '#F8F5EE';
                }
                if (this.petInfo.adoption_status == '送養中') {
                    this.isAdopted = true;
                    bgc = '#F7E1E5';
                }
                return bgc;
            },
            isChecked(checkVaccine) {
                if (this.vaccineArr == []) {
                    return false;
                }
                return this.vaccineArr.includes(checkVaccine);
            },
            changeType() {
                if (this.petInfo.type == "狗") {
                    this.petInfo.type = "貓";
                } else if (this.petInfo.type == "貓") {
                    this.petInfo.type = "狗";
                }
            },
            changeVaccine(vaccine) {
                const index = this.vaccineArr.indexOf(vaccine);

                if (index !== -1) {
                    this.vaccineArr.splice(index, 1);
                } else {
                    this.vaccineArr.push(vaccine);
                }
            },
            changeLigation() {
                this.petInfo.ligation = !this.petInfo.ligation;
            },

            previewImg() {
                this.handleFileChange();
            },


            //12.20 圖片邏輯更新
            createData() {
                if (this.petInfo.pet_name == null || this.petInfo.pet_name.trim() == "") {
                    alert("請輸入該寵物的名字！");
                    return;
                }

                this.petInfo.vaccine = this.vaccineArr.join(',');
                console.log("create pet", this.petInfo);

                // 檢查是否有裁切後的圖片資料，若有則賦值給 pet_photo
                if (this.croppedImageUrlwithoutPrefix) {
                    this.petInfo.pet_photo = this.croppedImageUrlwithoutPrefix;
                }

                axios.post('http://localhost:8080/api/adoption/petInfo/createPetInfo', {
                    petInfo: this.petInfo
                })
                    .then(response => {
                        console.log(response.data);
                        this.$router.push('/MyPet');
                    })
                    .catch(error => {
                        console.error(error);
                    });

                Swal.fire({
                    title: "成功新增寵物資料",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                        this.$router.push('/MyPet');
                    }
                });
            },
            goTo(x) {
                this.$router.push(x)
            }
        },
    }
</script>


<template>
    <div class="content">

        <!-- 寵物資訊頁面 -->
        <div class="showBoard" :style="{ 'background-color': checkStatus() }">
            <!-- 飼主資訊＋icon -->
            <div class="top">
                <div class="topLeft">
                    <div class="topLeftPhoto">
                        <img :src="'data:image/jpeg;base64,' + this.userInfo.userPhoto" alt="">
                    </div>
                    <div class="topLeftText">
                        <p>{{ this.userInfo.userName }}</p>
                        <p>@{{ this.userInfo.account }}</p>
                    </div>
                </div>
                <div class="topRight">
                    <i class="fa-solid fa-floppy-disk" @click="createData()"></i>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="deleteModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="closeModal()"></button>
                        </div>
                        <div class="modal-body">
                            <h4>確定要刪除 {{ this.petInfo.pet_name }} 的資料嗎？</h4>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-specialBlue modal-btn" data-bs-dismiss="modal" aria-label="Close">
                                <i class="fa-solid fa-chevron-right" style="color: white;"></i>
                                <p style="color: white;">再想一下</p>
                            </button>
                            <button class="btn btn-specialRed modal-btn">
                                <i class="fa-solid fa-xmark" style="color: white;"></i>
                                <p style="color: white;">刪除資料</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cropper popup -->
            <div v-if="showCropper" class="cropper-popup">
                <h3 style="text-align: center;">裁切大頭貼</h3>
                <!-- VueCropper component -->
                <vue-cropper class="vue-cropper" v-if="imageUrl" :src="imageUrl" :key="imageUrl"
                    ref="cropper"></vue-cropper>
                <!-- Button to save and close cropper -->
                <button @click="saveAndCloseCropper">儲存並關閉</button>
            </div>
            <!-- 寵物基本資訊 -->
            <div class="middle">
                <!-- 寵物照片 -->
                <div class="middleLeft">
                    <div class="middleLeftPic">
                        <img v-if="!croppedImageUrl" class="previewImg" ref="preview" src="" alt="">
                        <img class="croppedImg" :src="croppedImageUrl" v-if="croppedImageUrl" alt="Cropped Image">
                    </div>
                    <div class="inputFileArea">
                        <!-- 如果要可以選擇多個照片的話，加上此屬性：multiple="multiple" -->
                        <input class="inputFile" id="file-uploader" type="file" accept="image/*" ref="fileInput"
                            @change="previewImg()">
                    </div>
                </div>

                <!-- 寵物資訊 -->
                <div class="middleRight">
                    <div class="middleRightTop">
                        <div :class="{ 'yellowCard': this.petInfo.adoption_status == '正常' }, { 'redCard': this.petInfo.adoption_status == '送養中' }, { 'greenCard': this.petInfo.adoption_status == '已送養' }"
                            class="circle" @click="changeType()">
                            <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path :d="getPath(this.petInfo.type)" fill="white" data-bs-container="body"
                                    data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover" />
                            </svg>
                        </div>
                        <input class="inputTextName" type="text" placeholder="寵物名字" v-model="this.petInfo.pet_name">
                        <div class="selectTypeArea">
                            <label for="type">種類</label>
                            <select class="selectType" name="" id="type" v-model="petInfo.type">
                                <option value="狗">狗</option>
                                <option value="貓">貓</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div class="isAdopt">
                            <input type="checkbox" id="isAdoptAnimal" v-model="isAdopted">
                            <label for="isAdoptAnimal">是否送養？</label>
                        </div>
                    </div>
                    <div class="middleRightContent">
                        <div class="middleRightContentTop">
                            <div class="blockData">
                                <p>基本資料</p>
                                <div class="block blockDataContent">
                                    <div class="inputArea">
                                        <label for="inputLocation">地點：</label>
                                        <select class="inputText" id="inputLocation" v-model="this.petInfo.location">
                                            <option value=""></option>
                                            <option v-for="cityOption in this.cities" :value="cityOption">
                                                {{ cityOption }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="inputArea">
                                        <label for="inputAge">年齡：</label>
                                        <input class="inputText" id="inputAge" type="text" v-model="this.petInfo.age">
                                    </div>
                                    <div class="inputArea">
                                        <label for="inputBreed">品種：</label>
                                        <input class="inputText" id="inputBreed" type="text"
                                            v-model="this.petInfo.pet_breed">
                                    </div>
                                </div>
                            </div>
                            <div class="blockVaccine">
                                <p>醫療狀態</p>
                                <div class="block blockVaccineContent">
                                    <!-- 貓疫苗 -->
                                    <div v-if="petInfo.type == '貓'" class="vaccine">
                                        <i v-if="isChecked('三合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('三合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('三合一疫苗')"></i>
                                        <p @click="changeVaccine('三合一疫苗')">三合一疫苗</p>
                                    </div>
                                    <div v-if="petInfo.type == '貓'" class="vaccine">
                                        <i v-if="isChecked('五合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('五合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('五合一疫苗')"></i>
                                        <p @click="changeVaccine('五合一疫苗')">五合一疫苗</p>
                                    </div>
                                    <!-- 狗疫苗 -->
                                    <div v-if="petInfo.type == '狗'" class="vaccine">
                                        <i v-if="isChecked('五合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('三合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('五合一疫苗')"></i>
                                        <p @click="changeVaccine('五合一疫苗')">五合一疫苗</p>
                                    </div>
                                    <div v-if="petInfo.type == '狗'" class="vaccine">
                                        <i v-if="isChecked('七合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('五合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('七合一疫苗')"></i>
                                        <p @click="changeVaccine('七合一疫苗')">七合一疫苗</p>
                                    </div>
                                    <div v-if="petInfo.type == '狗'" class="vaccine">
                                        <i v-if="isChecked('八合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('三合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('八合一疫苗')"></i>
                                        <p @click="changeVaccine('八合一疫苗')">八合一疫苗</p>
                                    </div>
                                    <div v-if="petInfo.type == '狗'" class="vaccine">
                                        <i v-if="isChecked('十合一疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('五合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('十合一疫苗')"></i>
                                        <p @click="changeVaccine('十合一疫苗')">十合一疫苗</p>
                                    </div>
                                    <div v-if="petInfo.type == '狗'" class="vaccine">
                                        <i v-if="isChecked('萊姆病疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('五合一疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('萊姆病疫苗')"></i>
                                        <p @click="changeVaccine('萊姆病疫苗')">萊姆病疫苗</p>
                                    </div>
                                    <!-- 通用 -->
                                    <div class="vaccine">
                                        <i v-if="isChecked('狂犬病疫苗')" class="fa-regular fa-circle fa"
                                            @click="changeVaccine('狂犬病疫苗')"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeVaccine('狂犬病疫苗')"></i>
                                        <p @click="changeVaccine('狂犬病疫苗')">狂犬病疫苗</p>
                                    </div>
                                    <div class="vaccine">
                                        <i v-if="this.petInfo.ligation" class="fa-regular fa-circle fa"
                                            @click="changeLigation()"></i>
                                        <i v-else class="fa-solid fa-xmark fa" @click="changeLigation()"></i>
                                        <p @click="changeLigation()">結紮</p>
                                    </div>
                                </div>
                            </div>
                            <div class="blockStatus">
                                <p>寵物狀態</p>
                                <textarea class="block blockStatusContent" name="" id="" cols="30" rows="10"
                                    v-model="this.petInfo.pet_status"></textarea>
                            </div>
                        </div>
                        <div class="middleRightContentLast">
                            <textarea class="block blockDescription" name="" id="" cols="80" rows="3"
                                v-model="this.petInfo.pet_profile"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 送養資訊 -->
            <div v-if="isAdopted" class="middleAdoption">
                <div class="condition">
                    <div class="conditionTop blockTitle">
                        <div :class="{ 'yellowCard': this.petInfo.adoption_status == '正常' }, { 'redCard': this.petInfo.adoption_status == '送養中' }, { 'greenCard': this.petInfo.adoption_status == '已送養' }"
                            class="circle">
                            <svg viewBox="45 -10 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path :d="getPath(this.petInfo.type)" fill="white" />
                            </svg>
                        </div>
                        <h5>認養條件</h5>
                    </div>
                    <textarea class="block blockDescription conditionContent" name="" id="" cols="80" rows="3"
                        v-model="this.petInfo.adoption_conditions"></textarea>
                </div>
            </div>

            <!-- 寵物照片 -->
            <div class="last">
                <div class="picArea">
                    <!-- 接到資料後改為陣列 -->
                    <ul v-for="item in this.petWaterfall">
                        <li>
                            <img class="img" :src="item" alt="">
                        </li>
                    </ul>
                </div>
            </div>

            <!-- btn -->
            <div class="btnArea">
                <button class="btn btn-big btn-specialBlue" @click="goTo('/MyPet')">
                    <i class="fa-solid fa-right-to-bracket" style="color: white"></i>
                    <p style="color: white;">回到列表</p>
                </button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../../assets/RStyle.scss';

.content {
    justify-content: center;
    background-color: #fff;

    .showBoard {
        width: 85vw;
        flex-grow: 1;

        .top {
            width: 90%;
            height: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .topLeft {
                display: flex;
                align-items: center;

                .topLeftPhoto {
                    width: 70px;
                    height: 70px;
                    background-color: $secondary;
                    border-radius: 50%;
                    margin-right: 20px;

                    img {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                    }
                }
            }

            .topRight {
                display: flex;
                align-items: center;

                i {
                    font-size: 20pt;
                    margin: 0px 10px 0px 10px;

                    &:hover {
                        color: #b59e9e;
                        transition: 0.5s;
                    }
                }
            }
        }

        .middle {
            width: 90%;
            height: 500px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;

            .middleLeft {
                width: 28%;
                height: 500px;
                display: flex;
                flex-direction: column;
                // justify-content: center;
                align-items: center;

                .middleLeftPic {
                    width: 100%;
                    height: 430px;
                    background-color: #fff;
                    border-radius: 20px;
                    box-shadow: 0 0 2px 2px lightgray;
                    margin-bottom: 30px;
                    overflow: hidden;

                    .previewImg {
                        //嘗試修改至中心
                        height: 100%;
                        // object-fit: cover;
                        // object-position: center;
                        width: 100%;
                    }

                    .croppedImg{
                        height: 100%;
                        width: 100%;
                    }
                }

                .inputFileArea {
                    width: 100%;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .inputFile {
                        width: 85%;
                    }
                }

            }

            .middleRight {
                width: 70%;
                height: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 0 0 2px 2px lightgray;
                padding: 10px 10px 10px 10px;

                .middleRightTop {
                    width: 90%;
                    height: 90%;
                    display: flex;
                    align-items: center;
                    margin: 10px 0px 10px 0px;

                    .conditionTop {
                        width: 100%;
                        display: flex;
                        align-items: center;
                    }

                    .inputTextName {
                        width: 200px;
                        border: $inputBorder solid 2px;
                        font-size: 18pt;
                        margin-right: 20px;
                    }

                    .selectTypeArea {
                        display: flex;
                        align-items: center;

                        .selectType {
                            width: 80px;
                            height: 35px;
                        }
                    }

                    .isAdopt {
                        margin-left: 20px;
                        display: flex;
                        align-items: center;

                        #isAdoptAnimal {
                            margin-right: 10px;
                        }
                    }
                }

                .middleRightContent {
                    width: 85%;
                    height: 85%;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 10px;

                    .middleRightContentTop {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .blockData {
                            width: 32%;
                            font-size: 12pt;

                            .blockDataContent {
                                width: 100%;
                                height: 190px;

                                .inputArea {
                                    .inputText {
                                        width: 100%;
                                        border: $inputBorder solid 2px;
                                    }
                                }
                            }
                        }

                        .blockVaccine {
                            width: 27%;
                            font-size: 12pt;

                            .blockVaccineContent {
                                width: 100%;
                                height: 190px;

                                .vaccine {
                                    display: flex;
                                    align-items: center;
                                    font-size: 12pt;
                                    padding-left: 5px;

                                    .fa {
                                        width: 15px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        margin-right: 10px;
                                        color: $inputBorder;

                                        &:hover {
                                            color: $primary;
                                        }
                                    }
                                }
                            }
                        }

                        .blockStatus {
                            width: 35%;
                            font-size: 12pt;

                            .blockStatusContent {
                                width: 100%;
                                height: 190px;
                                border: $inputBorder solid 2px;
                            }
                        }
                    }

                    .middleRightContentLast {
                        .blockDescription {
                            width: 100%;
                            height: 120px;
                            font-size: 12pt;
                            border: $inputBorder solid 2px;
                        }
                    }
                }
            }
        }

        .middleAdoption {
            width: 90%;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .condition {
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

                .conditionContent {
                    width: 85%;
                    height: 150px;
                    padding: 10px 10px 10px 10px;
                    border: 2px solid lightgray;
                    border-radius: 10px;
                    margin-bottom: 10px;
                }
            }

            .blockTitle {
                width: 90%;
                height: 80px;
                display: flex;
                align-items: center;
            }
        }

        .last {
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

            ul {
                margin: 0px;
                padding: 0px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px; // = column-gap: 10px;

                li {
                    flex: 1;
                    width: calc(20% - 10px);
                    list-style-type: none;

                    .img {
                        width: 100%;
                        height: auto;
                        object-fit: contain;
                        margin-bottom: 20px;
                    }
                }
            }
        }

        .btnArea {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            .btn {
                i {
                    margin-right: 10px;
                }
            }
        }
    }
}

.block {
    padding: 10px 10px 10px 10px;
    border: 2px solid lightgray;
    border-radius: 10px;
    margin: 10px 0px 10px 0px;
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
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-bottom: 20px;

            .usernameAndid {
                width: 85%;
                height: 50px;
                background-color: white;
                border-radius: 10px;
                padding: 10px 10px 10px 10px;
                box-shadow: 3px 3px 3px 3px gray;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16pt;

                i {
                    color: #E9D2A6;
                    font-size: 35pt;
                    position: absolute;
                    left: 200px;
                }
            }
        }

        .modalBodyMiddle {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;

            .modalBodyMiddleText {
                width: 90%;
                height: 100px;
                background-color: white;
                border-radius: 10px;
                padding: 10px 10px 10px 10px;
                box-shadow: 3px 3px 3px 3px gray;
                overflow: hidden;
                font-size: 12pt;
            }
        }

        .modalBodyLast {
            display: flex;
            justify-content: center;
            align-items: center;

            .modalBodyLastShow {
                width: 90%;
                height: auto;
                background-color: white;
                border-radius: 10px;
                padding: 10px 10px 10px 10px;
                box-shadow: 3px 3px 3px 3px gray;
                font-size: 12pt;

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
        pointer-events: none;
    }
}

// pet card
.yellowCard {
    background-color: $primary;
}

.redCard {
    background-color: $give;
}

.greenCard {
    background-color: $adoption;
}

.cropper-popup {
    // width: 30vw;
    // height: 30vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 添加陰影效果 */

    .vue-cropper {
        width: 400px;
        height: 400px;
    }

    h3 {
        text-align: center;
        margin-bottom: 20px;
        /* 增加標題底部間距 */
        font-size: 20px;
        /* 調整標題字體大小 */
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        border: none;
        background-color: #4CAF50;
        color: white;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
            background-color: #45a049;
        }
    }
}
</style>