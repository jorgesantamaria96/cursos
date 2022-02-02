import { Category } from "./category";
import { User } from "./user";

export class Post {
  public id: number = 1;
  public user_id: number = 1;
  public user: User = new User();
  public category_id: number = 1;
  public category: Category = new Category();
  public title: string = '';
  public content: string = '';
  public image: string = '';
  public created_at: any;
  
  constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}
