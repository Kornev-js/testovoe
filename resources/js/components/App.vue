<template>
    <div>
<!--        //TODO: separate content to specific components :DONE-->
<!--        //TODO: make component with site header :DONE-->
        <the-header/>
<!--        //TODO: todo component with main content :DONE-->
        <the-main/>
    </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheMain from "./TheMain";


export default {

    components: {
        TheHeader, TheMain
    },
}
</script>

<style scope>

</style>


