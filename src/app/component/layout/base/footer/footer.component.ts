import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  date: any;
  text: string = 'Designed & Powered by Shristi Sapal |';
  displayedText: string = '';
  typingSpeed: number = 100;

  ngOnInit() {
    this.date = new Date().getFullYear();
    this.startTyping();
  }

  startTyping() {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < this.text.length) {
        this.displayedText += this.text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, this.typingSpeed);
  }
}
