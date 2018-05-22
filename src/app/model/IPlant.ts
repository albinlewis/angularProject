import { IDisease } from "./IDisease";

export interface IPlant {
    _id: number,
    name: string,
    eppo_code?: string,
    image_url?: string,
    modified_image: string,
    has_nutrient: boolean,
    has_disease: boolean,
    detection_supported: boolean,
    created: Date,
    modified: Date,
    diseases?: IDisease[]
}