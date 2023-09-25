import { IonItem, IonList, IonInput, IonButton } from "@ionic/react";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";
import { Controller, useForm } from "react-hook-form";
import { MaskedInput } from "./MaskedInput";

interface FormFields {
  pressure: number;
}

const NegativeInputForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormFields>({ mode: "onChange" });

  const options = maskitoNumberOptionsGenerator({
    precision: 4,
    min: -10000000,
  });

  const mask = useMaskito({ options });

  return (
    <IonList lines="none">
      <IonItem>
        <Controller
          name="pressure"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonInput
              label="Pressure"
              labelPlacement="floating"
              ref={async (ref) => {
                if (ref) {
                  const input = await ref.getInputElement();
                  mask(input);
                }
              }}
              value={value}
              onIonBlur={onBlur}
              onIonChange={(e) => onChange(e.detail.value!)}
            />
          )}
          rules={{ required: true }}
        />
      </IonItem>
      <MaskedInput />
      <IonButton
        expand="full"
        disabled={!isValid}
        onClick={handleSubmit((data) => console.log(data))}
      >
        Submit
      </IonButton>
    </IonList>
  );
};
export default NegativeInputForm;
