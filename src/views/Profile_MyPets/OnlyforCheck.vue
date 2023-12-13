<script>
export default{
    data(){
        return{
            adopterInfo: null,
            isShowModal: false,
        }
    },
    methods: {
        showModal(item){
            this.adopterInfo = item;
            console.log(this.isShowModal)
            this.isShowModal = true;
            console.log(this.isShowModal)
        },
        closeMoal(){
            this.isShowModal = false;
        }
    }
}
</script>

<template>
<button class="btn btn-specialRed" data-bs-toggle="modal" data-bs-target="#detailModal" @click="showModal(item)">
    <i class="fa-solid fa-circle-info" style="color: white;" ></i>
    <p style="color: white;">查看詳細</p>
</button>
<!-- Modal -->
<div class="modal fade" id="detailModal" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
            </div>
            <div class="modal-body">
                <div class="modalBodyTop"></div>
                <div class="modalBodyMiddle">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum perferendis exercitationem quis neque natus.</p>
                </div>
                <div class="modalBodyLast">
                    <div class="modalBodyLastTitle">
                        <h4>My Pet</h4>
                    </div>
                    <!-- v-for -->
                    <div class="modalBodyLastPet">

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-specialRed" data-bs-toggle="modal" data-bs-target="#detailModal">
                    <i class="fa-solid fa-circle-info" style="color: white;" @click="showModal(item)"></i>
                    <p style="color: white;">拒絕送養</p>
                </button>
                <button class="btn btn-specialRed" data-bs-toggle="modal" data-bs-target="#detailModal">
                    <i class="fa-solid fa-circle-info" style="color: white;" @click="showModal(item)"></i>
                    <p style="color: white;">接受送養</p>
                </button>
                <button class="btn btn-specialBlue">
                    <i class="fa-solid fa-comments" style="color: white;"></i>
                    <p style="color: white;">聊聊了解</p>
                </button>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>

</style>