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
  name = "hammer";
  colors = "primary";
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
      if (data == null) {
        console.log(typeof data);
        console.log(data);
      } else {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.tasks.push({
              id: data[i].id,
              task: data[i].task,
              priority: data[i].priority,
              status: data[i].status,
              isdone: data[i].isdone
            });
          }
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

  toggle(el) {
    if (el.className != "notDone") {
      el.src = "assets/imgs/checked.svg";
      el.className = "Done";
    } else if (el.className == "Done") {
      el.src = "assets/imgs/update-arrow.svg";
      el.className = "notDone";
    }

    return false;
  }
  toogleicon() {
    if (this.name == "hammer") {
      this.name = "checkmark-circle";
      this.colors = "secondary";
    } else {
      this.name = "hammer";
      this.colors = "primary";
    }
  }
  toggleConnectivity(id) {
    this.taskProvider.ToggleConnectivity(id).then(data => {
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
      //    this.showTask();
    });
  }
}
