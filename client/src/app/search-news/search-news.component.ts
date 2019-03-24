import { SearchNewsServiceService } from './../services/search-news-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.scss']
})
export class SearchNewsComponent implements OnInit {

  mArticles: Array<any>;
  mSources: Array<any>;

  constructor(private searchNewsService: SearchNewsServiceService) {
  }

  ngOnInit() {
    // //load articles
    this.searchNewsService.initArticles().subscribe(data => this.mArticles = data['articles']);
    // //load news sources
    this.searchNewsService.initSources().subscribe(data => this.mSources = data['sources']);
  }

  submit(searchNews) {
    this.searchArticles(searchNews);
  }

  searchArticles(source) {
    this.searchNewsService.getArticlesByID(source).subscribe(
      (data) => { this.mArticles = data['articles']; });
  }
}
