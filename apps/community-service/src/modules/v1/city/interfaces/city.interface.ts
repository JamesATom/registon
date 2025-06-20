// city.interface.ts
export interface City {
    id: string;
    name: string;
}

export type CreateCityDto = Omit<City, 'id'>;
export type UpdateCityDto = Partial<CreateCityDto>;
