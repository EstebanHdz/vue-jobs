<script setup>
    import {ref, reactive, defineProps, onMounted} from "vue"
    import { supabase } from '../lib/supabaseClient'
    import { RouterLink } from "vue-router";
    import axios from "axios";
    import PulseLoader from "vue-spinner/src/PulseLoader.vue"
    import JobListing from "@/components/JobListing.vue"

    defineProps({
        limit: Number,
        showButton: {
            type: Boolean,
            default: false
        }
    })

    //const jobs = ref([])
    const state = reactive({
        jobs: [],
        isLoading: true
    })

    /*onMounted( () => {
        setTimeout(async () => {
            try {
                const response = await axios.get("/api/jobs")
                //jobs.value = response.data
                state.jobs = response.data
            } catch (error) {
                console.log("Error fetching jobs: ",  error);
            }finally{
                state.isLoading = false
            }
        }, 1000) 
    })*/

   onMounted(  () => {
        setTimeout(async () => {
            const { data } = await supabase.from('job').select()
            console.log(data);
            state.jobs = data
            state.isLoading = false
        }, 1000)
   })
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>

            <!--SHOW LOADING SPINNER WHILE LOADING-->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader/>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job"/>
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
            to="/jobs"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        > View All Jobs</RouterLink>
    </section>

   
</template>