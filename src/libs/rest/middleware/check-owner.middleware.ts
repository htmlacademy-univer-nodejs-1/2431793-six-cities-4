import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { HttpError, Middleware } from '../index.js';
import { Component } from '../../../types/index.js';
import { OfferService } from '../../../modules/offer/index.js';

@injectable()
export class CheckOwnerMiddleware implements Middleware {
  constructor(
    @inject(Component.OfferService)
    private readonly offerService: OfferService
  ) {}

  public async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const { offerId } = req.params;
    const userId = req.tokenPayload?.id;

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`
      );
    }

    if (offer.userId.id !== userId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'You do not have permission to modify this offer.'
      );
    }

    return next();
  }
}
