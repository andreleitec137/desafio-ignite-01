import { TaskRepository } from '../repositories/task-repository.js';

export class GetTaskById {
    #taskRepository

    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    execute(id){
        const task = this.#taskRepository.getById(id);

        if(!task) return false;

        const taskParsed = JSON.parse(task);

        return taskParsed[0];
    }
}