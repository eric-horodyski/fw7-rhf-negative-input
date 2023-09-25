import { IonInput } from "@ionic/react";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";

const options = maskitoNumberOptionsGenerator({
  precision: 4,
  min: -10000000,
});

export const MaskedInput = () => {
  const mask = useMaskito({ options });

  return (
    <IonInput
      ref={async (ref) => {
        if (ref) {
          const input = await ref.getInputElement();
          mask(input);
        }
      }}
      label="Without RHF"
      type="text"
    />
  );
};
