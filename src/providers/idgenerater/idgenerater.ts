//import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
/*
  Generated class for the IdgeneraterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IdgeneraterProvider {
  private static IDDB: string = "id";
  constructor(public storage: Storage) {
    console.log("Hello IdgeneraterProvider Provider");
    this.storage.set(IdgeneraterProvider.IDDB, 1);
  }

  getnewId() {
    return this.storage.get(IdgeneraterProvider.IDDB);
  }
  setId(id: number) {
    return this.storage.set(IdgeneraterProvider.IDDB, id);
  }
}
