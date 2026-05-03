import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ChatMessage {
  text: string;
  from: 'user' | 'bot';
  time: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = signal(false);
  inputText = '';

  messages = signal<ChatMessage[]>([
    {
      text: "Hi there! 👋 I'm InvenBot. How can I help you today? You can ask me about products, orders, or services.",
      from: 'bot',
      time: this.now()
    }
  ]);

  toggle(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  send(): void {
    const text = this.inputText.trim();
    if (!text) return;

    this.messages.update(msgs => [...msgs, { text, from: 'user', time: this.now() }]);
    this.inputText = '';

    setTimeout(() => {
      const reply = this.getBotReply(text.toLowerCase());
      this.messages.update(msgs => [...msgs, { text: reply, from: 'bot', time: this.now() }]);
      setTimeout(() => this.scrollToBottom(), 50);
    }, 600);

    setTimeout(() => this.scrollToBottom(), 50);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private getBotReply(input: string): string {
    if (input.includes('product') || input.includes('item') || input.includes('stock')) {
      return "We have 8 products in stock across Electronics, Furniture, and Accessories categories. Head to the Home page to browse them all!";
    }
    if (input.includes('order') || input.includes('purchase')) {
      return "You can view all your orders on the Orders page. We show real-time status updates including Pending, Confirmed, and Delivered.";
    }
    if (input.includes('service') || input.includes('book') || input.includes('schedule') || input.includes('appointment')) {
      return "We offer Equipment Consultation, Installation & Setup, Product Demos, Technical Support, and Custom Configuration. Visit the Services page to book a slot!";
    }
    if (input.includes('cart') || input.includes('checkout')) {
      return "You can add items to your cart from the Home page, then view and manage your cart by clicking the cart icon in the top-right navbar.";
    }
    if (input.includes('price') || input.includes('cost')) {
      return "Our products range from $45 (Desk Lamp LED) to $499 (Standing Desk). Check the Home page for full pricing details.";
    }
    if (input.includes('message') || input.includes('contact') || input.includes('support')) {
      return "For direct support, head to the Messages page to view your conversation threads. We typically reply within 1 business day.";
    }
    if (input.includes('setting') || input.includes('notification') || input.includes('preference')) {
      return "You can manage your notification preferences, email alerts, and default role settings on the Settings page.";
    }
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Great to see you. Ask me anything about products, orders, services, or your account!";
    }
    if (input.includes('thank')) {
      return "You're welcome! Let me know if there's anything else I can help with. 😊";
    }
    if (input.includes('help')) {
      return "I can help with: 🛍️ Products & pricing, 📦 Order status, 🔧 Service bookings, 🛒 Cart & checkout, ✉️ Messages & support, ⚙️ Settings. What do you need?";
    }
    return "That's a great question! I'm still learning. For detailed help, please visit the relevant page or send us a message through the Messages section.";
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch {}
  }

  private now(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
