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
      icon: 'bi bi-file-earmark-text-fill',
      rows: [
        { id: 1, title: 'History Of Marketing', type: 'PDF', link: '#' },
        { id: 2, title: 'History Of Marketing-Marketing Basics', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Quiz 1: Marketing, Brands & Associated Values', type: 'QUIZ', link: '#' },
      ]
    },
    {
      id: 2,
      title: 'Traditional Vs. Digital Marketing',
      icon: 'bi bi-file-earmark-text-fill',
      rows: [
        { id: 4, title: 'Traditional Vs. Digital Marketing', type: 'PDF', link: '#' },
        { id: 5, title: 'Traditional Vs. Digital Marketing', type: 'VIDEO', link: '#' },
        { id: 6, title: 'Quiz 3: Traditional vs. Digital Marketing', type: 'QUIZ', link: '#' },
      ]
    }
  ];

   getIcon(type: string): string {
    switch (type.toUpperCase()) {
      case 'PDF': return 'bi bi-file-earmark-pdf';
      case 'VIDEO': return 'bi bi-camera-video';
      case 'QUIZ': return 'bi bi-question-circle';
      default: return 'bi bi-file-earmark';
    }
  }

  getColor(type: string): string {
    switch (type.toUpperCase()) {
      case 'PDF': return '#007bff';       // Blue
      case 'VIDEO': return '#dc3545';     // Red
      case 'QUIZ': return '#6c757d';      // Gray
      default: return '#333';
    }
  }
}
