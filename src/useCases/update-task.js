import { TaskRepository } from '../repositories/task-repository.js';

export class UpdateTask {
    #taskRepository;
    #hasChanged = false;

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute(task, { title, description}){     
        if(title){
            task.title = title;
            this.#hasChanged = true;
        } 

        if(description){
            task.description = description;
            this.#hasChanged = true;
        } 

        if(this.#hasChanged) task.updated_at = new Date();

        this.#taskRepository.update(task.id, task);
    }
}