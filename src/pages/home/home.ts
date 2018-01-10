import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  ActionSheetController,
  AlertController
} from "ionic-angular";
//import { AddPage } from "../add/add";
import { TaskProvider } from "../../providers/task/task";
import { TASKMODEL } from "../../providers/task/taskModel";
import { IDGenerator } from "../../providers/IDGenerator";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  tasks: TASKMODEL[] = [];

  constructor(
    public navCtrl: NavController,
    private taskProvider: TaskProvider,
    private model: ModalController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.navCtrl = navCtrl;
    this.taskProvider = taskProvider;
    this.tasks = [];
    this.showTask();
  }

  showTask() {
    this.taskProvider.getTask().then(data => {
      this.tasks = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.tasks.push({
            id: data[i].id,
            task: data[i].task,
            priority: data[i].priority,
            status: data[i].status
          });
        }
      }
    });
  }
  AddTask() {
    //if(Id === undefined)

    const myModel = this.model.create("AddPage");
    myModel.onDidDismiss(data => {
      this.showTask();
    });
    myModel.present();
  }

  UpdateModel(updatetask) {
    console.log("update model");
    const myModel = this.model.create("UpdatePage", { updatetask });
    myModel.onDidDismiss(data => {
      this.showTask();
    });
    myModel.present();
  }
  Deletetask(id) {
    //his.presentActionSheet();
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remove Task",
      buttons: [
        {
          text: "delete",
          role: "destructive",
          handler: () => {
            var obj = this.taskProvider.Delete(id);
            obj.then(data => {
              this.showalert();
            });
            //this.showalert();
            // var temp: TASKMODEL;
            // let obj = this.taskProvider.getTask();
            // obj.then(data => {
            //   for (let i = 0; i < data.length; i++) {
            //     if (data[i].id == id) {
            //       temp = data[i];
            //       break;
            //     }
            //   }

            //   this.tasks = data.filter(function(tt) {
            //     return tt.id != id;
            //   });
            //   this.showalert();
            // });
          }
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }

        // }
      ]
    });

    actionSheet.present();
  }

  showalert() {
    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: "Task removed",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.showTask();
          }
        }
      ]
    });
    alert.present();
  }

  doneTask(id, status) {
    this.taskProvider.DoneTask(id, status).then(data => {
      this.showalert1();
    });
  }
  showalert1() {
    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: "Task status updated",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.showTask();
          }
        }
      ]
    });
    alert.present();
  }
}
