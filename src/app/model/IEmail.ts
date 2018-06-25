export interface IEmail {
    sender: string,
    receiver: string,
    subject?: string,
    message: string,
    content?: any;
}