import { Component } from '@angular/core';

@Component({
  selector: 'app-view-module',
  standalone :false,
  templateUrl: './ViewModule.html',
  styleUrl: './ViewModule.css'
})
export class ViewModule {

 moduleTopics = [
    {
      id: 1,
      title: 'History Of Marketing',
      color: '#f59e0b', // orange
      icon: 'bi bi-file-earmark-text-fill', // PDF icon
      rows: [
        { id: 1, title: 'History Of Marketing', type: 'PDF', link: '#' },
        { id: 2, title: 'History Of Marketing-Marketing Basics', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Quiz 1: Marketing, Brands & Associated Values', type: 'QUIZ', link: '#' },
      ]
    },
    {
      id: 2,
      title: 'Traditional Vs. Digital Marketing',
      color: '#f59e0b',
      icon: 'bi bi-file-earmark-text-fill',
      rows: [
        { id: 4, title: 'Traditional Vs. Digital Marketing', type: 'PDF', link: '#' },
        { id: 5, title: 'Traditional Vs. Digital Marketing', type: 'VIDEO', link: '#' },
        { id: 6, title: 'Quiz 3: Traditional vs. Digital Marketing', type: 'QUIZ', link: '#' },
      ]
    }
  ];
}
