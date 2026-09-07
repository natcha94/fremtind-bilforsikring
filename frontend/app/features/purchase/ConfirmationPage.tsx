import "./ConfirmationPage.scss";
import { Link } from "react-router";

type Props = {
  avtalenummer: string;
};

export function ConfirmationPage({ avtalenummer }: Props) {
  return (
    <main className="confirmation-page">
      <div className="confirmation-page__icon" aria-hidden="true">✓</div>

      <h1 className="confirmation-page__title">Forsikring kjøpt!</h1>
      <p className="confirmation-page__lead">
        Du vil snart motta en bekreftelse på e-post.
      </p>

      <dl className="confirmation-page__details">
        <div className="confirmation-page__detail">
          <dt>Avtalenummer</dt>
          <dd>{avtalenummer}</dd>
        </div>
      </dl>

      <Link to="/" className="confirmation-page__back">
        Kjøp en ny forsikring
      </Link>
    </main>
  );
}
