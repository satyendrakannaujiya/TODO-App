import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { TaskProvider } from "../../providers/task/task";
import { HomePage } from "../home/home";
import { TASKMODEL } from "../../providers/task/taskModel";
import { AlertController } from "ionic-angular";
import { IDGenerator } from "../../providers/IDGenerator";
import { IdgeneraterProvider } from "../../providers/idgenerater/idgenerater";
@IonicPage()
@Component({
  selector: "page-add",
  templateUrl: "add.html"
})
export class AddPage {
  task: string;
  priority: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private taskProvider: TaskProvider,
    private alertCtrl: AlertController,
    private view: ViewController,
    private idgenerater: IdgeneraterProvider
  ) {
    this.priority = "normal";
    // let editTask = this.navParams.get("updatetask");
    // if (editTask != undefined) {
    //   this.task = editTask.task;
    //   this.priority = editTask.priority;
    //}
  }
  // }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPage");
  }
  SaveTask() {
    if (this.task === undefined) {
      this.showalert();
    } else {
      this.idgenerater.getnewId().then(data => {
        if (data === undefined) {
          data = 1;
        }
        let newItem1: TASKMODEL = {
          id: data,
          task: this.task,
          priority: this.priority,
          status: "pending"
        };
        console.log("addes item id is " + newItem1.id);
        this.idgenerater.setId(data + 1).then(data => {
          console.log("id set " + data);
        });
        console.log(newItem1.id);
        this.taskProvider.saveTask(newItem1).then(data => {
          let alert = this.alertCtrl.create({
            title: "sucess",
            subTitle: "Task Added",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.closeModel();
                }
              }
            ]
          });
          alert.present();
        });
      });
      // let newItem: TASKMODEL = {
      //   id: IDGenerator.id++,
      //   task: this.task,
      //   priority: this.priority,
      //   status: "pending"
      // };

      // this.taskProvider.saveTask(newItem).then(data => {
      //   let alert = this.alertCtrl.create({
      //     title: "sucess",
      //     subTitle: "Task Added",
      //     buttons: [
      //       {
      //         text: "OK",
      //         handler: () => {
      //           this.closeModel();
      //         }
      //       }
      //     ]
      //   });
      //   alert.present();
      // });
    }
  }
  closeModel() {
    this.view.dismiss();
  }
  showalert() {
    let alert = this.alertCtrl.create({
      title: "warning",
      subTitle: "Enter task",
      buttons: ["OK"]
    });
    alert.present();
  }
}
