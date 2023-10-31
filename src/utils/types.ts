export interface Patient {
  id: number;
  profile: {
    name: string;
    gender: string;
  };
  country_code: string;
  phone_number: string;
  is_active: boolean;
}
