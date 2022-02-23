interface OfferImagesProps {
  image: string
}

export function OfferImage({image}:OfferImagesProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img
        className="property__image"
        src={image}
        alt="Photo studio"
      />
    </div>
  );
}
