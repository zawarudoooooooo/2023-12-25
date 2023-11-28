<script>
    export default{
        data(){
            return{

            }
        },
        //進入頁面時，變更背景顏色
        beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#EDFDF9')
        },
        methods:{
            goLogin(){
                this.$router.push('/')
            },
        }
    }
</script>

<template>
    <div class="content">
        <div class="signupArea">
            <div class="title">
                <h1>Sign Up</h1>
            </div>
            <div class="inputArea">
                <h3>ID</h3>
                    <div class="idinput">
                        <p>@</p>
                        <input type="text">
                    </div>
                <h3>Password</h3>
                <input type="password">
                <h3>Email</h3>
                <input type="text">
                <h3>Birthday</h3>
                <input type="date">
            </div>
            <div class="buttonArea">
                <h3 @click="goLogin">Log in ?</h3>
                <button type="button" @click="goLogin">Sign Up</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
        .content{
        width: 100vw;
        height: 75vh;
        margin-top: 15vmin;
    
        .signupArea{
            width: 40vw;
            height: 70vh;
            background-color: white;
            border-radius: 10px;
            margin: auto;
            padding: 1px;

                h1{
                    text-align: center;
                    color: #978989;
                }

                .inputArea{
                    width: 26vw;
                    height: 45vh;
                    margin: auto;
                    h3{
                        color: #978989;
                        margin-bottom: 0;
                    }
                    .idinput{
                        width: 25vw;
                        display: flex;
                        justify-content: space-between;
                        margin-left: 2vmin;

                        p{
                            color: #978989;
                            font-weight: bold;
                            margin: auto;
                        }

                        input{
                            width: 21vw;
                            height: 5vh;
                            border-radius: 10px;
                            background-color: #D4D2D2;
                            border-style: none;
                            outline: none;
                            padding-left: 2vmin;
                        }
                    }

                    input{
                            width: 25vw;
                            height: 5vh;
                            border-radius: 10px;
                            background-color: #D4D2D2;
                            border-style: none;
                            outline: none;
                            padding-left: 2vmin;
                        }
                }

                .buttonArea{
                    width: 40vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    h3{
                        color: #978989;
                        margin-right: 10%;
                    }

                    button{
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
