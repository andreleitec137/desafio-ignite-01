import { TaskRepository } from '../repositories/task-repository.js';

export class CompleteTask {
    #taskRepository;

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute(task){     
        if(task.completed_at === null){
            task.completed_at = new Date();
            task.updated_at = new Date();
            return this.#taskRepository.update(task.id, task);
        } 

        task.completed_at = null;
        task.updated_at = new Date();
        return this.#taskRepository.update(task.id, task);
    }
}