import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Recipe } from './recipe.model';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.users = database.list('users');
    this
    // this.weeklyRecipes = database.list('users/0/weeklyRecipes');
  }

  getUserById(userId: string){
    return this.database.object('users/' + userId);
  }
  saveRecipesToDatabase(recipeArray: Recipe[], selectedUser){
    console.log(recipeArray);
    for(var i = 0; i < recipeArray.length; i++){
      selectedUser.weeklyRecipes.push(recipeArray[i]);
    }
    console.log(selectedUser.weeklyRecipes);
    this.getUserById(selectedUser.$key).update({
      weeklyRecipes: selectedUser.weeklyRecipes
    });

    //
    // console.log(selectedUser.$key);
    // console.log(selectedUser.weeklyRecipes);
    // console.log("save function" + this.weeklyRecipes);
    //gather array from api call and push to "weeklyRecipes" array in firebase
  }
}