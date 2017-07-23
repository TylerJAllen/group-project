import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class UserComponent implements OnInit {
  userId;
  currentUser;
  recipeOptions: Recipe[];
  tempOptions: Recipe[] = [];
  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParametersArray) => {
      this.userId = urlParametersArray['id'];
    });
    this.userService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.currentUser = dataLastEmittedFromObserver;
      console.log(this.currentUser);
    })
  }

  getWeeklyMenu(){
    this.recipeService.generateWeeklyMenu(this.currentUser);
  }

  getDayOptions(){
    this.recipeOptions = this.userService.generateMealOptions(this.currentUser);
    console.log(this.recipeOptions);
    for(var i = 0, j = 0; i < 3; i++, j+=3){
      this.tempOptions[i] = this.recipeOptions[j];
    }
    console.log(this.tempOptions);
  }

  onChange(recipeIndex){
    if(recipeIndex >= 0 && recipeIndex <= 2){
      this.tempOptions[0] = this.recipeOptions[recipeIndex];
    }
    else if(recipeIndex >= 3 && recipeIndex <= 5){
      this.tempOptions[1] = this.recipeOptions[recipeIndex];
    }
    else{
      this.tempOptions[2] = this.recipeOptions[recipeIndex];
    }
    console.log(this.tempOptions);
  }

  //REUSABLE FUNCTIONS:

  //generateWeeklyMenu(5 ingredients) API CALL--used when user gets created, and when user wants to update 5 available ingredients. Stores 100 recipes into database

  //generateGoals(selectedGoal) ADDS OR EDIT'S  current user's "goal" property in firebase.

  //


  //display3MealOptionsPerMeal() ACCESS 100 recipes in firebase (weeklyRecipes) and pull 9 random recipes.  3 for breakfast, 3 for lunch, 3 for dinner

  //saveMealsForDay(selectedRecipes)  STORES selected recipes into firebase as current user's selected day meals.


}
