import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { addComment } from '../../store/api-actions';
import { toast } from 'react-toastify';

export interface Review {
  rating: number,
  comment: string,
}

export function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const offerId = useParams().id;
  const MIN_REVIEW_LENGTH = 50;
  const MAX_REVIEW_LENGTH = 300;


  const dispatch = useAppDispatch();

  const checkReview = () => {
    if (rating !== 0) {
      if (reviewText.length > MAX_REVIEW_LENGTH) {
        toast.error('Длина отзыва не может быть длинее 300 символов');
        return setDisableButton(true);
      }
      if (reviewText.length > MIN_REVIEW_LENGTH) {
        return setDisableButton(false);
      }
    }
  };

  useEffect(() => {
    checkReview();
  }, [rating, reviewText]);

  const handleRatingChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target;
    setRating((prev) => prev = Number(value));

  };

  const handleReviewTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const { value } = evt.target;
    setReviewText(value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setDisableButton(true);
    if (reviewText.length < MIN_REVIEW_LENGTH || reviewText.length > MAX_REVIEW_LENGTH) {
      return toast.error('Комментарий должен содержать от 50 до 300 символов');
    }
    if (rating && reviewText !== null) {
      await dispatch(addComment({ rating: rating, comment: reviewText, id: Number(offerId) }));
      setRating(1);
      setReviewText('');
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          onChange={handleRatingChange}
          className="form__rating-input visually-hidden"
          name="rating"
          id="5-stars"
          type="radio"
          defaultValue={5}
          checked={rating === 5}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange={handleRatingChange}
          className="form__rating-input visually-hidden"
          name="rating"
          id="4-stars"
          type="radio"
          defaultValue={4}
          checked={rating === 4}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange={handleRatingChange}
          className="form__rating-input visually-hidden"
          name="rating"
          id="3-stars"
          type="radio"
          defaultValue={3}
          checked={rating === 3}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange={handleRatingChange}
          className="form__rating-input visually-hidden"
          name="rating"
          id="2-stars"
          type="radio"
          defaultValue={2}
          checked={rating === 2}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange={handleRatingChange}
          className="form__rating-input visually-hidden"
          name="rating"
          id="1-star"
          type="radio"
          defaultValue={1}
          checked={rating === 1}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        onChange={handleReviewTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disableButton}
        >
          Submit
        </button>
      </div>
    </form >
  );
}
