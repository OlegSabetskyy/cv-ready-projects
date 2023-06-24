import { faker } from "@faker-js/faker";

const availableCountries = ["Spain", "Ukraine", "Germany", "France", "Belgium"];
const availableEmailProviders = ["hotmail.com", "gmail.com", "yahoo.com"];
const tableData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: faker.name.firstName(),
    surname: faker.name.firstName() + " " + faker.name.firstName(),
    email: faker.internet.email(
        undefined,
        undefined,
        availableEmailProviders[
            parseInt(Math.random() * availableEmailProviders.length)
        ]
    ),
    phone: faker.phone.number(),
    country:
        availableCountries[parseInt(Math.random() * availableCountries.length)]
}));

export { tableData, availableCountries, availableEmailProviders };
