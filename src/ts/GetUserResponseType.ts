export type GetUserResponse = {
    email: string;
    name: string;
    birthday: string;
    city: string;
    native_lang: string;
    foreign_lang?: string;
    second_foreign_lang?: string;
};