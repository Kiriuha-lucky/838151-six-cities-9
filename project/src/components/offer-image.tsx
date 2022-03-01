interface OfferImagesProps {
  imageSrc: string
}

export function OfferImage({imageSrc}:OfferImagesProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img
        className="property__image"
        src={imageSrc}
        alt="Photo studio"
      />
    </div>
  );
}
