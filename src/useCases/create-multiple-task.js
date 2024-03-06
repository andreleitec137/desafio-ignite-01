import { TaskRepository } from '../repositories/task-repository.js';
import assert from 'node:assert';
import { parse } from 'csv-parse';
import fs from 'node:fs/promises'

export class CreateMultipleTask {
    #taskRepository;
    #file;
    constructor(database){
        this.#taskRepository = new TaskRepository(database)
    }

    async execute(){
     
        let count = 0;
        process.stdout.write('Iniciando leitura do CSV\n');
      
        const filePath = new URL('../tasks.csv', import.meta.url);
        
        
        await fs.readFile(filePath, 'utf8').then(data =>{
          const parser = parse(data);
          this.#file = parser;
        }) .catch((error) => {
          console.log('Not Found', error)
        })

        process.stdout.write('Iniciando processo de importação\n');
        let isFirstLine = true;

        for await (const record of this.#file) {
            
            if(isFirstLine){
                isFirstLine = false;
                continue;
            }

            await fetch('http://localhost:3333/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: record[0],
                    description: record[1]
                })
               
            }).then( response => {
                return response.text()
            }).then( data => {
                console.log(data)
            })

            process.stdout.write(`Inserindo task: ${record[0]}`);

            
        }
          
    }
}