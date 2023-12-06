<script>
import ProfileDashBoard from '../../components/ProfileDashBoard.vue';
export default{
    data(){
        return{

        }
    },
    components: {
        ProfileDashBoard
    }
}
</script>


<template>
<div class="content">
    <!-- 側邊功能區 -->
    <div class="dashBoardArea">
        <ProfileDashBoard />
    </div>
</div>
</template>


<style lang="scss" scoped>
@import '../../assets/main.scss';

.content{
    width: 100vw;
    height: auto;
    margin-top: 3vmin;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    position: relative;
    .dashBoardArea{
        position: absolute;
        left: 3rem;
    }
}
</style>