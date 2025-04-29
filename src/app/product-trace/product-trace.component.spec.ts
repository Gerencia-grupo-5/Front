import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTraceComponent } from './product-trace.component';

describe('ProductTraceComponent', () => {
  let component: ProductTraceComponent;
  let fixture: ComponentFixture<ProductTraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTraceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
