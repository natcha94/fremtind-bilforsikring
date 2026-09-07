import "./PurchaseForm.scss";

export function PurchaseForm() {
  return (
    <div className="purchase-page">
      <h1 className="purchase-page__title">Kjøp Bilforsikring</h1>
      <p className="purchase-page__description">
        Det er fire forskjellige forsikringer å velge mellom. Avsvarsforsikring
        er lovpålagt om kjøretøyet er registrert og skal brukes på veien. I
        tillegg kan du utvide forsikringen avhengig av hvor gammel bilen din er
        og hvordan du bruker den.
      </p>

      <form className="purchase-form">
        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="reg-number">
            Bilens registreringsnummer
          </label>
          <input
            className="purchase-form__input"
            id="reg-number"
            type="text"
            placeholder="E.g. AB 12345"
          />
        </div>

        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="bonus">
            Din bonus
          </label>
          <input
            className="purchase-form__input"
            id="bonus"
            type="text"
          />
        </div>

        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="fodselsnummer">
            Fødselsnummer
          </label>
          <input
            className="purchase-form__input"
            id="fodselsnummer"
            type="text"
            placeholder="11 siffer"
          />
        </div>

        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="fornavn">
            Fornavn
          </label>
          <input
            className="purchase-form__input"
            id="fornavn"
            type="text"
          />
        </div>

        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="etternavn">
            Etternavn
          </label>
          <input
            className="purchase-form__input"
            id="etternavn"
            type="text"
          />
        </div>

        <div className="purchase-form__field">
          <label className="purchase-form__label" htmlFor="epost">
            E-post
          </label>
          <input
            className="purchase-form__input"
            id="epost"
            type="email"
          />
        </div>

        <div className="purchase-form__actions">
          <button type="submit" className="purchase-form__btn purchase-form__btn--primary">
            Kjøp
          </button>
          <button type="button" className="purchase-form__btn purchase-form__btn--secondary">
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}
