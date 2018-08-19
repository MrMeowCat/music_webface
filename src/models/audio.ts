import { Dto } from 'models';

export class Audio extends Dto {
  public title?: string;
  public author?: string;
  public duration?: number;
  public lyrics?: string;
  public fileName?: string;
  public coverArtName?: string;
}
