import { Link } from 'react-router-dom';
import './not-found.css';

export function NotFound(): JSX.Element {
  return (
    <>
      <h1>404 NOT FOUND</h1>
      <Link to='/'>Main page</Link>
    </>
  );
}
