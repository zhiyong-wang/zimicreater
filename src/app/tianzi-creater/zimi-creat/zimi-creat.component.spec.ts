import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimiCreatComponent } from './zimi-creat.component';

describe('ZimiCreatComponent', () => {
  let component: ZimiCreatComponent;
  let fixture: ComponentFixture<ZimiCreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimiCreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimiCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
