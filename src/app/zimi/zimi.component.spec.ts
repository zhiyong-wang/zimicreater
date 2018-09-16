import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimiComponent } from './zimi.component';

describe('ZimiComponent', () => {
  let component: ZimiComponent;
  let fixture: ComponentFixture<ZimiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
