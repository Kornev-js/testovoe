<template>
    <div>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span class="fs-4">Cool Project Name</span>
                <span class="fs-4 ml-4">Current Date</span>
            </a>

            <div class="dropdown ms-3 select">
                <button class="btn btn-bd-light dropdown-toggle" id="bd-versions" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    <span class="d-none d-lg-inline">Your Name</span>
                </button>

            </div>
        </header>
    </div>
        <div >
            <p>Contacts</p>
            <div class="modal-dialog modal-dialog-centered">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" @click="showModal = true">
                    Add contact
                </button>
            </div>

        </div>
<div class="container">
        <table class="table">
            <thead>

            <tr>
                <th scope="col"><input type="checkbox"></th>

                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Created</th>
                <i class="fas fa-ellipsis-v"></i>
            </tr>



            </thead>
            <tbody v-for="desk in desks">
            <tr >
<!--                <td><i class="far fa-times-circle"></i></td>-->

                <th scope="col"><input type="checkbox"></th>
                <th scope="row">{{desk.name}}</th>
                <td>{{desk.email}}</td>
                <td>{{desk.address}}</td>
                <td>{{desk.created_at}}</td>
                <i class="fas fa-ellipsis-v"></i>
            </tr>

            </tbody>
        </table>
</div>
    </div>
</template>

<script>
export default {
 data() {
     return {
         desks: []
     }
 },
    mounted(){

     axios.get('api/desks')
        .then(response => {
            console.log(response)
            this.desks = response.data
            console.log(this.desks)
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

</style>


