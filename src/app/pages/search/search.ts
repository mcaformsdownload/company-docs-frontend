// frontend/src/app/pages/search/search.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Company } from '../../models/company.model';
import { LoaderService } from '../../services/loader.service'; // <-- IMPORT LOADER SERVICE HERE

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class SearchComponent {
  cin: string = '';
  error: string = '';
  companies: Company[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService // <-- INJECT LOADER SERVICE HERE
  ) {}

  searchCompany() {
    if (!this.cin.trim()) {
      this.error = 'Please enter a valid CIN';
      return;
    }

    // --- TEMPORARY MANUAL LOADER CONTROL START ---
    console.log('SearchComponent: Manually showing loader for search.');
    this.loader.show(); // Manually show loader

    this.authService.searchCompany(this.cin).subscribe({
      next: (res: Company) => {
        console.log('SearchComponent: Search successful, hiding loader.');
        this.loader.hide(); // Manually hide loader on success

        const incorporationDate = new Date(res.date_of_incorporation);
        const today = new Date();
        const diff = today.getTime() - incorporationDate.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

        let price = 249;
        if (age <= 2) price = 249;
        else if (age <= 5) price = 249;

        const newCompany: Company = {
          ...res,
          price,
          selected: false
        };

        this.companies.push(newCompany);
        this.cin = '';
        this.error = '';
      },
      error: (err) => { // <-- Ensure error parameter is captured
        console.error('SearchComponent: Search failed, hiding loader.', err);
        this.loader.hide(); // Manually hide loader on error
        this.error = 'Invalid CIN or not found';
      },
    });
    // --- TEMPORARY MANUAL LOADER CONTROL END ---
  }

  toggleSelection(index: number) {
    this.companies[index].selected = !this.companies[index].selected;
  }

  buySelected() {
    const selectedCompanies = this.companies.filter(c => c.selected);
    if (selectedCompanies.length === 0) {
      alert('Please select at least one company to continue');
      return;
    }

    localStorage.setItem('selectedCompanies', JSON.stringify(selectedCompanies));
    this.router.navigate(['/checkout']);
  }

  get selectedCount(): number {
    return this.companies.filter(c => c.selected === true).length;
  }
}
