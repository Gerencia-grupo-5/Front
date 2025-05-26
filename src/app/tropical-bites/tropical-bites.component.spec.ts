import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TropicalBitesComponent } from './tropical-bites.component';

describe('TropicalBitesComponent', () => {
  let component: TropicalBitesComponent;
  let fixture: ComponentFixture<TropicalBitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TropicalBitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TropicalBitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
