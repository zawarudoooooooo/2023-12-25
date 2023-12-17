<script>
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),

            foundUser: null,
            userInfoList: null,
            newPassword: null,
            confirmPassword: null,
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

                    // 根據 foundUserId 找到對應的 foundUser
                    const foundUser = this.userInfoList.find(user => user.userId === this.foundUserInfo.userId);

                    // 如果找到了對應的 foundUser，你可以做一些操作
                    if (foundUser) {
                        console.log('找到了對應的使用者:', foundUser);
                        this.foundUser = foundUser
                    } else {
                        console.log('找不到對應的使用者');
                    }


                })
        },

        savedNewPassword() {
            const enteredEmail =this.foundUser.email;
            const enteredNewPassword = this.newPassword;
            const enteredConfirmPassword = this.confirmPassword;
            
            const url = `http://localhost:8080/api/adoption/userInfo/forceChangePassword?email=${enteredEmail}&newPassword=${enteredNewPassword}&confirmPassword=${enteredConfirmPassword}`;
        
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
                        console.log('找不到信箱');
                        alert('找不到信箱');
                    } else if (data === '成功更新密碼，請重新登入') {
                        console.log('成功更新密碼，請重新登入');
                        alert('已成功更新密碼，請重新登入');
                        sessionStorage.removeItem('foundUserInfo');
                        this.$router.push('/Login')
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
                <h1>ForceChangePassword</h1>
            </div>
            <div class="inputArea">
                <h4>Key in New Password</h4>
                <input type="password" v-model="this.newPassword" placeholder="含英文大小寫8碼以上">
                <h4>Confirm New Password</h4>
                <input type="password" v-model="this.confirmPassword" placeholder="再次輸入密碼">
            </div>
            <div class="buttonArea">
                <h3 @click="goSignUp">Sign Up ?</h3>
                <h3></h3>
                <button type="button" @click="savedNewPassword()">儲存新密碼</button>
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
                width: 15vmin;
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
