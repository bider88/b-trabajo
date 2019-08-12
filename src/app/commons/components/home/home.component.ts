import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: NgForm;
  searchText: string;
  isLoading = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.getVacancies();
  }

  search(searchForm: NgForm) {
    let { search } = searchForm.value;
    search = search ? search : 'allvacancies';
    search = search.trim();
    this.router.navigate(['/search-vacancy', search]);
  }

  getVacancies() {
    // this._searchVacancyService.getVacancies().subscribe(
    //   res => {
    //     this.countVacancies = res.count;
    //     this.vacancies = res.data;
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   () => this.isLoading = false
    // );
  }

}
