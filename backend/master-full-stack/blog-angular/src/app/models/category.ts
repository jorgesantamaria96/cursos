export class Category {
  public id: number = 1;
  public name: string = '';

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
