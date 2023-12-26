<script>
export default {
    data() {
        return {
            article: [1, 2, 3]
        }
    },
    methods:{
        goTo(x){
            this.$router.push(x)
        }
    }
}
</script>

<template>
    <div class="div">

        <div class="div-3">

            <div class="div-7">
                <h1>你知道嗎?</h1>
            </div>
            <div class="div-8">
                <div class="div-9">
                    <div class="column-3">
                        <img loading="lazy" srcSet="..." class="img-2" />
                    </div>
                    <div class="div-10">
                        <div class="div-11">
                            <h2>狂犬病也會傳染給人類!</h2>
                        </div>
                        <div class="div-12">
                            <span>”依</span>
                            <a href="https://db.lawbank.com.tw/FLAW/FLAWQRY03.aspx?lno=20&lsid=FL014716"
                                style="color: rgba(110, 117, 168, 1)" target="_blank">
                                動物傳染病防治條例第２０條第２款
                            </a>
                            <span>之規定，如防疫人員認為有必要，有可能對遭感染之動物進行撲殺，為保護家中動物並維護健康，防治狂犬病，防檢局呼籲飼主每年務必為犬貓施打狂犬病疫苗，並應繫掛證明牌，以維護人畜安全，避免受罰。”根據世界衛生組織估計：每年約有59,000~61,000死亡病例，其中亞洲國家以印度、中國、印尼及菲律賓病例數最多。在被疑似罹患狂犬病動物抓咬傷的受害者中，約有40%是15歲以下的孩童。人類狂犬病死亡病例絕大多數由病犬咬傷所引起。</span>
                        </div>

                    </div>

                </div>
            </div>
            <div class="div-14">
                <h1>熱門文章</h1>
            </div>
            <div class="div-15">
                <div class="div-15-1">
                    <div class="card" v-for="(item, index) in this.article">
                        <div class="cardTop">
                            <img loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dd07b98d595a732cb0cffc7e6ccd73b574e5a739e5e9479177f7b13c7f7fcc2?"
                                class="img-3" />
                            <div class="div-18">短腿貓的爸<br />@wei0113__</div>
                        </div>
                        <div class="div-19">好像養了一隻迷因貓</div>
                        <img loading="lazy" srcSet="..." class="img-4" />
                        <div class="div-20">
                            <span
                                style="color: rgba(151, 137, 137, 1)">先上最愛的一張照片，<br />快樂迷因仔，<br />不知道是不是腿短又肥肥的，<br />每次覺得睡覺阿腿都很可愛<br /><br /></span><span
                                style="color: rgba(166, 58, 80, 1)"> </span><span
                                style="color: rgba(110, 117, 168, 1)">...點我看更多</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="div-36">
                <button class="btn btn-big btn-specialBlue" style="color: white;"
                    @click="goTo('/ForumEntrance/view_Article')">閒聊版看更多</button>
            </div>
        </div>
    </div>
</template>
  
  
  
<style lang="scss" scoped>
@import '../../assets/main.scss';

.div {
    background-color: #d8dae9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 0 50px;
    font-size: 16pt;
}

.div-2 {
    box-shadow: 0px 4px 49px 0px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    min-height: 138px;
    width: 100%;
    flex-direction: column;
}

@media (max-width: 991px) {
    .div-2 {
        max-width: 100%;
    }
}

.div-3 {
    display: flex;
    width: 85%;
    flex-direction: column;
    margin: 69px 0 12px;
}

@media (max-width: 991px) {
    .div-3 {
        max-width: 100%;
        padding-left: 20px;
        margin-top: 40px;
    }
}

.div-4 {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    align-self: center;
    width: 1304px;
    max-width: 100%;
    padding: 46px 80px 46px 58px;
}

@media (max-width: 991px) {
    .div-4 {
        padding: 0 20px;
    }
}

.div-5 {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .div-5 {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 24%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .column {
        width: 100%;
    }
}

.img {
    aspect-ratio: 1.28;
    object-fit: contain;
    object-position: center;
    width: 60px;
    overflow: hidden;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img {
        margin-top: 40px;
    }
}

.column-2 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 76%;
    margin-left: 20px;
}

@media (max-width: 991px) {
    .column-2 {
        width: 100%;
    }
}

.div-6 {
    color: #978989;
    margin-top: 12px;
    white-space: nowrap;

}

@media (max-width: 991px) {
    .div-6 {
        margin-top: 40px;
        white-space: initial;
    }
}

.div-7 {
    color: #978989;
    align-self: stretch;
    margin-top: 34px;
    white-space: nowrap;

}

@media (max-width: 991px) {
    .div-7 {
        max-width: 100%;
        white-space: initial;
    }
}

.div-8 {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    align-self: center;
    margin-top: 15px;
    width: 90%;
    padding: 15px 50px 15px 32px;
    display: flex;
    align-items: center;
}

@media (max-width: 991px) {
    .div-8 {
        padding: 0 20px;
    }
}

.div-9 {
    gap: 20px;
    display: flex;
    align-items: center;
}

@media (max-width: 991px) {
    .div-9 {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.column-3 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 26%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .column-3 {
        width: 100%;
    }
}

.img-2 {
    aspect-ratio: 0.7;
    object-fit: contain;
    object-position: center;
    width: 304px;
    overflow: hidden;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img-2 {
        margin-top: 40px;
    }
}




.div-10 {
    height: 90%;
    display: flex;
    margin-top: 6px;
    flex-direction: column;
    justify-content: center;
    align-items: end;
}

@media (max-width: 991px) {
    .div-10 {
        max-width: 100%;
        margin-top: 40px;
    }
}

.div-11 {
    color: #978989;
    align-self: stretch;
    white-space: nowrap;

}

@media (max-width: 991px) {
    .div-11 {
        max-width: 100%;
        white-space: initial;
    }
}

.div-12 {
    color: #978989;
    text-decoration-line: underline;
    margin-top: 32px;

}

@media (max-width: 991px) {
    .div-12 {
        max-width: 100%;
    }
}



.div-14 {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin-top: 120px;

}

@media (max-width: 991px) {
    .div-14 {

        white-space: initial;
    }
}

.div-15 {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 31px;
}

.div-15-1 {
    width: 90%;
    height: 570px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.card {
    width: 450px;
    height: 550px;
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 22px 26px 41px;
}



.cardTop {
    width: 90%;
    display: flex;
    justify-content: space-between;
    gap: 11px;
}

.img-3 {
    aspect-ratio: 1.05;
    object-fit: contain;
    object-position: center;
    width: 60px;
    overflow: hidden;
    max-width: 100%;
}

.div-18 {
    color: #978989;
    margin: auto 0;

}

.div-19 {
    color: #978989;
    margin-top: 18px;
    white-space: nowrap;

}



.img-4 {
    aspect-ratio: 2.29;
    object-fit: contain;
    object-position: center;
    width: 100%;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
}

.div-20 {
    color: #6e75a8;
    margin-top: 22px;

}



.div-36 {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 240px;
        height: 65px;
        font-size: 20pt;
    }
}
</style>