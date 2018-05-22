export interface IDisease {
    _id: number,
    crop_id: number,
    name: string,
    eppo_code: string,
    symptoms: string,
    detection_supported: boolean
    leaf_wetness: string,
    bbch_from: number,
    bbch_to: Number,
    example_url: String,
    celsius_low: Number,
    celsius_high: Number,
    humidity_from: Number,
    humidity_to: Number,
    created: Date,
    modified: Date
}