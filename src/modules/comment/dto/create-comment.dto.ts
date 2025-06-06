import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.text.lengthField })
  public text!: string;

  @IsInt({ message: CreateCommentMessages.rate.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rate.min })
  @Max(5, { message: CreateCommentMessages.rate.max })
  public rate!: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId!: string;
}
