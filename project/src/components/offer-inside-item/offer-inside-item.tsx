interface OfferInsideItemProps {
  item: string
}

export function OfferInsideItem({item}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="property__inside-item">{item}</li>
  );
}
