<script>
import ProfileDashBoard from '../../components/profiledashboard.vue';
export default{
    data(){
        return{
            dog: "M149.365 19.2302H130.094L127.938 15.0094C127.138 13.4416 125.908 12.1231 124.386 11.2015C122.864 10.2799 121.11 9.79175 119.321 9.79163H103.176L94.9617 1.74528C91.9236 -1.22786 86.7356 0.878115 86.7356 5.08121V49.2772L125.277 62.7595V52.265H134.912C145.556 52.265 154.182 43.8146 154.182 33.388V23.9494C154.182 21.342 152.026 19.2302 149.365 19.2302ZM115.641 33.388C112.98 33.388 110.824 31.2761 110.824 28.6687C110.824 26.0613 112.98 23.9494 115.641 23.9494C118.303 23.9494 120.459 26.0613 120.459 28.6687C120.459 31.2761 118.303 33.388 115.641 33.388ZM28.9242 56.9843C23.6128 56.9843 19.289 52.7488 19.289 47.5458C19.289 42.3339 14.9742 38.1072 9.65379 38.1072C4.33333 38.1072 0.0185547 42.3339 0.0185547 47.5458C0.0185547 59.8336 8.09709 70.213 19.289 74.1212C19.289 74.1212 19.289 134.604 19.289 137.212C19.289 139.819 21.4449 141.931 24.1066 141.931H43.3771C46.0388 141.931 48.1947 139.819 48.1947 137.212V104.177H96.3709V137.212C96.3709 139.819 98.5267 141.931 101.188 141.931H120.459C123.121 141.931 125.277 139.819 125.277 137.212V72.7791L80.1265 56.9843H28.9242Z",
            cat: "M83.3225 39.3704C77.5361 39.3704 52.6931 39.847 36.7016 60.0611V39.3704C36.7016 26.6261 24.3546 16.2603 9.17467 16.2603C4.108 16.2603 -0.000976562 19.7099 -0.000976562 23.9636C-0.000976562 28.2173 4.108 31.667 9.17467 31.667C14.2328 31.667 18.3503 35.1239 18.3503 39.3704V100.997C18.3503 109.495 26.5797 116.404 36.7016 116.404H87.1677C89.7025 116.404 91.7555 114.68 91.7555 112.552V108.701C91.7555 104.447 87.6466 100.997 82.5799 100.997H73.4042L110.107 77.8872V112.552C110.107 114.68 112.16 116.404 114.695 116.404H123.87C126.405 116.404 128.458 114.68 128.458 112.552V62.9282C125.508 63.571 122.468 64.0211 119.282 64.0211C101.559 64.0211 86.7319 53.417 83.3225 39.3704ZM128.458 16.2603H110.107L91.7555 0.853516V33.2077C91.7555 45.9712 104.08 56.3178 119.282 56.3178C134.485 56.3178 146.809 45.9712 146.809 33.2077V0.853516L128.458 16.2603ZM107.813 35.5187C105.278 35.5187 103.225 33.795 103.225 31.667C103.225 29.5389 105.278 27.8153 107.813 27.8153C110.348 27.8153 112.401 29.5389 112.401 31.667C112.401 33.795 110.348 35.5187 107.813 35.5187ZM130.752 35.5187C128.217 35.5187 126.164 33.795 126.164 31.667C126.164 29.5389 128.217 27.8153 130.752 27.8153C133.287 27.8153 135.34 29.5389 135.34 31.667C135.34 33.795 133.287 35.5187 130.752 35.5187Z",
            pets: [
                {
                    name: "Ruby",
                    type: "dog",
                    status: "normal"
                },
                {
                    name: "Kiwi",
                    type: "cat",
                    status: "adopting"
                },
                {
                    name: "Ruby",
                    type: "dog",
                    status: "adopted"
                },
                {
                    name: "Ruby",
                    type: "dog",
                    status: "adpoted"
                },
                {
                    name: "by",
                    type: "cat",
                    status: "normal"
                },
                {
                    name: "Kiwi",
                    type: "cat",
                    status: "adopting"
                },
            ],
        }
    },
    components: {
        ProfileDashBoard
    },
    methods: {
        getPath(type){
            if(type == "dog"){
                return this.dog;
            }
            if(type == "cat"){
                return this.cat;
            }
        },
        goTo(){
            console.log("enter!")
            this.$router.push("/PetDetail");
        }
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
        <div class="top">
            <!-- 顏色 -->
            <div class="colorSpace">
                <div class="yellowCircle"></div>
                <p>正常</p>
                <div class="redCircle"></div>
                <p>送養中</p>
                <div class="greenCircle"></div>
                <p>已送養</p>
            </div>

            <!-- 標題 -->
            <div class="title">
                <h1>My Pets</h1>
            </div>

            <!-- btn -->
            <button class="btn btn-big">+ add pet</button>
        </div>

        <!-- pet area -->
        <div class="middle" >
            <div class="showCard" v-for="(item, index) in pets">
                <div :class="{'yellowCard' : item.status == 'normal'}, {'redCard' : item.status == 'adopting'}, {'greenCard' : item.status == 'adopted'}" class="middleCard" @click="goTo">
                    <h3>{{ item.name }}</h3>
                    <svg width="155" height="142" viewBox="0 0 155 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path :d="getPath(item.type)" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import '../../assets/main.scss';

.content{
    width: 100vw;
    height: 85vh;
    padding-top: 3vmin;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 5vmin;
    display: flex;
    justify-content: space-between;
    background-color: $adoptionBgc;
    .showBoard{
        width: 80vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        color: #978989;
        font-size: 13pt;
        box-shadow: 0 0 3px 2px lightgray;
        padding: 20px 30px 20px 30px ;
    }
}


.top{
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 50px;
    .colorSpace{
        display: flex;
        position: absolute;
        left: 0px;
        .yellowCircle{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $primary;
            margin-top: 3px;
            margin-right: 10px;
            margin-left: 10px;
        }
        .redCircle{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $give;
            margin-top: 3px;
            margin-right: 10px;
            margin-left: 10px;
        }
        .greenCircle{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $adoption;
            margin-top: 3px;
            margin-right: 10px;
            margin-left: 10px;
        }
    }
    .title{
        position: absolute;
        left: 45%;
    }
    .btn{
        background-color: $forum;
        position: absolute;
        right: 0px;
        color: white;
    }
}

.middle{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    .middleCard{
        width: 250px;
        height: 150px;
        display: flex;
        border-radius: 30px;
        padding: 20px 20px 20px 20px;
        margin: 15px 25px 15px 25px;
        color: white;
    }
    .yellowCard{
        background-color: $primary;
        &:hover{
            background-color: $primaryBgc;
            transition: 0.5s;
        }
    }
    .redCard{
        background-color: $give;
        &:hover{
            background-color: $giveBgc;
            transition: 0.5s;
        }
    }
    .greenCard{
        background-color: $adoption;
        &:hover{
            background-color: $adoptionBgc;
            transition: 0.5s;
        }
    }
}
</style>