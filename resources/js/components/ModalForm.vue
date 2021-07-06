<template>
<div class="modal-wrapper">
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
                        <input type="text" class="form-control" v-model="userName" id="userName" placeholder="Please enter your name" >
                    </div>
                </div>

                    <div class="mb-3 row">
                        <label for="userEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="userEmail" id="userEmail" placeholder="test@domain.com">
                        </div>
                    </div>

                        <div class="mb-3 row">
                            <label for="userAddress" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="userAddress" id="userAddress" placeholder="New Channel Name">
                            </div>
                        </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                <button type="button" class="btn btn-primary" @click="addNewDesk">Save changes</button>
            </div>
        </div>
    </div>
    </div>




</template>

<script>
//todo read about vue  props: , watcher
//check dmitriy solution
export default {
    props:
        ['name', 'email' , 'address'],



    data() {
        return {
            userName:'',
            userEmail:'',
            userAddress:'',
        desks: []


        }
    },

    watch: {
        'name': function (value, oldValue) {
            this.userName = value;
        },
        'email': function (value, oldValue) {
            this.userEmail = value;
        },
        'address': function (value, oldValue) {
            this.userAddress = value;
        },
    },

    methods: {
        closeModal() {
            this.$emit('closeModal')
        },

        addNewDesk() {
            axios.post('/api/desks',{
                name: this.userName,
                email: this.userEmail,
                address: this.userAddress,



            })
            .then(response => {
                this.desks = []
                this.closeModal()
            })
        },


        mounted() {

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
