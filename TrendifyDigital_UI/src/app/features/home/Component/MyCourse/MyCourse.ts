import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-course',
  standalone: false,
  templateUrl: './MyCourse.html',
  styleUrls: ['./MyCourse.css']
})
export class MyCourse {
  activeSection: number | null = null;

  sections = [
    {
      id: 1,
      title: 'Marketing & Web Presence Foundation',
      modulesCount: 5,
      modules: [
        { id: 1, title: 'M1 Marketing Foundation', docsCount: 2, videosCount: 3, status: 'watch' },
        { id: 2, title: 'M2 Digital Marketing Ecosystem', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 3, title: 'M3 Digital Consumer Behavior', docsCount: 2, videosCount: 2, status: 'watch' },
        { id: 4, title: 'M4 Digital Visibility Strategy', docsCount: 4, videosCount: 4, status: 'resume' },
        { id: 5, title: 'M5 Online Lead Strategy', docsCount: 3, videosCount: 3, status: 'watch' }
      ],
      levelComplete: true
    },
    {
      id: 2,
      title: 'Online Business Visibility Creation',
      modulesCount: 6,
      modules: [
        { id: 6, title: 'M1 Business Basics', docsCount: 3, videosCount: 4, status: 'watch' },
        { id: 7, title: 'M2 Website Optimization', docsCount: 2, videosCount: 3, status: 'watch' },
        { id: 8, title: 'M3 Social Media Setup', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 9, title: 'M4 SEO Foundations', docsCount: 4, videosCount: 4, status: 'watch' },
        { id: 10, title: 'M5 Content Marketing', docsCount: 2, videosCount: 3, status: 'watch' },
        { id: 11, title: 'M6 Email Marketing', docsCount: 2, videosCount: 3, status: 'resume' }
      ],
      levelComplete: false
    },
    {
      id: 3,
      title: 'Lead Generation',
      modulesCount: 5,
      modules: [
        { id: 12, title: 'M1 Lead Capture', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 13, title: 'M2 Landing Pages', docsCount: 2, videosCount: 2, status: 'watch' },
        { id: 14, title: 'M3 PPC Campaigns', docsCount: 3, videosCount: 3, status: 'resume' },
        { id: 15, title: 'M4 Lead Magnets', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 16, title: 'M5 CRM Basics', docsCount: 2, videosCount: 3, status: 'watch' }
      ],
      levelComplete: false
    },
    {
      id: 4,
      title: 'Lead Nurturing',
      modulesCount: 4,
      modules: [
        { id: 17, title: 'M1 Email Sequences', docsCount: 3, videosCount: 2, status: 'watch' },
        { id: 18, title: 'M2 Retargeting', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 19, title: 'M3 Content Strategy', docsCount: 2, videosCount: 2, status: 'watch' },
        { id: 20, title: 'M4 Analytics', docsCount: 3, videosCount: 3, status: 'resume' }
      ],
      levelComplete: false
    },
    {
      id: 5,
      title: 'Personal Branding & Online Earning',
      modulesCount: 4,
      modules: [
        { id: 21, title: 'M1 Email Sequences', docsCount: 3, videosCount: 2, status: 'watch' },
        { id: 22, title: 'M2 Retargeting', docsCount: 3, videosCount: 3, status: 'watch' },
        { id: 23, title: 'M3 Content Strategy', docsCount: 2, videosCount: 2, status: 'watch' },
        { id: 24, title: 'M4 Analytics', docsCount: 3, videosCount: 3, status: 'resume' }
      ],
      levelComplete: false
    },

    {
      id: 6,
      title: 'Interview Preparation',
      modulesCount: 1,
      modules: [
        { id: 25, title: 'M1 Interview Basics', docsCount: 2, videosCount: 1, status: 'watch' }
      ],
      levelComplete: false
    },
    {
      id: 7,
      title: 'Pro Version - Master Class',
      modulesCount: 1,
      modules: [
        { id: 26, title: 'M1 Interview Basics', docsCount: 2, videosCount: 1, status: 'watch' }
      ],
      levelComplete: false
    }
  ];

  constructor(private router: Router) { }

  toggleSection(id: number) {
    this.activeSection = this.activeSection === id ? null : id;
  }

  onModuleClick(module: any) {
    console.log('Module clicked:', module);
    this.router.navigate(['/home/view-module'], {
      queryParams: { id: module.id } 
    });
  }
}
