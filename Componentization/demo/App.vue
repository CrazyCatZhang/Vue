<template>
    <div>
		    <HelloT></HelloT>
		    <hr>
        <School></School>
    </div>
</template>

<script>
import School from "./component/School.Vue";
import HelloT from "./component/HelloT";

export default {
		components: {
				School,
				HelloT
		},
}
</script>

<style scoped>

</style>