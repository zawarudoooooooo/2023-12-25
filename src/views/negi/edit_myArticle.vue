<script>
import ArticleDashBoard from '../../components/ArticleDashBoard.vue';
export default {
    data(){
        return{
            
        }
    },
    components:{
        ArticleDashBoard
    },

}
</script>


<!-- 發文的人編輯自己發的文章 -->
<template>
    <div class="all">
        <!-- <div class="div-2"></div> -->
        <div class="out_contain">
            <div class="in_contain">
                <div class="dashboard">
                    <ArticleDashBoard />
                </div>
                <div class="out_article_area">
                    <div class="in_article_area">
                        <div class="function_icon_area">
                            <i class="fa-solid fa-right-from-bracket img-2"></i>
                            <i class="fa-solid fa-floppy-disk img-3"></i>
                        </div>
                        <div class="article">
                            <div class="poster_area">
                                <div class="poster">
                                    <div class="div-13">
                                        <div class="div-14">
                                            <img loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a90f93bf046cb34155d14545eaf092cbb5340f95d7851405d718068990aeece?"
                                                class="poster_icon" />
                                            <div class="poster_data">
                                                <p class="poster_name">短腿貓的爸</p>
                                                <!-- 短腿貓的爸<br /> -->
                                                <p class="poster_userId">@wei0113__</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column-4">
                                        <div class="div-16">
                                            <div class="pet_state">with</div>
                                            <div class="pet">
                                                <div class="pet_name">Kiwi</div>
                                                <img loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5229e6b9f8129729e04753274f9898cd171972f078ea719bd686b4bf738bc61a?"
                                                    class="pet_type" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-20"></div>
                            <div class="article_title">好像養了一隻迷因貓</div>
                            <img loading="lazy" srcSet="..." class="article_img" />
                            <div class="article_contain">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fugiat odio nostrum tempore, quisquam incidunt, reiciendis quas eveniet mollitia deleniti eos dolore aliquam quibusdam consequuntur totam possimus asperiores, unde maiores.</p>
                                <!-- 先上最愛的一張照片，<br />快樂迷因仔，<br />不知道是不是腿短又肥肥的，<br />每次覺得睡覺阿腿都很可愛<br />就是一隻小笨貓<br />哈哈 -->
                            </div>
                            <div class="div-23">Comment</div>
                            <div class="div-24"></div>

                            <div class="reply">
                                <div class="replier">
                                    <img loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd14f0e97fc248c0848764be5bceb2595c5aaaa043bb11f500f16b3769856a4b?"
                                        class="replier_img" />
                                    <div class="replier_data">
                                        <p class="replier_name">短腿貓的爸</p>
                                        <p class="replier_userId">@wei0113__</p>
                                        <div class="replier_text">笑死，這隻貓也太可愛</div>
                                        <p>回覆</p>
                                    </div>
                                </div>
                                <div class="replier_replier">
                                    <img loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/325bf2b6904cc722a9fe82991fb721b3d31e009fcdf5fd2018580e2ecd595986?"
                                    class="replier_replier_img" />
                                    <div class="replier_data">
                                        <p class="replier_name">短腿貓的爸</p>
                                        <p class="replier_userId">@wei0113__</p>
                                        <div class="replier_text">笑死，這隻貓也太可愛</div>
                                    </div>
                                </div>
                            </div>
                            <div class="div-33"></div>

                            <!-- 
                                <div class="div-34">
                                <img loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f8cc4acf7419613095ee74541d1abf1dddcf182a6560d010288138c4f21a17f?"
                                    class="img-11" />
                                <div class="div-35">
                                    <div class="div-36">短腿貓的爸<br />@wei0113__</div>
                                    <div class="div-37">笑死，這隻貓也太可愛</div>
                                </div>
                            </div>
                            <div class="div-38"></div>
                            <div class="div-39">
                                <img loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27656a259e5bdeb35ab4aa638b3b6a86263452cfb1d13822e7ec2f55adc2dfec?"
                                    class="img-12" />
                                <div class="div-40">
                                    <div class="div-41">短腿貓的爸<br />@wei0113__</div>
                                    <div class="div-42">笑死，這隻貓也太可愛</div>
                                </div>
                            </div>
                            -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.all {
    width: 100vw;
    height: auto;
    padding-top: 3vmin;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 5vmin;
    display: flex;
    justify-content: space-between;
    background-color: #DDDFEE;
}

.out_contain {
    align-self: center;
    width: 100%;
}

@media (max-width: 991px) {
    .out_contain {
        max-width: 100%;
        margin-top: 40px;
    }
}

