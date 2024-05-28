import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  
  db!: SQLiteObject;
  databaseName:string = 'users.db';
  sqlite: any;
  
  constructor(
    
  ) { }
  
}
