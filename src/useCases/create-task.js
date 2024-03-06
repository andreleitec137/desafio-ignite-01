import { randomUUID } from 'crypto';
import { TaskRepository } from '../repositories/task-repository.js';

export class CreateTask {
    #taskRepository;

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute({ title, description}){
        const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.#taskRepository.create(task);
    }
}