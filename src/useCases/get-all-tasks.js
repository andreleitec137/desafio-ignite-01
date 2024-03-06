import { TaskRepository } from '../repositories/task-repository.js';

export class GetAllTasks {
    #taskRepository

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute(search){
        return this.#taskRepository.getAll(search);
    }
}