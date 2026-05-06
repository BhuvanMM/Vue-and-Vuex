export interface Task{
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: Priority,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    tags : string[],
    subtasks : SubTask[],
    attachments: Attachment[],
    comments: Comment[]
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export interface SubTask{
    id: string,
    title: string,
    completed: boolean
}

export interface Attachment{
    id: string,
    fileName: string,
    fileType: string,
    fileSize: number,
    url: string
}

export interface Comment{
    id: string,
    userId: string,
    userName: string,
    content: string,
    createdAt: Date
}

export interface User{
    id: string,
    name: string,
    email: string,
    avatarUrl?: string
    preferences: UserPreferences
}

export interface UserPreferences{
    theme: 'light' | 'dark',
    notifications: boolean,
    taskview: 'list' | 'grid' | 'kanban'
}

export interface Notification{
    id: string,
    type: 'info' | 'warning' | 'error',
    message: string,
    timestamp: Date,
    duration?: number
}