.in_contain {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .in_contain {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.dashboard {
    width: 13vw;
}

@media (max-width: 991px) {
    .dashboard {
        width: 100%;
    }
}


.out_article_area {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 80%;
}

@media (max-width: 991px) {
    .out_article_area {
        width: 100%;
    }
}

.in_article_area {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: end;
    width: 78vw;
    padding: 45px 0;
    height: auto;
    color: #978989;
    font-size: 14pt;
    padding: 20px 30px 20px 30px ;
}

@media (max-width: 991px) {
    .in_article_area {
        max-width: 100%;
        margin-top: 40px;
    }
}

.function_icon_area {
    display: flex;
    margin-right: 60px;
    width: 119px;
    max-width: 100%;
    padding-right: 5px;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .function_icon_area {
        margin-right: 10px;
    }
}

.img-2 {
    font-size: 32pt;
}

.img-3 {
    font-size: 32pt;
}

.article {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    margin: 57px 0 4px;
    padding: 0 18px;
}

@media (max-width: 991px) {
    .article {
        max-width: 100%;
        margin-top: 40px;
    }
}

.poster_area {
    align-self: stretch;
}

@media (max-width: 991px) {
    .poster_area {
        max-width: 100%;
        padding-right: 20px;
    }
}

.poster {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .poster {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.div-13 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 57%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .div-13 {
        width: 100%;
    }
}

.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 18px;
}

@media (max-width: 991px) {
    .div-14 {
        margin-top: 40px;
    }
}

.poster_icon {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 96px;
    overflow: hidden;
    max-width: 100%;
}

.poster_data {
    color: #978989;
    margin: auto 0;
    font: 800 32px Lexend, sans-serif;
}

.column-4 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 43%;
    margin-left: 20px;
}

@media (max-width: 991px) {
    .column-4 {
        width: 100%;
    }
}

.div-16 {
    display: flex;
    width: 100%;
    flex-grow: 1;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
}

@media (max-width: 991px) {
    .div-16 {
        margin-top: 40px;
    }
}

.pet_state {
    color: #978989;
    margin-top: 69px;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 32px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_state {
        margin-top: 40px;
        white-space: initial;
    }
}

.pet {
    border-radius: 37px;
    background-color: #e9d2a6;
    align-self: stretch;
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 4px;
    padding: 14px 12px 0 24px;
}

@media (max-width: 991px) {
    .pet {
        padding-left: 20px;
    }
}

.pet_name {
    color: #fff;
    flex-grow: 1;
    white-space: nowrap;
    font: 800 28px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .pet_name {
        white-space: initial;
    }
}

.pet_type {
    aspect-ratio: 1.27;
    object-fit: contain;
    object-position: center;
    width: 147px;
    fill: #fff;
    overflow: hidden;
    margin-top: 10px;
    max-width: 100%;
}

.div-20 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 42px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-20 {
        max-width: 100%;
        margin-top: 40px;
    }
}

.article_title {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 27px 0 0 76px;
    font: 800 39px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_title {
        margin-left: 10px;
        white-space: initial;
    }
}

.article_img {
    aspect-ratio: 0.91;
    object-fit: contain;
    object-position: center;
    width: 369px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
    margin: 24px 0 0 66px;
}

@media (max-width: 991px) {
    .article_img {
        margin-left: 10px;
    }
}

.article_contain {
    color: #978989;
    align-self: start;
    width: 325px;
    max-width: 100%;
    margin: 36px 0 0 75px;
    font: 800 21px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .article_contain {
        margin-left: 10px;
    }
}

.div-23 {
    color: #978989;
    align-self: start;
    white-space: nowrap;
    margin: 151px 0 0 23px;
    font: 800 28px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .div-23 {
        white-space: initial;
        margin: 40px 0 0 10px;
    }
}

.div-24 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 11px;
    height: 5px;
}

@media (max-width: 991px) {
    .div-24 {
        max-width: 100%;
    }
}

.reply {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 34px 0 0 23px;
    flex-direction: column;
}

@media (max-width: 991px) {
    .reply {
        margin-left: 10px;
    }
}

.replier_img {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.replier {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    /* flex-direction: column; */
}

.replier_data {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.replier_text {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.replier_replier {
    align-self: start;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0px;
    margin: 8px 0 0 90px;
}

@media (max-width: 991px) {
    .replier_replier {
        margin-left: 10px;
        justify-content: center;
    }
}

.img-8 {
    aspect-ratio: 0.03;
    object-fit: contain;
    object-position: center;
    width: 2px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    max-width: 100%;
}

.img-9 {
    aspect-ratio: 5.33;
    object-fit: contain;
    object-position: center;
    width: 80px;
    stroke-width: 2px;
    stroke: rgba(151, 137, 137, 0.5);
    overflow: hidden;
    align-self: start;
    margin-top: 57px;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img-9 {
        margin-top: 40px;
    }
}

.replier_replier_img {
    aspect-ratio: 1.03;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    align-self: end;
    margin-top: 26px;
    max-width: 100%;
}

.replier_replier_data {
    align-self: center;
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
    margin: auto 0;
}

.div-31 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-32 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}

.div-33 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 16px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-33 {
        max-width: 100%;
    }
}

.div-34 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 24px 0 0 23px;
}

@media (max-width: 991px) {
    .div-34 {
        margin-left: 10px;
    }
}

.img-11 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-35 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-36 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-37 {
    color: #978989;
    margin-top: 11px;
    font: 800 21px Lexend, sans-serif;
}

.div-38 {
    background-color: rgba(151, 137, 137, 0.4);
    align-self: stretch;
    margin-top: 33px;
    height: 2px;
}

@media (max-width: 991px) {
    .div-38 {
        max-width: 100%;
    }
}

.div-39 {
    align-self: start;
    display: flex;
    align-items: start;
    gap: 17px;
    margin: 30px 0 0 23px;
}

@media (max-width: 991px) {
    .div-39 {
        margin-left: 10px;
    }
}

.img-12 {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 73px;
    overflow: hidden;
    max-width: 100%;
}

.div-40 {
    display: flex;
    flex-grow: 1;
    flex-basis: 0%;
    flex-direction: column;
}

.div-41 {
    color: #978989;
    font: 800 12px Lexend, sans-serif;
}

.div-42 {
    color: #978989;
    margin-top: 12px;
    font: 800 21px Lexend, sans-serif;
}</style>