<template>
    <div>
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span class="fs-4">Cool Project Name</span>
                    <span class="fs-4 ml-4">{{ timestamp }}</span>
                </a>

                <div class="dropdown ms-3 select">
                    <button class="btn btn-bd-light " id="bd-versions"  aria-expanded="false" data-bs-display="static">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <span class="d-none d-lg-inline">Your Name</span>
                    </button>

                </div>
            </header>
        </div>
            <div class="container">
                <p>Contacts</p>
                <button type="button" class="btn btn-primary add"   @click="showModal" >
                    <i class="fas fa-plus-circle"></i>
                    Add contact
                </button>
                <button type="button" class="btn btn-danger del" :disabled="isChecked" @click="deleteMarked" >
                    <i class="far fa-times-circle"></i>
                    Delete marked
                </button>
            </div>
        <div class="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" class="checkall" :checked="checkedAll" @change="checkAll($event.target.checked)"></th>
                            <th>
                                <input class="d-none" type="radio" name="sort" value="name" id="s_Name"
                                       v-model="sorting"/>
                                <label for="s_Name"
                                       @click="sortBy('name')"
                                       style="cursor: pointer">
                                    Name
                                </label>
                                <span class="position-absolute m-1" style="font-size: 12px;" v-if="sorting === 'name'">
                                    <i v-if="sort.name">▲</i>
                                    <i v-else>▼</i>
                                </span>
                            </th>
                            <th>
                                <input class="d-none" type="radio" name="sort" value="email" id="s_Email"
                                       v-model="sorting"/>
                                <label for="s_Email"
                                       @click="sortBy('email')"
                                       style="cursor: pointer">
                                    Email
                                </label>
                                <span class="position-absolute m-1" style="font-size: 12px;" v-if="sorting === 'email'">
                                    <i v-if="sort.email">▲</i>
                                    <i v-else>▼</i>
                                </span>
                            </th>
                            <th>
                                <input class="d-none" type="radio" name="sort" value="address" id="s_Address"
                                       v-model="sorting"/>
                                <label for="s_Address"
                                       @click="sortBy('address')"
                                       style="cursor: pointer">
                                    Address
                                </label>
                                <span class="position-absolute m-1" style="font-size: 12px;" v-if="sorting === 'address'">
                                    <i v-if="sort.address">▲</i>
                                    <i v-else>▼</i>
                                </span>
                            </th>
                            <th>
                                <input class="d-none" type="radio" name="sort" value="created_at" id="s_Created"
                                       v-model="sorting"/>
                                <label for="s_Created"
                                       @click="sortBy('created_at')"
                                       style="cursor: pointer">
                                    Created
                                </label>
                                <span class="position-absolute m-1" style="font-size: 12px;" v-if="sorting === 'created_at'">
                                    <i v-if="sort.created_at">▲</i>
                                    <i v-else>▼</i>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="desk in desks">
                        <tr>
            <!--       <i class="far fa-times-circle"></i>         -->

                            <th scope="col"><input type="checkbox" class="thing" v-on:click="desk.checked = !desk.checked" :checked="desk.checked"><td></td>
                            <th scope="row"> <i class="far fa-times-circle"></i> {{desk.name}}</th>
                            <td>{{desk.email}}</td>
                            <td>{{desk.address}}</td>
                            <td>
                                {{desk.timeString}}
                                <div class="btn-group dropend">
                                <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <ul class="dropdown-menu" style="">
                                    <li><a class="dropdown-item" href="#" @click="editPost(desk)"><i class="fas fa-align-justify"></i>View</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#" @click="deleteDesk(desk.id)"><i class="fas fa-times "></i>Delete</a></li>
                                </ul>
                            </div>
                            </td>

                            <div class="alert alert-warning" role="alert" v-if="errored">
                                Warning!!!
                            </div>
                        </tr>
                    </tbody>
                </table>
        </div>

        <ModalForm
            v-if="isInfoModalVisible"
            @closeModal="closeInfoModal"
            :desks="desks"
        ></ModalForm>

        <ShowEditDesk
            v-if="isEditModalVisible"
            @closeModal="closeInfoModal"
            :desk="deskProp"
        ></ShowEditDesk>
    </div>
</template>

<script>

import ModalForm from "./ModalForm";
import ShowEditDesk from "./ShowEditDesk";
import { required, minLength } from 'vuelidate/lib/validators'

