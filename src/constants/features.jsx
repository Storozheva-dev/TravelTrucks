import {
  TVIcon,
  ACIcon,
  AlcoveIcon,
  AutomaticIcon,
  BathroomIcon,
  GasIcon,
  KitchenIcon,
  MicrowaveIcon,
  PetrolIcon,
  RadioIcon,
  RefrigeratorIcon,
  VanIcon,
  WaterIcon,
} from "../icons/index"; 

const features = [
  { key: "AC", label: "AC", icon: ACIcon },
  { key: "bathroom", label: "bathroom", icon: BathroomIcon },
  { key: "kitchen", label: "kitchen", icon: KitchenIcon },
  { key: "radio", label: "radio", icon: RadioIcon },
  { key: "refrigerator", label: "refrigerator", icon: RefrigeratorIcon },
  { key: "microwave", label: "microwave", icon: MicrowaveIcon },
  { key: "gas", label: "gas", icon: GasIcon },
  { key: "water", label: "water", icon: WaterIcon },
  { key: "transmission", expected: "automatic", label: "automatic", icon: AutomaticIcon },
  { key: "engine", expected: "petrol", label: "petrol", icon: PetrolIcon },
  { key: "form", expected: "alcove", label: "alcove", icon: AlcoveIcon },
  { key: "form", expected: "van", label: "van", icon: VanIcon },
  { key: "TV", label: "TV", icon: TVIcon },
];

export default features;
