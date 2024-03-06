import { TaskRepository } from '../repositories/task-repository.js';

export class DeleteTask {
    #taskRepository;

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute(id){     
        this.#taskRepository.delete(id);
    }
}