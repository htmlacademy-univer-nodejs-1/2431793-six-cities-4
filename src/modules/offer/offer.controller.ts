import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  CheckOwnerMiddleware,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestQuery,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamCity } from './type/param-city.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new CheckOwnerMiddleware(this.offerService),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new CheckOwnerMiddleware(this.offerService),
      ],
    });
    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index(
    { query }: Request<RequestQuery>,
    res: Response
  ): Promise<void> {
    const limit = parseInt(query.limit as string, 10) || DEFAULT_OFFER_COUNT;
    const offers = await this.offerService.find(limit);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      userId: tokenPayload.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const userId = tokenPayload?.id;
    const offer = await this.offerService.findById(offerId, userId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;

    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  async getPremium(
    { params, tokenPayload }: Request<ParamCity>,
    res: Response
  ) {
    const city = params.city as City;
    const userId = tokenPayload?.id;
    if (!Object.values(City).includes(city)) {
      return this.send(res, 500, city);
    }
    const offers = await this.offerService.findPremiumOffersByCity(
      city,
      userId
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  async getFavorites({ tokenPayload }: Request, res: Response) {
    const offers = await this.offerService.getUserFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async addFavorite({ params, tokenPayload }: Request, res: Response) {
    const offer = await this.offerService.addFavorite(
      tokenPayload.id,
      params.offerId
    );

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async removeFavorite({ params, tokenPayload }: Request, res: Response) {
    await this.offerService.deleteFavorite(tokenPayload.id, params.offerId);
    this.noContent(res, {});
  }
}
