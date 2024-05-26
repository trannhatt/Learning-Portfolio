import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private apiUrl = 'http://localhost:5255/api/BlogPosts';

  constructor(private http: HttpClient) {}

  getBlogPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  searchBlogPosts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${query}`);
  }
}
