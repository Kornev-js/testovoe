<template>
<div class="modal-wrapper">
<!--    //TODO: single modal for editing and creating :DONE-->
<!--    //TODO: into modal you need pass id. IF id empty - modal type = create. If id not empty - modal type edit :DONE-->
    <div>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create Contact</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                <div class="mb-3 row">
                    <label for="userName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :class="validate.name === undefined ? '' : ' is-invalid'" v-model="userName" id="userName" placeholder="Please enter your name" >
                        <div v-for="error in validate.name" v-if="validate.name !== null" class="invalid-feedback">
                            {{ error }}
                        </div>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="userEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :class="validate.email === undefined ? '' : ' is-invalid'" v-model="userEmail" id="userEmail" placeholder="test@domain.com">
                        <div v-for="error in validate.email" v-if="validate.email !== null" class="invalid-feedback">
                            {{ error }}
                        </div>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="userAddress" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" :class="validate.address === undefined ? '' : ' is-invalid'" v-model="userAddress" id="userAddress" placeholder="New Channel Name">
                        <div v-for="error in validate.address" v-if="validate.address !== null" class="invalid-feedback">
                            {{ error }}
                        </div>
                    </div>
                </div>
            </div>
<!--                    //TODO: study absolute paths to images in laravel + vue :DONE-->
                    <div class="col-md-6"><img :src="require('../../pictures/cross.png').default" alt="" width="150px" height="150px"></div>
                </div>
            </div>


            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                <button v-if="desk === null" type="button" class="btn btn-primary" @click="addNewDesk">Add</button>
                <button v-else type="button" class="btn btn-primary" @click="editDesk">Edit</button>
            </div>
        </div>
    </div>
    </div>




</template>

<script>
import moment from "moment";

//TODO: read about vue  props: , watcher :DONE
//TODO: check dmitriy solution :DONE
export default {
    props:{
        desks: {
            type: Array,
            default: [],
        },
        desk: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            userName:'',
            userEmail:'',
            userAddress:'',

            validate:{
            },
        }
    },

    watch: {
        //TODO: move validation from js to laravel :DONE
        //TODO: show validation errors from laravel :DONE
        // userName(){
        //     this.validate.name = !(this.userName.length < 5 && this.userName.length > 0);
        // },
        // userEmail(){
        //     // this.validate.email = !(this.userEmail.length < 5 && this.userEmail.length > 0);
        //     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //     this.validate.emailParser = reg.test(this.userEmail) || this.userEmail.length < 1;
        // },
        // userAddress(){
        //     this.validate.address = !(this.userAddress.length < 5 && this.userAddress.length > 0);
        // },
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
                data.checked = false;
                data.created_at = new Date().toISOString().slice(0, 19) + ".000000Z";
                data.id = response.data.data.id;
                data.timeString = moment(new Date()).fromNow();
                this.desks.push(data);
                this.closeModal();
            }).catch(error => {
                    this.validate = error.response.data.errors;
                })
        },

        editDesk() {
            let data = {
                name: this.userName,
                email: this.userEmail,
                address: this.userAddress,
            }
            axios.put('/api/desks/' + this.desk.id, data)
                .then(response => {
                    this.closeModal();
                    this.desk.name = this.userName;
                    this.desk.email = this.userEmail;
                    this.desk.address = this.userAddress;
                }).catch(error => {
                this.validate = error.response.data.errors;
            })
        },
    },

    mounted() {
        if(this.desk){
            this.userName = this.desk.name;
            this.userEmail = this.desk.email;
            this.userAddress = this.desk.address;
        }
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

img {
    margin-left: 75px;
}
</style>
