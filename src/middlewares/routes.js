import { randomUUID } from 'crypto';
import { Database } from "./database.js";
import { buildRoutePath } from '../utils/build-route-path.js';
import { CreateTask } from '../useCases/create-task.js';
import { GetAllTasks } from '../useCases/get-all-tasks.js';
import { UpdateTask } from '../useCases/update-task.js';
import { GetTaskById } from '../useCases/get-task-by-id.js';
import { DeleteTask } from '../useCases/delete-task.js';
import { CompleteTask } from '../useCases/complete-task.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            
            const getAllTasks = new GetAllTasks(database)
         
            return res.end(getAllTasks.execute(search));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if(!title || !description){
                return res.writeHead(400)
            }

            const createTask = new CreateTask(database)
            
            createTask.execute({ title, description })
           
            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            const deleteTask = new DeleteTask(database);
            const getTaskById = new GetTaskById(database);

            const taskToDelete = getTaskById.execute(id);
            
            if(!taskToDelete){
                return res.writeHead(400).end(JSON.stringify({
                    error: "Task not found"
                }))
            }

            deleteTask.execute(id);

            return res.writeHead(204).end()

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body

            const updateTask = new UpdateTask(database);
            const getTaskById = new GetTaskById(database);

            const taskToUpdated = getTaskById.execute(id);
            if(!taskToUpdated){
                return res.writeHead(400).end(JSON.stringify({
                    error: "Task not found"
                }))
            }

            const response = updateTask.execute(taskToUpdated, { title, description });

            return res.writeHead(200).end(JSON.stringify(response))
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;

            const completeTask = new CompleteTask(database);
            const getTaskById = new GetTaskById(database);

            const taskToComplete = getTaskById.execute(id);
            if(!taskToComplete){
                return res.writeHead(400).end(JSON.stringify({
                    error: "Task not found"
                }))
            }

            const response = completeTask.execute(taskToComplete);

            return res.writeHead(200).end(JSON.stringify(response))
        }
    }
]