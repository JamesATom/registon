// city.interface.ts
export interface City {
    id: string;
    name: string;
    isActive: boolean;
}

export type CreateCityDto = Partial<Omit<City, 'id'>> & { name: string };
export type UpdateCityDto = Partial<CreateCityDto>;
