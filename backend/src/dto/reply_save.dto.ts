import {ReplyPostDto} from "./reply_post.dto";

export class ReplySaveDto{
    userId: number;
    content: string;
    date: string;

    constructor(content: string, userId: number) {
        this.userId = userId;
        this.content = content;
        this.date = new Date().toLocaleString();
    }
}