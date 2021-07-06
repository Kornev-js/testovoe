<template>
    <div class="modal-wrapper" ref="modal_wrapper">
        <div>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Contact</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">

                    <div class="mb-3 row">
                        <label for="userName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="desks.name" id="userName" placeholder="Please enter your name">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="userEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="desks.email" id="userEmail" placeholder="test@domain.com">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="userAddress" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="desks.address" id="userAddress" placeholder="New Channel Name">
                        </div>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" >Save changes</button>
                </div>
            </div>
        </div>
    </div>




</template>

<script>
export default {
    props: [
      'deskId'
    ],
    data() {
        return {
      desks: []

        }
    },


    methods: {
        closeModal() {
            this.$emit('closeModal')
        },


        mounted() {
             axios.get('api/desks/'+this.deskId)
            .then(response => {
                this.desks = response.data
            })

        },

    },
}
</script>

<style scoped>

.modal-wrapper {
    display: flex;
    position: absolute;
    align-items: center;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    background: rgba(64, 64, 64, .4);
}





</style>
