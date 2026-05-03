import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

interface Message {
  id: number;
  text: string;
  from: 'me' | 'them';
  time: string;
}

interface Thread {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  newMessage = '';

  threads: Thread[] = [
    {
      id: 1, name: 'Support Team', avatar: 'ST', avatarColor: '#3f51b5',
      lastMessage: "Your order has been dispatched!", time: '10:32 AM', unread: 2,
      messages: [
        { id: 1, text: "Hi, I wanted to check on my order ORD-1003.", from: 'me', time: '10:15 AM' },
        { id: 2, text: "Hi there! Your order ORD-1003 is currently being processed and will be dispatched soon.", from: 'them', time: '10:20 AM' },
        { id: 3, text: "Great, thank you! When can I expect delivery?", from: 'me', time: '10:25 AM' },
        { id: 4, text: "Your order has been dispatched! Expected delivery is within 2-3 business days.", from: 'them', time: '10:32 AM' }
      ]
    },
    {
      id: 2, name: 'Sales — Alice Johnson', avatar: 'AJ', avatarColor: '#0891b2',
      lastMessage: "I'd be happy to arrange a demo for you.", time: 'Yesterday', unread: 1,
      messages: [
        { id: 1, text: "Hello Alice, I'm interested in the Custom Configuration service.", from: 'me', time: 'Yesterday 2:10 PM' },
        { id: 2, text: "Absolutely! I'd be happy to arrange a product demo for you first. When are you available?", from: 'them', time: 'Yesterday 2:45 PM' }
      ]
    },
    {
      id: 3, name: 'Billing Department', avatar: 'BD', avatarColor: '#7c3aed',
      lastMessage: "Invoice #INV-4421 is now available.", time: 'May 1', unread: 0,
      messages: [
        { id: 1, text: "Could you send me the invoice for my recent orders?", from: 'me', time: 'May 1, 9:00 AM' },
        { id: 2, text: "Of course! Invoice #INV-4421 is now available in your account. You can download it from the Orders page.", from: 'them', time: 'May 1, 9:30 AM' }
      ]
    },
    {
      id: 4, name: 'Technical Support', avatar: 'TS', avatarColor: '#059669',
      lastMessage: "Please try restarting the device.", time: 'Apr 30', unread: 0,
      messages: [
        { id: 1, text: "My keyboard is not connecting via Bluetooth.", from: 'me', time: 'Apr 30, 11:00 AM' },
        { id: 2, text: "Please try restarting the device and holding the Bluetooth button for 5 seconds to re-pair.", from: 'them', time: 'Apr 30, 11:15 AM' },
        { id: 3, text: "That worked! Thank you.", from: 'me', time: 'Apr 30, 11:30 AM' }
      ]
    }
  ];

  selectedThread = signal<Thread>(this.threads[0]);

  selectThread(thread: Thread): void {
    thread.unread = 0;
    this.selectedThread.set(thread);
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;
    const thread = this.selectedThread();
    thread.messages.push({
      id: thread.messages.length + 1,
      text: this.newMessage.trim(),
      from: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    thread.lastMessage = this.newMessage.trim();
    this.newMessage = '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
