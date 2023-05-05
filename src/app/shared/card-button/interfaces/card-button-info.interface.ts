import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface CardButtonInfo {
  routerLink: string;
  title?: string;
  subtitle?: string;
  faIcon: IconProp;
  bgColor: string;
  isRouteRelative?: boolean;
  externalUrl?: string;
}
