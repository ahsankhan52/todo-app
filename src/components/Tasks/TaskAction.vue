<template>
    <div class="task-actions">
        <button class="btn btn-sm btn-circle btn-outline-secondary me-1" @click="$emit('edit')">
            <IconPencil />
        </button>
        <button class="btn btn-sm btn-circle btn-outline-danger" @click="$emit('remove')">
            <IconTrash />
        </button>
    </div>
</template>

<script setup>
import IconPencil from '../icons/IconPencil.vue';
import IconTrash from '../icons/IconTrash.vue';

const emits = defineEmits(['edit', 'remove']);
</script>