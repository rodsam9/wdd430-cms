import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.contact = this.contactService.getContact(params['id']);
      }
    )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }
}
