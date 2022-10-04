import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents : Document[] = [
    new Document('1', 'CIT 260', 'Object Oriented Progamming', 'https://byui.instructure.com/', null),
    new Document('2', 'CIT 366', 'Full Web Stack Development', 'https://byui.instructure.com/', null),
    new Document('3', 'CIT 425', 'Data Warehousing', 'https://byui.instructure.com/', null),
    new Document('4', 'CIT 460', 'Enterprise Development', 'https://byui.instructure.com/', null),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
