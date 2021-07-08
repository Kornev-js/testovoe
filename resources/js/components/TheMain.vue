<template>
    <div>
        <div class="container ">
            <p>Contacts</p>

            <button type="button" class="btn btn-primary add" @click="showModal">
                <i class="fas fa-plus-circle"></i>
                Add contact
            </button>
            <button type="button" class="btn btn-danger del" :disabled="isChecked" @click="deleteMarked">
                <i class="far fa-times-circle"></i>
                Delete marked
            </button>
        </div>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <!--                    //TODO: todo remove unnecessary inputs :DONE-->
                    <!--                    //TODO: todo make pretty sorting-->
                    <th scope="col">
                        <input type="checkbox" class="checkall" :checked="checkedAll"
                                           @change="checkAll($event.target.checked)"></th>
                    <th></th>
                    <th>
                        <div
                               @click="sortBy('name')"
                               style="cursor: pointer">
                            Name
                            <i class="fas fa-sort"></i>
                        </div>
                    </th>
                    <th>
                        <div
                               @click="sortBy('email')"
                               style="cursor: pointer">

                            Email
                            <i class="fas fa-sort"></i>
                        </div>
                    </th>
                    <th>
                        <div
                               @click="sortBy('address')"
                               style="cursor: pointer">
                            Address
                            <i class="fas fa-sort"></i>
                        </div>
                    </th>
                    <th>
                        <div
                               @click="sortBy('created_at')"
                               style="cursor: pointer">
                            Created
                            <i class="fas fa-sort"></i>
                        </div>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <!--                //TODO: todo repeat tr instead of body :DONE-->
                <tbody>
                    <tr v-for="desk in desks">
                        <!--                    //TODO: clean up tags :DONE-->
                        <!--       <i class="far fa-times-circle"></i>         -->

                        <td scope="col">
                            <input
                                type="checkbox"
                                class="thing"
                                v-on:click="desk.checked = !desk.checked" :checked="desk.checked"
                            ></td>
                        <td><i class="far fa-window-close"></i></td>
                        <td scope="row"><a href="#">{{ desk.name }}</a></td>

                        <td>{{ desk.email }}</td>
                        <td>{{ desk.address }}</td>
                        <!--                    //TODO: todo check tables styling rules :DONE-->
                        <td style="width: 150px">
                            {{ desk.timeString }}
                        </td>
                        <td>
                            <!--                        //TODO: todo make a separated component for dropdown :DONE-->
                            <the-dropdown
                                :desk="desk"
                                @viewDesk="editPost(desk)"
                                @deleteDesk="deleteDesk(desk.id)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalForm
            v-if="isModalVisible"
            @closeModal="closeInfoModal"
            :desks="desks"
            :desk="deskProp"
        ></ModalForm>

<!--        <ShowEditDesk-->
<!--            v-if="isEditModalVisible"-->
<!--            @closeModal="closeInfoModal"-->
<!--            :desk="deskProp"-->
<!--        ></ShowEditDesk>-->
    </div>
</template>

<script>
import TheHeader from "./TheHeader";
import ModalForm from "./ModalForm";
import moment from "moment";
import {required, minLength} from 'vuelidate/lib/validators'
import TheDropdown from "./TheDropdown";

export default {
    components: {
        ModalForm, TheHeader, TheDropdown
    },
    name: "TheMain",
    data() {
        return {
            isModalVisible: false,
            checkedAll: false,
            desks: [],
            sort: {
                name: true,
                email: true,
                address: true,
                created_at: true,
            },
            desk: {
                id: '',
                name: '',
                email: '',
                address: '',
                timeString: '',
            },
            deskProp: null,
            errored: false,
        }
    },

    computed: {
        isChecked() {
            let tmpBool = false;
            let k = 0;
            this.desks.forEach(i => {
                if (i.checked) {
                    tmpBool = true;
                    k++;
                }
            });
            if (!tmpBool) this.checkedAll = false;
            this.checkedAll = (k === this.desks.length);
            return !tmpBool;
        }
    },

    methods: {
        showModal() {
            this.isModalVisible = true;
        },

        closeInfoModal() {
            this.isModalVisible = false;
            this.deskProp = null;
        },

        deleteDesk(id) {
            axios.delete('api/desks/' + id)
                .then(response => {
                    this.desks.splice(this.desks.indexOf(this.desks.find(i => i.id === id)), 1);
                })
        },

        deleteMarked() {
            this.desks.forEach(i => {
                if (i.checked) {
                    axios.delete('api/desks/' + i.id)
                        .then(response => {
                        })
                }
                // this.desks.splice(this.desks.indexOf(this.desks.find(ifind => ifind.id === i.id)), 1);
            })

            this.desks = this.desks.filter(i => i.checked === false);
        },

        editPost(desk) {
            this.deskProp = desk;
            this.isModalVisible = true;
        },

        nowDateDesks() {
            this.desks.forEach(i => {
                i.timeString = moment(i.created_at).fromNow();
            })
        },

        async getDesks() {
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
                i.timeString = moment(i.created_at).fromNow();
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
    },

    created() {
        setInterval(this.nowDateDesks, 1000);
    },
}

function compare(field, isAscending = true) {
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
<style scoped>
i {
    padding-left: 10px;
}

.btn-primary.add {
    margin-left: 900px;
}

.far,
.fas {
    margin-right: 7px;
}

.fa-sort {
    padding-left: 50px;
}
</style>
