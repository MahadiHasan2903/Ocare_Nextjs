export type LoginResponse = {
  success: boolean;
  message: string;
  data: any;
};

export interface LoginData {
  country_code: string;
  phone_number: string;
  password: string;
  role: string;
}

export interface PropsTypes {
  router: any;
  country_code: string;
  phone_number: string;
}

export interface UserProfile {
  id: number;
  email: string;
  email_verified_at: string | null;
  phone_number: string;
  country_code: string;
  verification_status: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profile: {
    id: number;
    user_id: number;
    name: string;
    birth_date: string;
    gender: string;
    address: string | null;
    post_code: string | null;
    upazila: string | null;
    district: string | null;
    created_at: string;
    updated_at: string;
    profile_avatar: {
      id: number;
      url: string;
      "url-sm": string;
      "url-md": string;
    };
  };
  doctor_profile: {
    id: number;
    user_id: number;
    doctor_app_id: string;
    designation_id: number;
    specialization_id: number;
    bm_dc_reg_no: string;
    qualification: string;
    created_at: string;
    updated_at: string;
    signature: {
      id: number;
      url: string;
      "url-sm": string;
      "url-md": string;
    };
  };
  patient_profile: {
    id: number;
    user_id: number;
    patient_app_id: string;
    relation_type_id: number | null;
    reverse_relation_type_id: number | null;
    refer_by: number | null;
    created_at: string;
    updated_at: string;
  };
}

export interface ResponseData {
  success: boolean;
  message: string;
  data: {
    user_roles: string[];
    user_details: UserProfile;
    access_token: string;
    session_id: string;
    token_type: string;
    expires_in: number;
  };
}
