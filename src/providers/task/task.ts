//import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { TASKMODEL } from "./taskModel";
/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
  task: TASKMODEL[] = [];

  private static TASKDB: string = "TASK";

  constructor(private storage: Storage) {
    console.log("Hello TaskProvider Provider");
    //this.task.shift();
    // var x = this.storage.set(TaskProvider.IDDB, 1);
    // x.then(data => {
    //   var val = this.storage.get(TaskProvider.IDDB);
    //   var temp;
    //   val.then(data => {
    //     temp = data;
    //   });
    //   console.log("first id is set" + temp);
    // });
  }

  getTask(): Promise<TASKMODEL[]> {
    // if(id === undefined){
    let obj = this.storage.get(TaskProvider.TASKDB);

    let taskpromise: Promise<any> = this.storage.get(TaskProvider.TASKDB);
    return taskpromise;
    //}
    //else{
    // let taskpromise:Promise<any> = this.storage.get(TaskProvider.TASKDB);

    //}
  }

  saveTask(item: TASKMODEL) {
    this.task.length = 0;
    let obj = this.storage.get(TaskProvider.TASKDB);
    return obj.then(data => {
      for (let i = 0; i < data.length; i++) {
        this.task.push({
          id: data[i].id,
          task: data[i].task,
          priority: data[i].priority,
          status: data[i].status,
          isdone: data[i].isdone
        });
      }
      this.task.push({
        id: item.id,
        task: item.task,
        priority: item.priority,
        status: item.status,
        isdone: item.isdone
      });

      var ss = this.storage.set(TaskProvider.TASKDB, this.task);
      return ss;
    });
    // this.task.push(item);
    // let save = this.storage.set(TaskProvider.TASKDB, this.task);
    // return save;
  }

  Delete(id): Promise<any> {
    console.log("id to be deleted " + id);
    // var k: TASKMODEL[] = [];
    let temp: TASKMODEL;
    let count: number = 0;
    let k: TASKMODEL[] = [];
    this.task.length = 0;
    let obj = this.storage.get(TaskProvider.TASKDB);

    return obj.then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) continue;
        else {
          console.log("pushing");
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: data[i].isdone
          });
          //    console.log(k.length);
        }
      }
      console.log("length after deletion " + this.task.length);
      var ss = this.storage.set(TaskProvider.TASKDB, this.task);
      return ss;
    });
    // return ret;
  }

  UpdateTask(
    Id: number,
    Task: string,
    Priority: string,
    Status: string,
    isDone: boolean
  ): Promise<any> {
    this.task.length = 0;
    let obj = this.storage.get(TaskProvider.TASKDB);

    return obj.then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == Id) {
          if (data[i].status == "done") Status = "pending";
          this.task.push({
            id: Id,
            task: Task,
            priority: Priority,
            status: Status,
            isdone: isDone
          });
        } else {
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: data[i].isdone
          });
        }
      }
      var ss = this.storage.set(TaskProvider.TASKDB, this.task);
      return ss;
    });
  }

  DoneTask(id: number, status: string) {
    this.task.length = 0;
    let obj = this.storage.get(TaskProvider.TASKDB);

    return obj.then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          if (data[i].status == "pending") data[i].status = "done";
          else data[i].status = "pending";
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: data[i].isdone
          });
        } else {
          //console.log("pushing");
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: data[i].isdone
          });
          // console.log(k.length);
        }
      }
      //console.log("length after deletion " + this.task.length);
      var ss = this.storage.set(TaskProvider.TASKDB, this.task);
      return ss;
    });
  }
  ToggleConnectivity(id) {
    this.task.length = 0;
    let obj = this.storage.get(TaskProvider.TASKDB);

    return obj.then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          var temp: boolean;
          if (data[i].isdone == true) {
            temp = false;
          } else {
            temp = true;
          }
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: temp
          });
        } else {
          console.log("pushing");
          this.task.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status,
            isdone: data[i].isdone
          });
          //    console.log(k.length);
        }
      }
      console.log("length after deletion " + this.task.length);
      var ss = this.storage.set(TaskProvider.TASKDB, this.task);
      return ss;
    });
  }
}
