import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.html',
  styleUrls: ['./help.css']
})
export class HelpComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initAccordion();
  }

    navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private initAccordion(): void {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling as HTMLElement;
        
        // Close all other items
        accordionHeaders.forEach(otherHeader => {
          if (otherHeader !== header) {
            otherHeader.classList.remove('active');
            const otherContent = otherHeader.nextElementSibling as HTMLElement;
            otherContent.style.maxHeight = '0';
          }
        });
        
        // Toggle current item
        header.classList.toggle('active');
        
        if (header.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    });
  }
}