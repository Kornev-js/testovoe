<template>
    <div class="row text-white">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom ml-10">
            <a href="/"
               class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4 ">Cool Project Name  -  </span>
                <span class="fs-4 pl-4">{{ timestamp }}</span>
            </a>

            <div class="dropdown ms-3 ">
                <button class="btn btn-secondary dropdown-toggle select" id="bd-versions" aria-expanded="false"
                        data-bs-display="static">
                    <i class="far fa-user-circle"></i>
                    <span class="d-none d-lg-inline">Your Name</span>
                </button>

            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    data() {
        return {
            timestamp: new Date().getFullYear()
        }
    },

    created() {
        setInterval(this.nowDate, 1000);
    },

    methods:{

        nowDate: function () {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            this.timestamp = dateTime;
        },
    },
}
</script>

<style scoped>
.text-white {
    background-color: #ff9900;
    padding-bottom: 3px;
}

.select {
    border: 1px solid black;
    border-radius: 5%;
    margin-right: 25px;
    background-color: #7f4c00;
}
.fs-4 {
    margin-left: 10px;
}
.fa-user-circle {
    margin-right: 5px;
}
</style>
