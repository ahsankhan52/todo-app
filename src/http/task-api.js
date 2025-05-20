import api from './api.js';

const resource = '/tasks';

export const allTasks = () => api.get(resource)

export const createTask = task => api.post(resource, task)

export const deleteTask = id => api.delete(`${resource}/${id}`)

export const getTask = id => api.get(`${resource}/${id}`)

export const updateTask = (id, task) => api.put(`${resource}/${id}`, task)

export const completeTask = (id, task) => api.patch(`${resource}/${id}/complete`, task)