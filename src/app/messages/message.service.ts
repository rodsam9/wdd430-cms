import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
      this.getMessages();
  }

  getMessages() {
    this.http.get('http://localhost:3000/messages')

    .subscribe(
      // success method
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0)
        this.messageListChangedEvent.next(this.messages.slice());
      },
      // error method
      (error: any) => {
      console.log(error);
      })
}
  getMessage(id: string): Message | null {
      for (const message of this.messages) {
        if (message.id === id) {
          return message;
        }
      }
      return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.messages) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages() {
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('http://localhost:3000/messages', messages, { headers: headers })
      .subscribe(
        () => {
          this.messageListChangedEvent.next(this.messages.slice());
        }
      )
  }
}