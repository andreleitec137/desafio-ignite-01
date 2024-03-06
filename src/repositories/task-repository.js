export class TaskRepository {
    #database; 
    #table = 'task';

    constructor(database){
        this.#database = database;
    }
    
    create(data){
        this.#database.insert(this.#table, data)
    }

    update(id, data){
        this.#database.update(this.#table, id, data)
    }

    delete(id){
        this.#database.delete(this.#table, id)
    }

    getAll(search){
        const tasks = this.#database.select(this.#table, search ? {
            title: search,
            description: search
        } : null)

        return JSON.stringify(tasks);
    }

    getById(id){
        const task = this.#database.selectStrict(this.#table, {
            id: id,
        })

        if(task == undefined || task.length === 0) return false;

        return JSON.stringify(task);
    }
}