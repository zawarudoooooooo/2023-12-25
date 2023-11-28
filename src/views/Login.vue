<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goSignUp(){
                this.$router.push('/SignUp')
            },
            goProfile(){
                this.$router.push('/Profile')
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
                <input type="text">
                <h3>Password</h3>
                <input type="password">
            </div>
            <div class="buttonArea">
                <h3 @click="goSignUp">Sign Up ?</h3>
                <button type="button" @click="goProfile">Login</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 100vw;
        height: 60vh;
        margin-top: 15vmin;
    
        .loginArea{
            width: 40vw;
            height: 50vh;
            background-color: white;
            border-radius: 10px;
            margin: auto;
            padding: 1px;

                h1{
                    text-align: center;
                    color: #978989;
                }

                .inputArea{
                    width: 25vw;
                    height: 25vh;
                    margin: auto;
                    h3{
                        color: #978989;
                        margin-bottom: 0;
                    }
                    input{
                        width: 25vw;
                        height: 5vh;
                        border-radius: 10px;
                        background-color: #D4D2D2;
                        border-style: none;
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
                        width: 10vmin;
                        height: 4vmin;
                        border-radius: 10px;
                        border-style: none;
                        background-color: #E9D2A6;
                        color: white;
                    }
                }
        }
    }
</style>
