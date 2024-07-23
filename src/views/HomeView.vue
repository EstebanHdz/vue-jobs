<script setup>
    import Hero from "@/components/Hero.vue"    
    import HomeCards from "@/components/HomeCards.vue"
    import JobListings from "@/components/JobListings.vue"
</script>

<template>
    <Hero />
    <HomeCards />
    <JobListings :limit="2" :show-button="true"/>
    <h1 class="text-2xl">VUE JOBS</h1>
</template>