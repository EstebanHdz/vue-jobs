<script>
    export default {
        data(){
            return {
                name: "Esteban  Hdz",
                status: "active",
                tasks: [
                    "task1",
                    "task2",
                    "task3"
                ],
                link:"https://www.google.com"
            }
        },

        methods:{
            toggleStatus(){
                if(this.status === "active") {
                    this.status = "pending"
                }else if(this.status === "pending"){
                     this.status = "inactive"
                }
                else{
                    this.status = "active"
                }
            }  
        }
    }
</script>

<template>
    <h1>VUE JOBS</h1>
    <h2>{{ name }}</h2>
    <p v-if="status === 'active'">User is Active!</p>
    <p v-else-if="status === 'pending'">User is Pending!</p>
    <p v-else="status">User is Inactive...</p>
    
    <h3>Tasks:</h3>
    <ul>
        <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>

    <a v-bind:href="link">Click fot Google</a>
    <a :href="link">Click fot Google</a>


    <button v-on:click="toggleStatus">Change Status</button>
</template>

<style scoped>

</style>
