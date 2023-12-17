<script>
export default {
    data() {
        return {
            userName: null,
            email: null,
            password: null,
            birth: null,
            authenticationCode: null,
        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#EDFDF9')
    },
    methods: {
        goLogin() {
            this.$router.push('/login')
        },

        //發送認證碼
        sendAuthenticationCode() {
            const newuserInfo = {
                userName: this.userName,
                email: this.email,
                password: this.password,
                birth: this.birth,
            };

            console.log(newuserInfo)

            fetch('http://localhost:8080/api/adoption/userInfo/createUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInfo: newuserInfo })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            alert("已寄送認證信");
        },

        //註冊邏輯
        signup() {
            const newuserInfo = {
                userName: this.userName,
                email: this.email,
                password: this.password,
                birth: this.birth,
                authenticationCode: this.authenticationCode
            };

            console.log(newuserInfo)

            fetch('http://localhost:8080/api/adoption/userInfo/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInfo: newuserInfo })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));

            alert("註冊成功，帳號已成功開通");
            this.$router.push('/login')
        },


    }
}
</script>

<template>
    <div class="content">
        <!-- 註冊 -->
        <div class="signupArea">
            <div class="title">
                <h1>Sign Up</h1>
            </div>
            <div class="inputArea">

                <!--多一個填寫資料-->
                <h3>User Name</h3>
                <input type="text" v-model="this.userName">
                <!-- 電子郵件 -->
                <h3>Email</h3>
                <input type="email" id="email" v-model="this.email">
                <!-- 密碼 -->
                <h3>Password</h3>
                    <input type="password" v-model="this.password" placeholder="含英文大小寫8碼以上">
                <!-- 生日 -->
                <h3>Birthday</h3>
                <input type="date" v-model="this.birth">
                <!-- 認證碼填寫欄位 -->
                <h3>Authentication Code</h3>
                <input type="text" v-model="this.authenticationCode" style="width: 100px;">
                <button type="button" @click="sendAuthenticationCode()">發送認證碼</button>
            </div>
            <div class="buttonArea" style="margin-top: 55px;">
                <h3 @click="goLogin">Log in ?</h3>
                <button type="button" @click="signup()">註冊</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 75vh;
    margin-top: 15vmin;

    //註冊
    .signupArea {
        width: 40vw;
        height: 70vh;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        padding: 1px;
        box-shadow: 3px 3px 3px gray;

        h1 {
            text-align: center;
            color: #978989;
        }

        //輸入
        .inputArea {
            width: 26vw;
            height: 45vh;
            margin: auto;

            h3 {
                color: #978989;
                margin-bottom: 0;
            }

            //ID輸入
            .idinput {
                width: 25vw;
                display: flex;
                justify-content: space-between;
                margin-left: 2vmin;

                p {
                    color: #978989;
                    font-weight: bold;
                    margin: auto;
                }

                input {
                    width: 21vw;
                    height: 5vh;
                    border-radius: 10px;
                    background-color: #D4D2D2;
                    border-style: none;
                    outline: none;
                    padding-left: 2vmin;
                }
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
                margin-left: 45px;
                width: 15vmin;
                height: 5vmin;
                border-radius: 10px;
                border-style: none;
                background-color: #B2D2CD;
                color: white;
                font-size: 13pt;
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
                margin-right: 10%;
            }

            button {
                width: 13vmin;
                height: 4vmin;
                border-radius: 10px;
                border-style: none;
                background-color: #B2D2CD;
                color: white;
                font-size: 13pt;
                font-weight: bold;
            }
        }
    }
}
</style>
