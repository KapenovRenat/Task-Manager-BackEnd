const config = {
    PORT: process.env.PORT || 4000,
    MAIL: {
        email: 'managergroup1995@mail.ru',
        password: 'manaGer5515'
    },
};
export enum USER_STATUS {
    ADMIN = 1,
    MANAGER,
    DEVELOPER
}
export default config;
