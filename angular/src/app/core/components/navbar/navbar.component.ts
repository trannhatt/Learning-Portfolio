import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ThemeService } from 'src/app/features/auth/services/theme.service';
import { BlogPostService } from 'src/app/features/auth/services/blog-post.service'; // Import BlogPostService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: User;
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
    private blogPostService: BlogPostService // Inject BlogPostService
  ) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.blogPostService.searchBlogPosts(this.searchQuery).subscribe(
        (results: any) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching search results', error);
        }
      );
    }
  }
}
