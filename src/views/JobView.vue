<script setup>
    import { defineProps, computed, reactive, onMounted } from 'vue';
    import { supabase } from '../lib/supabaseClient'
    import NotFoundView from './NotFoundView.vue';
    import BackButton from "@/components/BackButton.vue"
    import { useRoute, RouterLink, useRouter } from 'vue-router';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { useToast } from 'vue-toastification';
    import axios from 'axios';

    const route = useRoute();
    const router = useRouter()

    const toast = useToast()

    const jobId = route.params.id

    const state = reactive({
        job: null,
        isLoading: true
    })


    const deleteJob = async() => {
        /*try {
            const confirm = window.confirm("Are you sure you want to deelte this job?")

            if(!confirm) return 
            
            //await axios.delete(`/api/jobs/${jobId}` )

            const {data, error} = await supabase
                                    .from('job')
                                    .delete()
                                    .eq('id', jobId)

            toast.success("Job Deleted Succesfully!")
            router.push("/jobs")
        } catch (error) {
            toast.error("Error deleting job...")
            console.log("Error fetching job: ",  error);
        }*/
        const confirm = window.confirm("Are you sure you want to deelte this job?")

        if(!confirm) return 
        
        //await axios.delete(`/api/jobs/${jobId}` )

        const {data, error} = await supabase
                                .from('job')
                                .delete()
                                .eq('id', jobId)


        if(!error){                        
            toast.success("Job Deleted Succesfully!")
            router.push("/jobs")
        }else{
            toast.error("Error deleting job...")
            console.log("Error fetching job: ",  error);
        }
        
    }

    /*onMounted( () => {
        setTimeout(async () => {
            try {
                const response = await axios.get(`/api/jobs/${jobId}` )
                //jobs.value = response.data
                state.job = response.data
            } catch (error) {
                console.log("Error fetching job: ",  error);
            }finally{
                state.isLoading = false
            }
        }, 1000) 
    })*/

    onMounted(  () => {
        setTimeout(async () => {
            const { data } = await supabase.from('job').select().eq("id", jobId).single()
            console.log(data);
            state.job = data
            state.isLoading = false
        }, 1000)
   })
</script>

<template>
    <BackButton />
    <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader/>
    </div>
    <div v-else-if="!state.job" class="text-center text-gray-500 py-6">
        <NotFoundView :title="'Job Not Found'" :subtitle="'Try searching fo another job'"/>
    </div>
    <section v-else  class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
                            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
                            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
                                <p class="text-orange-700">{{ state.job.location }}</p>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p class="mb-4">
                            {{ state.job.description }}
                        </p>

                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

                        <p class="mb-4">{{ state.job.salary }} / Year</p>
                    </div>
                </main>

            <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">{{ state.job.company_name }}</h2>

                        <p class="my-2">
                            {{ state.job.company_description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">
                            {{ state.job.contact_email }}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.contact_phone }}</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink
                            :to="`/jobs/${state.job.id}/edit`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                            >Edit Job</RouterLink
                        >
                        <button 
                            @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>