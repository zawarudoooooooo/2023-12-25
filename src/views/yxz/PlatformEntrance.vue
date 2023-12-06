<template>
    <div class="div">
        <div class="div-2">
            <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f6a9979fd53f3c5e64a665bf4a1149a8417ec48b188721f0113d7eeb7427e2f?"
                class="img" />
        </div>
        <div class="div-3">
            <div class="div-4">
                <div class="column">
                    <img loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/06062d6238a6691ea533dbc096994639c6e1407d07d6742eb34d44f9d98fe771?"
                        class="img-2" />
                </div>
                <div class="column-2">
                    <div class="div-5">Announce(平台入口)</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
  
<style scoped>
.div {
    background-color: #fff;
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
}

.div-2 {
    box-shadow: 0px 4px 49px 0px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    padding: 44px 58px;
}

@media (max-width: 991px) {
    .div-2 {
        max-width: 100%;
        padding: 0 20px;
    }
}

.img {
    aspect-ratio: 0.94;
    object-fit: contain;
    object-position: center;
    width: 48px;
    fill: rgba(0, 0, 0, 0.45);
    overflow: hidden;
    max-width: 100%;
}

.div-3 {
    border-radius: 35px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.28);
    background-color: #fff;
    align-self: center;
    width: 1304px;
    max-width: 100%;
    margin: 80px 0 256px;
    padding: 46px 80px 46px 55px;
}

@media (max-width: 991px) {
    .div-3 {
        margin: 40px 0;
        padding: 0 20px;
    }
}

.div-4 {
    gap: 20px;
    display: flex;
}

@media (max-width: 991px) {
    .div-4 {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
}

.column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 23%;
    margin-left: 0px;
}

@media (max-width: 991px) {
    .column {
        width: 100%;
    }
}

.img-2 {
    aspect-ratio: 1.11;
    object-fit: contain;
    object-position: center;
    width: 60px;
    overflow: hidden;
    max-width: 100%;
}

@media (max-width: 991px) {
    .img-2 {
        margin-top: 40px;
    }
}

.column-2 {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 77%;
    margin-left: 20px;
}

@media (max-width: 991px) {
    .column-2 {
        width: 100%;
    }
}

.div-5 {
    color: #978989;
    margin-top: 16px;
    white-space: nowrap;
    font: 800 40px Lexend, sans-serif;
}

@media (max-width: 991px) {
    .div-5 {
        margin-top: 40px;
        white-space: initial;
    }
}</style>