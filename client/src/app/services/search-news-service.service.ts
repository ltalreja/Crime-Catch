import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchNewsServiceService {

  api_key = 'd1c924f77755467896410e985699480b';

  constructor(private http: HttpClient) { }
  initSources() {
     return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }
  initArticles() {
    return this.http.get('https://newsapi.org/v2/everything?q=crime%20news&apiKey=' + this.api_key);
  }
  getArticlesByID(searchNews: String) {
   return this.http.get('https://newsapi.org/v2/everything?q=' + searchNews + '&apiKey=' + this.api_key);
  }
}
