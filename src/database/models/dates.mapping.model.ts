import { CreatedAt, Model, UpdatedAt } from 'sequelize-typescript';

export class DatesMappingModel<T> extends Model<T> {
  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;
}
