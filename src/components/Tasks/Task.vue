<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input
                type="checkbox"
                class="form-check-input mt-0"
                :class="completedClass"
                :checked="task.is_completed"
                @change="markTaskAsCompleted"
            />
            <div class="ms-2 flex-grow-1" :class="completedClass" title="Double click the text to edit or remove">
                <div class="relative" v-if="isEdit">
                    <input class="editable-task"
                        type="text"
                        @keyup.esc="undo"
                        @blur="undo"
                        v-focus
                        @keyup.enter="updateTask"
                        v-model="editingTask"                    
                    />
                </div>
                <span @dblclick="isEdit=true" v-else>{{ task.name }}</span>
            </div>
            <div class="task-date">24 Feb 12:00</div>
        </div>
        <TaskActions
            v-show="!isEdit"
            @edit="isEdit =true"
            @remove="removeTask"
        />
    </li>
</template>


<script setup>
import { computed, ref } from 'vue';
import TaskActions from './TaskAction.vue';

const emits = defineEmits(['updated' ,'completed', 'removed']);



const isEdit = ref(false)
const props = defineProps({
    task: Object,
});

const editingTask = ref(props.task.name);

const vFocus = {
    mounted(el){
        el.focus()
    }
};

const updateTask = event => {
    const updatedTaskPayload = {...props.task, name: event.target.value };

    isEdit.value = false;
    emits('updated', updatedTaskPayload);
}
const completedClass = computed(() => props.task.is_completed ? 'completed' : '');

const undo = () => {
    isEdit.value=false;
    editingTask.value = props.task.name;
};

const markTaskAsCompleted = () => {
    const updatedTaskPayload = { ...props.task, is_completed: !props.task.is_completed};
    emits('completed', updatedTaskPayload);
}

const removeTask = () =>{
    if (confirm('Are you sure you want to delete this task?')) {
        emits('removed', props.task);
    }
}
</script>