<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),

            userInfoList: null,
            email: null,
            password: null,
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#F8F5EE')
    },

    mounted() {
        this.searchAllUserInfo()
    },

    methods: {
        goSignUp() {
            this.$router.push('/SignUp')
        },
        goProfile() {
            this.$router.push('/Profile')
        },
        goForgetPassword() {
            this.$router.push('/ForgetPassword')
        },

        ////12.12新增 找尋所有用戶 (不包含admin or其他管理者邏輯)
        searchAllUserInfo() {
            fetch('http://localhost:8080/api/adoption/userInfo/searchAllUserInfo', {
                method: 'GET',
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.userInfoList = data.userInfoList;
                })
        },

        login() {
            const enteredEmail = this.email;
            const enteredPassword = this.password;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!enteredEmail) {
                Swal.fire('請輸入信箱');
                return; // 停止函數執行
            } else if (!emailPattern.test(enteredEmail)) {
                Swal.fire('請輸入有效的信箱地址');
                return; // 停止函數執行
            }

            if (!enteredPassword) {
                Swal.fire('請輸入密碼');
                return; // 停止函數執行
            }

            const url = `http://localhost:8080/api/adoption/userInfo/login?email=${enteredEmail}&password=${enteredPassword}`;


            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .then(data => {
                    if (data === '找不到信箱') {
                        Swal.fire('找不到信箱，登入失敗');
                    } else if (data === '密碼錯誤，登入失敗') {
                        Swal.fire('密碼錯誤，登入失敗');
                    } else if (data === '成功登入') {
                        Swal.fire({
                            title: "成功登入!",
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {

                                const foundUser = this.userInfoList.find(user => user.email === enteredEmail);
                                if (foundUser) {
                                    sessionStorage.setItem('foundUserInfo', JSON.stringify({
                                        userId: foundUser.userId,
                                        permission: foundUser.permission,
                                    }));
                                }

                                // 定義你的密碼規則（英文大小寫、8位字符的規則）
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

                                if (!passwordRegex.test(enteredPassword)) {
                                    // 如果密碼不符合規則，導向強制修改密碼的頁面
                                    this.$router.push('/ForceChangePassword');

                                } else {
                                    this.$router.push('/Profile');
                                }
                            }
                        });
                    } else {
                        Swal.fire('登入失敗，帳號或密碼錯誤');
                    }
                })
                .catch(error => {
                    console.error('登入過程中出現錯誤:', error);
                    Swal.fire('登入過程中出現錯誤');
                });
        }





    }
}
</script>

<template>
    <div class="content">
        <div class="loginArea">
            <div class="title">
                <h1>Login</h1>
            </div>
            <div class="inputArea">
                <h3>Email</h3>
                <input type="email" id="email" v-model="this.email">
                <h3>Password</h3>
                <input type="password" v-model="this.password">
            </div>
            <div class="buttonArea">
                <h3 @click="goSignUp">Sign Up ?</h3>
                <h3></h3>
                <button type="button" @click="login()">登入</button>
            </div>
            <div class="buttonArea">
                <h3 @click="goForgetPassword" style="margin-right: 155px;">Forget Password ?</h3>
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
        }

        .buttonArea {
            width: 40vw;
            display: flex;
            align-items: center;
            justify-content: center;

            h3 {
                color: #978989;
                margin-right: 10%;
                cursor: pointer;

            }

            button {
                margin-left: 70px;
                width: 10vmin;
                height: 6vmin;
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
