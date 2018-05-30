export interface IUser{
    _id: string,
    name: string,
    email: string,
    image_url?: string,
    jobs: any[],
    created_at?: Date,
    updated_at?: Date
}