import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseName:string = 'users.db';
  db!:SQLiteObject;
  sqlite: any;
  constructor() { }
  // async openDatabase(){
  //   try{
  //   this.db = await this.sqlite.create({name: this.databaseName,email:this.databaseName,senha:this.databaseName, location:'default'});
  //   await this.createDatabase();
  //   }catch(error){
  //     console.error('erro ao criar o banco de dados ',error)
  //   }
  // }
  // async createDatabase(){
  //   const sqlCreateDatabase = this.getCreateTable()
  //   const result = await this.sqlite.importSqlToOb(this.db,sqlCreateDatabase);
  //   return result?true:false
  // }
  // getCreateTable(){
  //   const sqls: any[] =[];
  //   sqls.push('CREATE TABLE IF NOT EXISTE users(id interger primary key AUTOINCREMENT,name varchar(100)),email varchar(100),senha varchar(100));');
  //   return sqls.join('\n')
  // }
  // executeSQL(sql:string,params?:any[]){
  //   return this.db.executeSql(sql,params)

  // }
  
}
