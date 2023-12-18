<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            email: null,
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
    },

    mounted() {
    },

    methods: {
        goSignUp() {
            this.$router.push('/SignUp')
        },
        goLoginIn() {
            this.$router.push('/Login')
        },


        sendAuthenticationCode() {

            const enteredEmail = this.email;
            console.log(enteredEmail)

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!enteredEmail) {
                Swal.fire('請輸入信箱');
                return; // 停止函數執行
            } else if (!emailPattern.test(enteredEmail)) {
                Swal.fire('請輸入有效的信箱地址');
                return; // 停止函數執行
            }

            const url = `http://localhost:8080/api/adoption/userInfo/userFogetPassword?email=${enteredEmail}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data)
                    if (data === '找不到信箱') {
                        Swal.fire('找不到信箱，寄送認證碼失敗');
                    } else if (data === '已發送認證碼至信箱') {
                        Swal.fire({
                            title: "已發送認證碼至信箱，請查看信件內容",
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                                this.$router.push('/Login');
                            }
                        });
                    }
                })
        }
    }
}
</script>

<template>
    <div class="content">
        <div class="loginArea">
            <div class="title">
                <h1>ForgetPassword</h1>
            </div>
            <div class="inputArea">
                <h3>Email</h3>
                <input type="email" v-model="this.email">
                <button type="button" @click="sendAuthenticationCode()">發送認證碼</button>
            </div>
            <div class="buttonArea">
                <h3 @click="goSignUp">Sign Up ?</h3>

            </div>
            <div class="buttonArea">
                <h3 @click="goLoginIn">Login In ?</h3>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 60vh;
    margin-top: 15vmin;

    .loginArea {
        width: 40vw;
        height: 50vh;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        padding: 1px;
        box-shadow: 3px 3px 3px gray;

        h1 {
            text-align: center;
            color: #978989;
        }

        .inputArea {
            width: 25vw;
            height: 25vh;
            margin: auto;

            h3 {
                margin-top: 30px;
                color: #978989;
                margin-bottom: 0;
            }

            input {
                width: 25vw;
                height: 5vh;
                border-radius: 10px;
                background-color: #D4D2D2;
                border-style: none;
                outline: none;
                padding-left: 2vmin;
            }

            button {
                margin-top: 30px;
                margin-left: 280px;
                width: 15vmin;
                height: 6vmin;
                border-radius: 10px;
                border-style: none;
                background-color: #E9D2A6;
                color: white;
                font-weight: bold;
            }
        }

        .buttonArea {
            width: 40vw;
            display: flex;
            align-items: center;
            justify-content: center;

            h3 {
                color: #978989;
                margin-right: 43%;
                cursor: pointer;
            }

            button {
                width: 10vmin;
                height: 4vmin;
                border-radius: 10px;
                border-style: none;
                background-color: #E9D2A6;
                color: white;
                font-weight: bold;
            }
        }
    }
}
</style>
