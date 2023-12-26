<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    components: {
        VueCropper,
    },
    data() {
        return {
            imageUrl: null,
            croppedImageUrl: null,
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.imageUrl = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        saveCroppedImage() {
            this.cropper = this.$refs.cropper;
            const croppedCanvas = this.cropper && this.cropper.getCroppedCanvas();
            this.croppedImageUrl = croppedCanvas ? croppedCanvas.toDataURL('image/jpeg') : null;
            console.log('Cropped image saved:', this.croppedImageUrl);
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="left-panel panel">
            <h2>原始圖片</h2>
            <img :src="imageUrl" alt="">
            <input type="file" @change="handleFileChange">
        </div>
        <div class="center-panel panel">
            <h2>裁切區域</h2>
            <vue-cropper v-if="imageUrl" :src="imageUrl" :key="imageUrl" ref="cropper"></vue-cropper>
            <button v-if="imageUrl" @click="saveCroppedImage">保留修改</button>
        </div>
        <div class="right-panel panel">
            <h2>完成裁切後的圖片</h2>
            <img :src="croppedImageUrl" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.panel {
    width: 30%;
    padding: 20px;
    border: 1px solid #ccc;
    margin: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
        margin-bottom: 10px;
        font-size: 18px;
    }

    img {
        max-width: 100%;
        height: auto;

    }

    input[type="file"] {
        margin-top: 10px;
        padding: 8px 16px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 80%;
        box-sizing: border-box;
    }

    button {
        margin-top: 10px;
        padding: 8px 16px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2980b9;
        }
    }
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
}
</style>
