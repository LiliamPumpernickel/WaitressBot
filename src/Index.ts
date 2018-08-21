import * as express from 'express';
import { Router } from './Router';
import { SlackApi } from './Models/SlackApi';
import { FoodController } from './Controllers/FoodController';
import { FoodService } from './Services/FoodService';
import { RestaurantService } from'./Models/Restaurants';
import { InstanceManager } from './Services/InstanceManager';


const restaurantService: RestaurantService = new RestaurantService();


const port = process.env.PORT || 9600;
const token: string = process.env.TOKEN || '';
const slackApi = new SlackApi(token);

const app = express();

restaurantService.loadMenus(process.env.MENUS || './menus');

const foodService: FoodService = new FoodService(slackApi);
const instanceManager: InstanceManager = new InstanceManager(restaurantService, slackApi);
const foodController: FoodController = new FoodController(foodService, restaurantService, instanceManager);
const router: Router = new Router(app, foodController);

app.listen(port, () => console.log(`On Port: ${port}`));
