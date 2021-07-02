<template>
    <div>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span class="fs-4">Cool Project Name</span>
                <span class="fs-4 ml-4">Current Date</span>
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


        </div>
<div class="container">
        <table class="table">
            <thead>

            <tr>
                <th scope="col"><input type="checkbox" class="checkall"></th>

                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Created</th>

            </tr>



            </thead>



            <tbody v-for="desk in desks">
            <tr >
<!--       <i class="far fa-times-circle"></i>         -->

                <th scope="col"><input type="checkbox" class="thing"><td></td>
                <th scope="row"> <i class="far fa-times-circle"></i> {{desk.name}}</th>
                <td>{{desk.email}}</td>
                <td>{{desk.address}}</td>
                <td>
                    {{desk.created_at}}
                    <div class="btn-group dropend">
                    <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu" style="">
                        <li><a class="dropdown-item" href="#" @click="showEdit"><i class="fas fa-align-justify"></i>View</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-times "></i>Delete</a></li>

                    </ul>
                </div>
                </td>

                <div class="alert alert-warning" role="alert" v-if="errored">
                    Warning!!!
                </div>


<!--                <ShowEditDesk>-->
<!--                    v-if="isEditModalVisible"-->
<!--                    @closeModal="closeInfoModal"-->
<!--                </ShowEditDesk>-->

            </tr>

            </tbody>

        </table>
</div>

        <ModalForm
            v-if="isInfoModalVisible"
            @closeModal="closeInfoModal"
        ></ModalForm>




    </div>
</template>

<script>

import ModalForm from "./ModalForm";
import ShowEditDesk from "./ShowEditDesk";

export default {

    components: {
        ShowEditDesk,
      ModalForm
    },
    props: [
      'deskId'
    ],
 data() {
     return {
         isInfoModalVisible: false,
         isEditModalVisible: false,
         desks: [],
         errored: false
     }
 },
    methods:{
      showModal() {
          this.isInfoModalVisible = true
      },
        closeInfoModal(){
            this.isInfoModalVisible = false
        },
        showEdit() {
          this.isEditModalVisible = true
        }

    },




    mounted(){

     axios.get('api/desks')
        .then(response => {
            this.desks = response.data

        }).catch(error => {
            console.log(error)
         this.errored = true
     })

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


