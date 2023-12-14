<script>
export default {
    data() {
        return {
            userInfoList: null,
            Account: null,
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

        //12.12新增 前端登入邏輯 加上密碼驗證邏輯
        //12.14 foundUserInfo containning userId & permission 
        login() {
            const enteredAccount = this.Account;
            const enteredPassword = this.password;

            // 构建带有账号和密码的 URL
            const url = `http://localhost:8080/api/adoption/userInfo/login?account=${enteredAccount}&password=${enteredPassword}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        // 登录成功
                        console.log('登录成功');
                        alert('登录成功');

                        // 在userInfoList中寻找对应的用户并存储到sessionStorage中
                        const foundUser = this.userInfoList.find(user => user.account === enteredAccount);
                        if (foundUser) {
                            sessionStorage.setItem('foundUserInfo', JSON.stringify({
                                userId: foundUser.userId,
                                permission: foundUser.permission,
                                // 其他你需要存儲的用戶信息...
                            }));
                        }
                        this.$router.push('/Profile')

                        // 在此处执行登录后的操作，比如导航到其他页面
                    } else {
                        // 登录失败
                        console.log('登录失败，账户或密码错误');
                        alert('登录失败，账户或密码错误');
                    }
                })
                .catch(error => {
                    console.error('登录过程中出现错误:', error);
                    alert('登录过程中出现错误');
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
                <h3>Account</h3>
                <input type="text" v-model="this.Account">
                <h3>Password</h3>
                <input type="password" v-model="this.password">
            </div>
            <div class="buttonArea">
                <h3 @click="goSignUp">Sign Up ?</h3>
                <h3></h3>
                <button type="button" @click="login()">登入</button>
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
