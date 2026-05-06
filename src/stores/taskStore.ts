import { Task, TaskStatus, Priority} from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { storageService } from '@/services/storageService'

export const useTaskStore = defineStore('task', ()=> {

    const tasks = ref<Task[]>([])
    const isLoading = ref(false)
    const filterStatus = ref<TaskStatus | 'all'>('all')
    const filterPriority = ref<Priority | 'all'>('all')
    const searchQuery = ref('')

    const filteredTasks = computed(() => {
        let result = [...tasks.value]

        const applyFilters = (() => {
            const filters = []

            if(filterStatus.value !== 'all'){
                filters.push((task: Task) => task.status === filterStatus.value)
            }

            if(filterPriority.value !== 'all'){
                filters.push((task: Task) => task.priority === filterPriority.value)
            }

            if(searchQuery.value)
            {
                var query = searchQuery.value.toLowerCase()
                filters.push((task: Task)=>
                    task.title.toLowerCase().includes(query) || 
                    task.description.toLowerCase().includes(query)
                )
            }

            return (task:Task) => filters.every(filter => filter(task))
        })()

        result = result.filter(applyFilters)
        return result
    })

    const addTask = async(taskData : Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'| 'attachments'>) => {
            const newTask : Task = {
                ...taskData,
                id : uuidv4(),
                createdAt : new Date(),
                updatedAt : new Date(),
                comments : [],
                attachments: []
            }

            tasks.value.unshift(newTask)
            return newTask
        }
    
})