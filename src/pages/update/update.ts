import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { TaskProvider } from "../../providers/task/task";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-update",
  templateUrl: "update.html"
})
export class UpdatePage {
  task: string;
  priority: string;
  updateobj;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private alertCtrl: AlertController,
    public taskprovider: TaskProvider
  ) {
    this.updateobj = this.navParams.get("updatetask");
    console.dir(this.updateobj);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UpdatePage");
  }

  updateTask() {
    this.taskprovider
      .UpdateTask(
        this.updateobj.id,
        this.updateobj.task,
        this.updateobj.priority,
        this.updateobj.status
      )
      .then(data => {
        this.showalert();
      });
  }
  showalert() {
    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: "Task Updated",
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
  }

  closeModel() {
    this.view.dismiss();
  }
}
