import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    cartService = jasmine.createSpyObj('cartService', [
      'info',
      'pokemonCart',
      'clearCart',
      'removeFromCart',
    ]);
    dialog = jasmine.createSpyObj('dialog', ['open', 'afterClosed']);
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: MatDialog, useValue: dialog },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
