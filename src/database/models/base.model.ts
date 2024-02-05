import { AutoIncrement, Column, HasMany, PrimaryKey } from 'sequelize-typescript';
import { DatesMappingModel } from './dates.mapping.model';

export class BaseModel<T> extends DatesMappingModel<T> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public declare id: number;
}
