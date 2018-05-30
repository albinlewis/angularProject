import { IPlant } from "./IPlant";
import { IDisease } from "./IDisease";

export interface IJob{
    _id: string,
    plant: IPlant,
    finish: boolean,
    resultId: string,
    result?: [{
        confidence: number,
        disease_id: IDisease
    }],
    image_url?: string,
    date: Date,
}