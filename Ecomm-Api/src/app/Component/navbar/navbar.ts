import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatBadgeModule,
        MatMenuModule,
        FormsModule
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class NavbarComponent {
    private productService = inject(ProductService);

    searchQuery = signal('');

    get watchlistCount(): number {
        return this.productService.watchlist().length;
    }

    onSearch(): void {
        console.log('Searching for:', this.searchQuery());
    }

    onLogin(): void {
        alert('Login clicked! Implement your authentication logic here.');
    }
}
