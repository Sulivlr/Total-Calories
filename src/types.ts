export interface ApiMeal {
  time: string
  description: string;
  calories: number;
}

export interface ApiMeals {
  [id: string]: ApiMeal;
}

export interface Meal extends ApiMeal {
  id: string;
}