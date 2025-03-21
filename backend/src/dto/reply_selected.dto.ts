import {IReply} from "../interface/reply.interface";

export class ReplySelectedDto{
    ownerUsername: string;
    content: string;
    date: string;

    constructor(reply: IReply, username: string) {
        this.ownerUsername = username;
        this.content = reply.content;
        this.date = reply.date;
    }
}