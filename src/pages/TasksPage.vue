<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask" />

                    <!-- List of Uncompleted tasks -->
                    <Tasks
                        :tasks="uncompletedTasks"
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @removed="handleRemovedTask"
                    />

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
                    <Tasks
                        :tasks="completedTasks"
                        :show="completedTasksIsVisible && showCompletedTasks"
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @removed="handleRemovedTask"
                    />

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { createTask, updateTask, completeTask, deleteTask } from '../http/task-api';

import { storeToRefs } from 'pinia';
import { useTaskStore } from '../store/task';

import Tasks from '../components/Tasks/Tasks.vue';
import NewTask from '../components/Tasks/NewTask.vue';

// const tasks = ref([]);
const store = useTaskStore();

const { completedTasks, uncompletedTasks } = storeToRefs(store)
const { fetchAllTasks } = store



onMounted (async () => {
    await fetchAllTasks();
});


const completedTasksIsVisible = computed(() => 
    uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);
const showToggleCompletedBtn = computed(() => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0);

const showCompletedTasks = ref(false);

const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    });

    const currentTask = tasks.value.find(item => item.id === task.id);
    currentTask.name = updatedTask.data.name;

}

const handleAddedTask = async (task) => {
    const { data : addedTask } = await createTask(task);
    tasks.value.unshift(addedTask.data)
}

const handleCompletedTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    });

    const currentTask = tasks.value.find(item => item.id === task.id);
    currentTask.is_completed = updatedTask.data.is_completed;
}

const handleRemovedTask = async (task) => {
    await deleteTask(task.id);

    // tasks.value = tasks.value.filter(item => item.id !== task.id); OR 2 lines below
    const index = tasks.value.findIndex(item => item.id === task.id);
    tasks.value.splice(index, 1);
}
</script>