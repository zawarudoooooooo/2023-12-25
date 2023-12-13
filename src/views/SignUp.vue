<script>
export default {
    data() {
        return {

            //12.12新增變數
            account: null,
            password: null,
            email: null,
            birth: null

        }
    },
    //進入頁面時，變更背景顏色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#EDFDF9')
    },
    methods: {
        goLogin() {
            this.$router.push('/')
        },

        //12.12 新增使用者註冊邏輯
        signup() {
            const newuserInfo = {
                account:this.account,
                password:this.password,
                email:this.email,
                birth:this.birth,
            };

            console.log(newuserInfo)
            // 
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

            alert("註冊成功");
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
                <!-- ID -->
                <h3>Account</h3>
                <div class="idinput">
                    <p>@</p>
                    <input type="text" v-model="this.account">
                </div>
                <!-- 密碼 -->
                <h3>Password</h3>
                <input type="password" v-model="this.password">
                <!-- 電子郵件 -->
                <h3>Email</h3>
                <input type="text" v-model="this.email">
                <!-- 生日 -->
                <h3>Birthday</h3>
                <input type="date" v-model="this.birth">
            </div>
            <div class="buttonArea">
                <h3 @click="goLogin">Log in ?</h3>
                <!-- <button type="button" @click="goLogin">Sign Up</button> -->
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
}</style>
