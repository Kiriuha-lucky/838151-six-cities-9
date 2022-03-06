interface OfferInsideItemProps {
  goodName: string
}

export function OfferInsideItem({goodName}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="property__inside-item">{goodName}</li>
  );
}
