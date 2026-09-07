import "./PurchaseForm.scss";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import { Select } from "../../components/Select/Select";

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
        <FormField id="reg-number" label="Bilens registreringsnummer" placeholder="E.g. AB 12345" />

        <FormField id="bonus" label="Din bonus">
          <Select
            id="bonus"
            placeholder="Velg bonus"
            options={[
              { label: "0%", value: "0" },
              { label: "10%", value: "10" },
              { label: "20%", value: "20" },
              { label: "30%", value: "30" },
              { label: "40%", value: "40" },
              { label: "50%", value: "50" },
              { label: "60%", value: "60" },
              { label: "70%", value: "70" },
              { label: "75%", value: "75" },
            ]}
          />
        </FormField>

        <FormField id="fodselsnummer" label="Fødselsnummer" placeholder="11 siffer" />
        <div className="purchase-form__row">
          <FormField id="fornavn" label="Fornavn" />
          <FormField id="etternavn" label="Etternavn" />
        </div>
        <FormField id="epost" label="E-post" type="email" />

        <div className="purchase-form__actions">
          <Button type="submit" variant="primary">Kjøp</Button>
          <Button variant="secondary">Avbryt</Button>
        </div>
      </form>
    </div>
  );
}
