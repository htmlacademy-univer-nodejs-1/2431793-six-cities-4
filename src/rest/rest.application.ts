import { inject, injectable } from 'inversify';
import { Logger } from '../libs/logger/index.js';
import { Config, RestSchema } from '../libs/config/index.js';
import { Component } from '../types/index.js';
import { DatabaseClient } from '../libs/database-client/index.js';
import { getMongoURI } from '../helpers/index.js';
import { UserModel } from '../modules/user/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();
    this.logger.info('Init database completed');
    await UserModel.syncIndexes();
    // const user = new UserModel({
    //   email: 'test@emailru',
    //   avatarPath: 'keks.jpg',
    //   name: '2',
    //   password: 'Unkn',
    //   type: 'regular',
    // });

    // const error = user.validateSync();
    // console.log(error);
    // const user1 = await UserModel.create({
    //   name: 'Кекс',
    //   email: 'test2@mail.ru',
    //   avatarUrl: 'keks.jpg',
    //   password: '12345678',
    //   type: 'regular',
    // });
    // console.log(user1);
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }
}
