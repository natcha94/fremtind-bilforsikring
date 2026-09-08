import "./PurchaseForm.scss";
import { useSubmit, useActionData, useNavigation } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  purchaseFormSchema,
  type PurchaseFormValues,
} from "./purchaseFormSchema";
import { DEKNINGSTYPE_OPTIONS } from "./dekningstype";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import { Select } from "../../components/Select/Select";

type ActionData = { error: string };

export function PurchaseForm() {
  const submit = useSubmit();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
  });

  const isSubmitting = navigation.state === "submitting";

  function onSubmit(data: PurchaseFormValues) {
    submit(data, { method: "POST", encType: "application/json" });
  }

  return (
    <main className="purchase-page">
      <h1 className="purchase-page__title">Kjøp Bilforsikring</h1>
      <p className="purchase-page__description">
        Det er fire forskjellige forsikringer å velge mellom. Avsvarsforsikring
        er lovpålagt om kjøretøyet er registrert og skal brukes på veien. I
        tillegg kan du utvide forsikringen avhengig av hvor gammel bilen din er
        og hvordan du bruker den.
      </p>

      <form
        className="purchase-form"
        onSubmit={handleSubmit(onSubmit)}
        aria-busy={isSubmitting}
        noValidate
      >
        <FormField
          id="reg-number"
          label="Bilens registreringsnummer"
          placeholder="F.eks. AB 12345"
          registration={register("registreringsnummer")}
          error={errors.registreringsnummer?.message}
        />

        <FormField
          id="dekningstype"
          label="Dekningstype"
          error={errors.dekningstype?.message}
        >
          <Select
            id="dekningstype"
            placeholder="Velg dekningstype"
            registration={register("dekningstype")}
            error={!!errors.dekningstype}
            options={DEKNINGSTYPE_OPTIONS}
          />
        </FormField>

        <FormField id="bonus" label="Din bonus" error={errors.bonus?.message}>
          <Select
            id="bonus"
            placeholder="Velg bonus"
            registration={register("bonus")}
            error={!!errors.bonus}
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

        <FormField
          id="startdato"
          label="Startdato"
          type="date"
          registration={register("startdato")}
          error={errors.startdato?.message}
        />

        <FormField
          id="fodselsnummer"
          label="Fødselsnummer"
          placeholder="11 siffer"
          registration={register("fodselsnummer")}
          error={errors.fodselsnummer?.message}
        />

        <div className="purchase-form__row">
          <FormField
            id="fornavn"
            label="Fornavn"
            registration={register("fornavn")}
            error={errors.fornavn?.message}
          />
          <FormField
            id="etternavn"
            label="Etternavn"
            registration={register("etternavn")}
            error={errors.etternavn?.message}
          />
        </div>

        <FormField
          id="epost"
          label="E-post"
          type="email"
          registration={register("epost")}
          error={errors.epost?.message}
        />

        <FormField
          id="telefonnummer"
          label="Telefonnummer"
          type="tel"
          placeholder="8 siffer"
          registration={register("telefonnummer")}
          error={errors.telefonnummer?.message}
        />

        {actionData?.error && (
          <p role="alert" className="purchase-form__error">
            {actionData.error}
          </p>
        )}

        <div className="purchase-form__actions">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Sender..." : "Kjøp"}
          </Button>
          <Button variant="secondary">Avbryt</Button>
        </div>
      </form>
    </main>
  );
}
