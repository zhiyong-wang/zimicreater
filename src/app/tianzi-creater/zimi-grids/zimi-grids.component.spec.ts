import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimiGridsComponent } from './zimi-grids.component';

describe('ZimiGridsComponent', () => {
  let component: ZimiGridsComponent;
  let fixture: ComponentFixture<ZimiGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimiGridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimiGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
