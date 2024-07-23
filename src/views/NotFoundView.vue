<script setup>
    import { RouterLink } from "vue-router"
    import { defineProps, computed, reactive, onMounted } from 'vue';

    const props = defineProps({
        title:{
            type: String,
            default: "404 Not Found"
        },
        subtitle:{
            type: String,
            default: "This page does not exist"
        }
    })
    
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
        <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
        <h1 class="text-6xl font-bold mb-4">{{ props.title }}</h1>
        <p class="text-xl mb-5">{{ props.subtitle }}</p>
        <RouterLink
            to="/"
            class="text-white bg-green-700 hover:bg-green-900 rounded-md px-3 py-2 mt-4"
        >
            Go Back
        </RouterLink>
    </section>
</template>