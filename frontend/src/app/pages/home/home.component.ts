import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BlogService } from '../../core/services/blog.service';
import { Article } from '../../core/models/article.model';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { 
  LucideSparkles, 
  LucideArrowRight, 
  LucideCalendarCheck, 
  LucideHeart, 
  LucideMic, 
  LucideBookOpen, 
  LucideActivity, 
  LucideAudioWaveform,
  LucideMapPin,
  LucideClock,
  LucideCheckCircle2,
  LucideShieldCheck
} from '@lucide/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    FadeUpDirective,
    LucideSparkles,
    LucideArrowRight,
    LucideCalendarCheck,
    LucideHeart,
    LucideMic,
    LucideBookOpen,
    LucideActivity,
    LucideAudioWaveform,
    LucideMapPin,
    LucideClock,
    LucideCheckCircle2,
    LucideShieldCheck
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private blogService = inject(BlogService);
  recentArticles: Article[] = [];

  ngOnInit(): void {
    this.blogService.getRecentArticles(3).subscribe(articles => {
      this.recentArticles = articles;
    });
  }
}
