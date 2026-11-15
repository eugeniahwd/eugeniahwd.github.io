import { TLink } from '../components/Transition';
import Icon from '../components/Icon';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="section-label">Error 404</p>
        <h1 className="page-title">This page took a <em>wrong route</em>.</h1>
        <p className="page-intro">The page you are looking for does not exist or has moved.</p>
        <TLink to="/" className="btn btn--primary">
          <span>Back to home</span>
          <Icon name="arrow" />
        </TLink>
      </div>
    </section>
  );
}
