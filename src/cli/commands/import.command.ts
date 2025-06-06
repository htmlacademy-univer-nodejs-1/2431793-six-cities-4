import { Command } from './command.interface.js';
import { TSVFileReader } from '../../libs/file-reader.ts/index.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../helpers/index.js';
import { ConsoleLogger } from '../../libs/logger/console.logger.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../modules/offer/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../modules/user/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../libs/database-client/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Offer } from '../../types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { FavoriteModel } from '../../modules/favorite/index.js';
import {
  CommentModel,
  CommentService,
  DefaultCommentService,
} from '../../modules/comment/index.js';

export class ImportCommand implements Command {
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private offerService: OfferService;
  private salt: string;
  private userService: UserService;
  private commentService: CommentService;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.commentService = new DefaultCommentService(CommentModel);

    this.offerService = new DefaultOfferService(
      this.logger,
      OfferModel,
      FavoriteModel,
      this.commentService
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }

  public getName(): string {
    return '--import';
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.userId,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      previewImage: offer.previewImage,
      price: offer.price,
      type: offer.type,
      images: offer.images,
      city: offer.city,
      isPremium: offer.isPremium,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      amenities: offer.amenities,
      userId: user.id,
      latitude: offer.latitude,
      longitude: offer.longitude,
    });
  }
}
