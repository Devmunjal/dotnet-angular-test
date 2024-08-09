import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { URLs } from '../../utills/urls';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})

export class ContactsComponent {
  constructor(private router: Router) { }

  [key: string]: any; 
  newContactName = '';
  newContactPhoneNumber = '';
  showModal=false;
  title= "";
  phoneNumberId: number = 0;


  valueChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    this[name] = value;
  }

  handleContact() {
    if(this.phoneNumberId > 0) {
      this.editContact(this.phoneNumberId);
    } else {
      this.addContact()
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    
    if(localStorage.getItem('token')) {
      this.fetchAllContacts() 
    }  else{
      this.router.navigate(['/login']);
    }
  }

  contacts: Contact[] = [];


  fetchAllContacts(): void {
    fetch(URLs.CONTACTS)
      .then(res => res.json())
      .then((data: Contact[]) => {
        console.log(data);
        this.contacts = data;
      })
      .catch(console.log);
  }


  addContact() {
    const newContact = { Name: this.newContactName, PhoneNumber: this.newContactPhoneNumber };
    fetch(URLs.CONTACTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact)
    })
    .then(res => res.json())
    .then((data: Contact) => {
      this.fetchAllContacts();
    })
    .catch((error) =>{ console.log(error); alert("Not able to Add contact"); this.showModal=false});
  }

  deleteContact(id: number): void {
    if (confirm("Are you sure you want to delete this contact?")) {
      fetch(`${URLs.CONTACTS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {res.json();})
        .then(() => {
          this.fetchAllContacts();
          this.showModal = false
        })
        .catch((error) =>{ console.log(error); alert("Not able to delete contact");});
    }
  }


  editContact(id: number): void {
    fetch(`${URLs.CONTACTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Name: this.newContactName, PhoneNumber: this.newContactPhoneNumber})
    })
    .then(res => res.json())
    .then(() => {
      this.fetchAllContacts();
      this.showModal = false
    })
    .catch((error) =>{ console.log(error); alert("Not able to edit contact"); this.showModal=false});
  }
}

export interface Contact {
  name: string;
  phoneNumber: string;
  id: number;
}
