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
                        <input type="text" class="form-control" :class="validate.name ? '' : ' is-invalid'" v-model="userName" id="userName" placeholder="Please enter your name" >
                        <div v-if="!validate.name" class="invalid-feedback">
                            The name must be at least 5 characters.
                        </div>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="userEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :class="validate.email && validate.emailParser ? '' : ' is-invalid'" v-model="userEmail" id="userEmail" placeholder="test@domain.com">
                        <div v-if="!validate.email" class="invalid-feedback">
                            The email must be at least 5 characters.
                        </div>
                        <div v-if="!validate.emailParser" class="invalid-feedback">
                            Invalid email
                    </div>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="userAddress" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :class="validate.address ? '' : ' is-invalid'" v-model="userAddress" id="userAddress" placeholder="New Channel Name">
                        <div v-if="!validate.address" class="invalid-feedback">
                            The address must be at least 5 characters.
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                <button type="button" class="btn btn-primary" @click="addNewDesk">Add</button>
            </div>
        </div>
    </div>
    </div>




</template>

<script>
//todo read about vue  props: , watcher
//check dmitriy solution
export default {
    props:{
        desks: {
            type: Array,
            default: [],
        }
    },

    data() {
        return {
            userName:'',
            userEmail:'',
            userAddress:'',
            validate:{
                name: true,
                email: true,
                emailParser: true,
                address: true,
            },
        }
    },

    watch: {
        userName(){
            this.validate.name = !(this.userName.length < 5 && this.userName.length > 0);
        },
        userEmail(){
            this.validate.email = !(this.userEmail.length < 5 && this.userEmail.length > 0);
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            this.validate.emailParser = reg.test(this.userEmail) || this.userEmail.length < 1;
        },
        userAddress(){
            this.validate.address = !(this.userAddress.length < 5 && this.userAddress.length > 0);
        },
    },

    methods: {
        closeModal() {
            this.$emit('closeModal')
        },

        async addNewDesk() {
            let data = {
                name: this.userName,
                email: this.userEmail,
                address: this.userAddress,
            }
            await axios.post('/api/desks', data)
            .then(response => {
                data.created = false;
                data.created_at = new Date().toISOString().slice(0, 19) + ".000000Z";
                data.id = response.data.data.id;
                this.desks.push(data);
                this.closeModal();
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
