import { IonItem, IonList, IonInput, IonButton } from "@ionic/react";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";
import { Controller, useForm } from "react-hook-form";

interface FormFields {
  pressure: number;
}

const NegativeInputForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormFields>();

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
              ref={(ref) => {
                if (ref) {
                  requestAnimationFrame(async () => {
                    const input = await ref.getInputElement();
                    if (input) {
                      mask(input);
                    }
                  });
                }
              }}
              inputMode="tel"
              value={value}
              onIonBlur={onBlur}
              onIonInput={(e) => onChange(e.detail.value!)}
            />
          )}
          rules={{ required: true }}
        />
      </IonItem>
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
