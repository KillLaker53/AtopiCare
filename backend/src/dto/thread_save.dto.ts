import {ReplySaveDto} from "./reply_save.dto";
import {ThreadPostDto} from "./thread_post.dto";

export class ThreadSaveDto {
    userId: number;
    title: string;
    date: string;
    content: string;
    replies: [];

    constructor(thread: ThreadPostDto, userId: number) {
        this.userId = userId;
        this.title = thread.title;
        this.date = new Date().toLocaleString();
        this.content = thread.content;
        this.replies = [];
    }
}