export default {

    components: {
        ShowEditDesk, ModalForm
    },
    props: [
      'deskId'
    ],
    data() {
        return {
            isInfoModalVisible: false,
            isEditModalVisible: false,
            sorting: false,
            checkedAll: false,
            desks: [],
            sort: {
                name: true,
                email: true,
                address: true,
                created_at: true,
            },
            desk: {
                id:'',
                name:'',
                email:'',
                address:'',
            },
            deskProp: null,
            errored: false,
            timestamp: new Date().getFullYear()
        }
    },
    created() {
        setInterval(this.nowDate, 1000);
    },

    computed: {
        isChecked(){
            let tmpBool = false;
            let k = 0;
            this.desks.forEach(i => {
                if(i.checked){
                    tmpBool = true;
                    k++;
                }
            });
            if(!tmpBool) this.checkedAll = false;
            this.checkedAll = (k === this.desks.length);
            return !tmpBool;
        }
    },

    methods:{
        showModal() {
            this.isInfoModalVisible = true;
        },

        closeInfoModal(){
            this.isInfoModalVisible = false;
            this.isEditModalVisible = false;
        },

        deleteDesk(id) {
            axios.delete('api/desks/'+id)
            .then(response => {
                this.desks.splice(this.desks.indexOf(this.desks.find(i => i.id === id)), 1);
            })
        },

        deleteMarked() {
            this.desks.forEach(i => {
                if(i.checked){
                    axios.delete('api/desks/'+i.id)
                        .then(response => {
                            this.desks.splice(this.desks.indexOf(this.desks.find(ifind => ifind.id === i.id)), 1);
                        })
                }
            })
        },

        editPost(desk){
            this.deskProp = desk;
            this.isEditModalVisible = true;
        },

        nowDate: function () {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            this.timestamp = dateTime;
            this.desks.forEach(i => {
                let timeCreated = "";
                let timeI = new Date(i.created_at);

                if(today.getDate() !== timeI.getDate() || today.getMonth() !== timeI.getMonth()){
                    i.timeString = timeI.getDate() + '.' + timeI.getMonth()+1 + ' ' + timeI.getHours() + ':' + timeI.getMinutes();
                } else {
                    let timediff = today.getHours() - timeI.getHours();
                    if(timediff){
                        i.timeString = timediff + " hours ago";
                    } else {
                        let timediff = today.getMinutes() - timeI.getMinutes();
                        if(timediff){
                            i.timeString = timediff + " minutes ago";
                        } else {
                            let timediff = today.getSeconds() - timeI.getSeconds();
                            if(timediff < 30){
                                i.timeString = "Just now";
                            } else {
                                i.timeString = "30 sec ago";
                            }
                        }
                    }
                }
            })
        },

        async getDesks (){
            let tmpDesk = null;
            await axios.get('api/desks')
                .then(response => {
                    tmpDesk = response.data;
                }).catch(error => {
                console.log(error)
                this.errored = true
            })
            tmpDesk.forEach(i => {
                i.checked = false;
            });
            this.desks = tmpDesk;
        },

        checkAll(checked) {
            this.checkedAll = true;
            this.desks.forEach(i => {
                i.checked = checked;
            })
        },

        sortBy(field) {
            this.desks = this.desks.sort(compare(field, this.sort[field]));
            this.sort[field] = !this.sort[field];
        },
    },

    mounted() {
        this.getDesks();
    }
}

function compare(field, isAscending = true){
    return function (a, b) {
        let type = typeof (a[field]);
        if (type === 'number')
            if (isAscending)
                return a[field] - b[field];
            else
                return b[field] - a[field];
        else {
            if (isAscending) {
                if (a[field] < b[field]) return -1;
                if (a[field] > b[field]) return 1;
                return 0;
            } else {
                if (a[field] > b[field]) return -1;
                if (a[field] < b[field]) return 1;
                return 0;
            }
        }
    }
}
</script>

<style scope>

header {
    background-color: #ff9900;
}

.select {
    border: 1px solid black;
    border-radius: 5%;
    margin-right: 25px;
    background-color: grey;
}

i {
    padding-left: 10px;
}

.fa-times {
    color: red;
}

.btn-primary.add{
    margin-left: 900px;
}

</style>


