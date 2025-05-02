export class CreateCommentDto {
  public text!: string;
  public rate!: number;
  public postDate!: Date;
  public offerId!: string;
  public userId!: string;
}
