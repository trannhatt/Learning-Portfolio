import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$?: Observable<BlogPost>;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      },
    });

    // Fetch blog details by url
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
  // Khai báo biến để lưu kích thước chữ hiện tại
  fontSize: string = 'medium'; // Giả sử kích thước mặc định là 'medium'

  // Phương thức để thay đổi kích thước chữ
  changeFontSize(size: string): void {
    this.fontSize = size;
    // Thực hiện logic để thay đổi kích thước chữ tại đây
    const contentElement = document.querySelector('.blog-content');
    if (contentElement) {
      switch (size) {
        case 'small':
          this.renderer.setStyle(contentElement, 'font-size', '10px');
          break;
        case 'medium':
          this.renderer.setStyle(contentElement, 'font-size', '18px');
          break;
        case 'large':
          this.renderer.setStyle(contentElement, 'font-size', '34px');
          break;
        default:
          break;
      }
    }
  }
  // Khai báo biến để lưu chế độ sáng/tối hiện tại
  theme: string = 'light'; // Giả sử chế độ mặc định là 'light'

  // Phương thức để chuyển đổi chế độ sáng/tối
  toggleTheme(themeMode: string): void {
    this.theme = themeMode;
    // Thực hiện logic để chuyển đổi chế độ sáng/tối tại đây
    const body = document.querySelector('body');
    if (body) {
      if (themeMode === 'dark') {
        this.renderer.addClass(body, 'dark-theme');
      } else {
        this.renderer.removeClass(body, 'dark-theme');
      }
    }
  }
}
