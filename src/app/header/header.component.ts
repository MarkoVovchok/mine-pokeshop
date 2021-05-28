import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoggerService } from '../logger.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartCounter$: Observable<number>;
  isLoggedIn$: Observable<boolean>;
  bounce: boolean = false;
  constructor(
    private auth: AuthService,
    private logger: LoggerService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
    this.setCartCounter();
    this.setLoginPipe();
  }

  private setCartCounter() {
    this.cartCounter$ = this.cart.pokemonCart.pipe(
      map((cart) => {
        this.bounce = true;
        setTimeout(() => {
          this.bounce = !this.bounce;
        }, 1000);
        return cart.length;
      })
    );
  }

  private setLoginPipe() {
    this.isLoggedIn$ = this.auth.isLoggedIn$.pipe(
      tap((value) => {
        if (value) {
          this.cart.loadUsersCart();
        }
      })
    );
  }
  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
