import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-course',
  standalone: false,
  templateUrl: './MyCourse.html',
  styleUrls: ['./MyCourse.css']
})
export class MyCourse {
  activeSection: number | null = null;
   userAccessibleSections: number[] = [5, 2, 3, 7];

  sectionsData = [
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
        { id: 6, title: 'M6 Graphic Designing For Business', docsCount: 2, videosCount: 9, status: 'watch' },
        { id: 7, title: 'M7 Video Marketing For Business', docsCount: 2, videosCount: 4, status: 'watch' },
        { id: 8, title: 'M8 Building Your Business Website', docsCount: 0, videosCount: 10, status: 'watch' },
        { id: 9, title: 'M9 Social Media Optmization For Business', docsCount: 11, videosCount: 20, status: 'watch' },
        { id: 10, title: 'M10 Search Engine Optimization', docsCount: 6, videosCount: 12, status: 'watch' },
        { id: 11, title: 'M11 Web Analytics & Traffic Reporting', docsCount: 1, videosCount: 4, status: 'resume' }
      ],
      levelComplete: false
    },
    {
      id: 3,
      title: 'Lead Generation',
      modulesCount: 5,
      modules: [
        { id: 12, title: 'M12 Introduction to Lead Generation', docsCount: 1, videosCount: 1, status: 'watch' },
        { id: 13, title: 'M13 Online Advertising & Google Ads', docsCount: 2, videosCount: 9, status: 'watch' },
        { id: 14, title: 'M14 Display Advertising', docsCount: 1, videosCount: 4, status: 'resume' },
        { id: 15, title: 'M15 Video Advertising', docsCount: 1, videosCount: 2, status: 'watch' },
        { id: 16, title: 'M16 Facebook Advertising', docsCount: 4, videosCount: 0, status: 'watch' }
      ],
      levelComplete: false
    },
    {
      id: 4,
      title: 'Lead Nurturing',
      modulesCount: 4,
      modules: [
        { id: 17, title: 'M17 Email Marketing', docsCount: 5, videosCount: 6, status: 'watch' },
        { id: 18, title: 'M18 Remarketing & Rebranding', docsCount: 3, videosCount: 5, status: 'watch' },
        { id: 19, title: 'M19 Inbound Marketing', docsCount: 1, videosCount: 1, status: 'watch' },
        { id: 20, title: 'M20 Web Content Writing', docsCount: 3, videosCount: 3, status: 'resume' }
      ],
      levelComplete: false
    },
    {
      id: 5,
      title: 'Personal Branding & Online Earning',
      modulesCount: 4,
      modules: [
        { id: 21, title: 'M21 Personal Branding & Influencer Marketing', docsCount: 1, videosCount: 0, status: 'watch' },
        { id: 22, title: 'M22 Affiliate Marketing & Google Adsense', docsCount: 3, videosCount: 4, status: 'watch' },
        { id: 23, title: 'M23 Digital Marketing Freelancing', docsCount: 1, videosCount: 1, status: 'watch' },
        { id: 24, title: 'M24 E-Commerce & Marketing Place', docsCount: 4, videosCount: 20, status: 'resume' }
      ],
      levelComplete: false
    },

    {
      id: 6,
      title: 'Interview Preparation',
      modulesCount: 1,
      modules: [
        { id: 25, title: 'M25 Digital Marketing Interview Prepration', docsCount: 4, videosCount: 2, status: 'watch' }
      ],
      levelComplete: false
    },
    {
      id: 7,
      title: 'Pro Version - Master Class',
      modulesCount: 1,
      modules: [
        { id: 26, title: 'M126 Master Class', docsCount: 0, videosCount: 5, status: 'watch' }
      ],
      levelComplete: false
    }
  ];

  constructor(private router: Router) { }


  handleSectionClick(sectionId: number) {
    if (!this.userAccessibleSections.includes(sectionId)) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'This section is not accessible for you.',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    this.activeSection = this.activeSection === sectionId ? null : sectionId;
  }

  toggleSection(id: number) {
    this.activeSection = this.activeSection === id ? null : id;
  }

  onModuleClick(sectionId: number, module: any) {
    if (this.userAccessibleSections.includes(sectionId)) {
      this.router.navigate(['/home/view-module'], { queryParams: { id: module.id } });
    } else {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'This section is not accessible for you.',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  }

}
