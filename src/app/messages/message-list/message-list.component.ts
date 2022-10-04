import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Grades Posted', 'The grades for this assignment have been posted', 'Bro. Jackson'),
    new Message('2', 'Due Date?', 'When is assignment 3 due', 'Steve Johnson'),
    new Message('3', 'Due Date', 'Assignment 3 is due on Saturday at 11:30 PM', 'Bro. Jackson'),
    new Message('4', 'Help', 'Can I meet with you sometime. I need help with assignment 3', 'Mark Smith'),
    new Message('5', 'Meeting', 'I can meet with you today at 4:00 PM in my office', 'Bro. Jackson')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
