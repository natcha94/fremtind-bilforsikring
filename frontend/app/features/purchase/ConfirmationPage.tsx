import "./ConfirmationPage.scss";
import { Link } from "react-router";
import { type Dekningstype, DEKNINGSTYPE_LABELS } from "./dekningstype";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "long" }).format(
    new Date(isoDate + "T12:00:00")
  );
}

type Props = {
  avtalenummer: string;
  dekningstype: Dekningstype;
  startdato: string;
  arspremie: string;
};

export function ConfirmationPage({ avtalenummer, dekningstype, startdato, arspremie }: Props) {
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
        <div className="confirmation-page__detail">
          <dt>Dekningstype</dt>
          <dd>{DEKNINGSTYPE_LABELS[dekningstype]}</dd>
        </div>
        <div className="confirmation-page__detail">
          <dt>Startdato</dt>
          <dd>{formatDate(startdato)}</dd>
        </div>
        <div className="confirmation-page__detail">
          <dt>Årspremie</dt>
          <dd>{Number(arspremie).toLocaleString("nb-NO")} kr</dd>
        </div>
      </dl>

      <Link to="/" className="confirmation-page__back">
        Kjøp en ny forsikring
      </Link>
    </main>
  );
}
