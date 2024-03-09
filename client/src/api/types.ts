export type CheckUserResponse = {
  exists: boolean;
};

export type GetUserResponse = {
  email: string;
  name: string;
  birthday: string;
  city: string;
  native_lang: string;
  foreign_lang?: string;
  second_foreign_lang?: string;
};

export type GetUserQuery = {
  birthday: string;
  city?: string;
};

export type CityRespone = {
  city: string;
};
