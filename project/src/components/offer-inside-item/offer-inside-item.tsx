import { memo } from 'react';

interface OfferInsideItemProps {
  goodName: string
}

export const OfferInsideItem = memo(({goodName}: OfferInsideItemProps): JSX.Element => (
  <li className="property__inside-item">{goodName}</li>
));

OfferInsideItem.displayName = 'OfferInsideItem';
