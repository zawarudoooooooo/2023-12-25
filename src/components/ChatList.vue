<script>
import Swal from 'sweetalert2'
import notification from '../views/negi/notification.vue'
import axios from 'axios';
import { mapState, mapActions } from "pinia";
import indexState from "../stores/indexState";

export default {
    data() {
        return {
        }
    },


    methods: {

        goTo(x) {
            this.$router.push(x);
        },
        
    },
    components: {
        notification
    },
}
</script>

<template>
    <div class="dashboardArea">
        <div class="title line">
            <span>聊聊列表</span>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 185px;
    height: auto;
    min-height: 100px;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding: 20px;
    position: relative;
    margin-top: 20px;

    i {
        margin-bottom: 10px;
        margin-right: 1vmin
    }

    .line {
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            color: rgb(132, 119, 119);
        }
    }
}
</style>