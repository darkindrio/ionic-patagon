import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class TodosProvider {

  data: any;
  db: any;
  remote: any;

  constructor() {

  this.db = new PouchDB('cloudo'); 
  }

getTodos() {
 
  if (this.data) {
    return Promise.resolve(this.data);
  }
 
  return new Promise(resolve => {
 
    this.db.allDocs({
 
      include_docs: true
 
    }).then((result) => {
 
      this.data = [];
 
      let docs = result.rows.map((row) => {
        this.data.push(row.doc);
      });
 
      resolve(this.data);
 
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        this.handleChange(change);
      });
 
    }).catch((error) => {
 
      console.log(error);
 
    });
 
  });
 
}

getHtml(){
  var myId = 'foo';
  this.db.query(function(doc, emit) {
  if (doc.html ) {
    return doc
  }
  }).then(function (result) {
  // handle result
  }).catch(function (err) {
   console.log(err);
  });
}

  createTodo(todo){ 
 
    this.db.post(todo);

  }

  updateTodo(todo){

  this.db.put(todo).catch((err) => {
    console.log(err);
  });

}

  deleteTodo(todo){

  this.db.remove(todo).catch((err) => {
    console.log(err);
  });

}

  handleChange(change){

  let changedDoc = null;
  let changedIndex = null;
 
  this.data.forEach((doc, index) => {
 
    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }
 
  });
 
  //A document was deleted
  if(change.deleted){
    this.data.splice(changedIndex, 1);
  }
  else {
 
    //A document was updated
    if(changedDoc){
      this.data[changedIndex] = change.doc;
    }
 
    //A document was added
    else {
      this.data.push(change.doc);
    }
 
  }

}


}
