export interface IMessage {
    id: string,
    message?:string,
    type?: "error" | "success"
}