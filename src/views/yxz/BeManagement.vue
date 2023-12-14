<script>
export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
        }
    }
}
</script>

<template>
    <p>後台管理</p>    
    <textarea name="" id="" cols="90" rows="10">
    1.預計新增 createNewInfo 最新消息功能 add something to PlatformEntrance(平台入口)
    2.預計新增 manageUser 管理人員功能 ban someone for some reason
    permission=0 can not login 
    3.預計新增 forgetPassword 已註冊會員 寄送認證信(setPassword=StringRandom 6碼暫時密碼) 
    然後再次強制改密碼 
    if String pattern != "^(?=.*[a-z])(?=.*[A-Z]).{8,}$" → forceChangePassword at profile.vue 

    </textarea>
       
</template>