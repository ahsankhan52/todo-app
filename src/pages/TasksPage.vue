<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List of Uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- Toggle completed/incompleted tasks -->
                     <div class="text-center my-3" v-if="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="showCompletedTasks">
                                Hide completed</span>
                            <span v-else>
                                Show completed</span>
                        </button>
                     </div>

                    <!-- List of Completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks"/>

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useTaskStore } from '../store/task';

import Tasks from '../components/Tasks/Tasks.vue';
import NewTask from '../components/Tasks/NewTask.vue';

// const tasks = ref([]);
const store = useTaskStore();

const { tasks, completedTasks, uncompletedTasks } = storeToRefs(store)
const { fetchAllTasks } = store



onMounted (async () => {
    await fetchAllTasks();
});


const completedTasksIsVisible = computed(() => 
    uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);
const showToggleCompletedBtn = computed(() => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0);

const showCompletedTasks = ref(false);
</script>