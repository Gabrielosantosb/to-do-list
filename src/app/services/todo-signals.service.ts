import {Injectable, signal} from '@angular/core';
import {Task} from "../models/model/todo-model";
import {TodoKeyLocalStorage} from "../models/enum/todoKeyLocalStorage";

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  public taskState = signal<Array<Task>>([]);

  public updateTask({id, title, description, done}: Task): void {
      if(title && id && description !== null || undefined){
        this.taskState.mutate((tasks)=>{
          if(tasks !== null) tasks.push(new Task(id, title,description,done))
        })
        this.saveTaskLocalStorage()
      }
  }

  public saveTaskLocalStorage():void{
    const tasks = JSON.stringify(this.taskState())
    tasks && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, tasks)
  }
}
