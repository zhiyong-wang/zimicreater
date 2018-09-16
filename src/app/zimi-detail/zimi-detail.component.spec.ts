import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimiDetailComponent } from './zimi-detail.component';

describe('ZimiDetailComponent', () => {
  let component: ZimiDetailComponent;
  let fixture: ComponentFixture<ZimiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
