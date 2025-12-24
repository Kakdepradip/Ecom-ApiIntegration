import { Component, Input, inject, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        CurrencyPipe
    ],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css'
})
export class ProductCardComponent {
    @Input({ required: true }) product!: Product;

    private productService = inject(ProductService);

    isInWatchlist = computed(() =>
        this.productService.isInWatchlist(this.product?.id)
    );

    onBuy(): void {
        this.productService.buyProduct(this.product);
    }

    onToggleWatchlist(): void {
        if (this.isInWatchlist()) {
            this.productService.removeFromWatchlist(this.product.id);
        } else {
            this.productService.addToWatchlist(this.product);
        }
    }
}
