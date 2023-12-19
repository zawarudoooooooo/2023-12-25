<script>
export default{
    data(){
        return{

        }
    },
    methods:{

    }
}

</script>

<template>
<div class="notifi_area">
    <div class="notifi_text">Lorem ipsum dolor sit amet.</div>
    <div class="notifi_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, blanditiis.</div>

</div>
<div class="text">
    <button>領養人對送養人發請求</button>
    <button>領養人收回領養請求</button>

    <button>送養人同意領養請求</button>
    <button>送養人拒絕領養請求</button>
    
    <button>領養人同意領養請求</button>
    <button>領養人拒絕領養請求</button>
</div>

</template>

<style lang="scss" scoped>

.notifi_area{
    width: 35%;
    height: 60%;
    border: 5px solid #d8d2c3;
    margin: 85px;
    padding: 20px;
    font-size: 16pt;
    .notifi_text{
        border: 1px solid black;
        padding: 20px;
    }
}
.text{
    margin: 85px;
    display: flex;
    justify-content: space-around;
    width: 35%;
}
</style>