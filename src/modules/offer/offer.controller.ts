import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit =
      parseInt(req.query.limit as string, 10) || DEFAULT_OFFER_COUNT;
    const offers = await this.offerService.find(limit, req.body?.userId);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  async show(req: Request, res: Response) {
    const offer = await this.offerService.findById(req.params.offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(req: Request, res: Response) {
    const updatedOffer = await this.offerService.updateById(
      req.params.offerId,
      req.body
    );
    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found or not authorized',
        'OfferController'
      );
    }
    this.created(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete(req: Request, res: Response) {
    const result = await this.offerService.deleteById(req.params.offerId);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found or not authorized',
        'OfferController'
      );
    }
    this.noContent(res, {});
  }

  async getPremium(req: Request, res: Response) {
    const city = req.params.city as City;
    const offers = await this.offerService.findPremiumOffersByCity(
      city,
      req.body?.userId
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async getFavorites(req: Request, res: Response) {
    const offers = await this.offerService.getUserFavorites(req.body?.userId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async addFavorite(req: Request, res: Response) {
    const offer = await this.offerService.addFavorite(
      req.params.offerId,
      req.body?.userId
    );
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async removeFavorite(req: Request, res: Response) {
    await this.offerService.deleteFavorite(
      req.params.offerId,
      req.body?.userId
    );
    this.noContent(res, {});
  }
}
