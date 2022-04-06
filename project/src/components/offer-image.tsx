import { memo } from 'react';

interface OfferImagesProps {
  imageSrc: string
}

export const OfferImage = memo(({imageSrc}:OfferImagesProps): JSX.Element => (
  <div className="property__image-wrapper">
    <img
      className="property__image"
      src={imageSrc}
      alt="Studio"
    />
  </div>
));

OfferImage.displayName = 'OfferImage';
