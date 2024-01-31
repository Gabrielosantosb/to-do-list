import {Component, computed, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {TodoSignalsService} from "../../services/todo-signals.service";
import {TodoKeyLocalStorage} from "../../models/enum/todoKeyLocalStorage";
import {Task} from "../../models/model/todo-model";


@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService)
  private todosSignal = this.todoSignalsService.taskState
  public taskList = computed(() => this.todosSignal())

  ngOnInit(): void {
    this.getTaskLocalStorage()
    console.log('Lista', this.taskList)
  }

  public handleDoneTask(task_id: number) {
    if (task_id) {
      this.todosSignal.mutate((tasks) => {
        const taskSelected = tasks.find((task) => task?.id === task_id) as Task
        taskSelected && (taskSelected.done = true)

      })

    }
  }

  public handleDeleteTask(task: Task) {
    if (task) {
      const index = this.taskList().indexOf(task)

      if (index !== -1) {
        this.todosSignal.mutate((tasks) => {
          tasks.splice(index, 1);
          this.saveTasksLocalStorage()
        })
      }
    }
  }

  private saveTasksLocalStorage() {
    this.todoSignalsService.saveTaskLocalStorage()
  }

  private getTaskLocalStorage() {
    const taskData = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST)
    taskData && (this.todosSignal.set(JSON.parse(taskData)))
  }



}
