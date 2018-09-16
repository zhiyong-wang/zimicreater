import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimiListComponent } from './zimi-list.component';

describe('ZimiListComponent', () => {
  let component: ZimiListComponent;
  let fixture: ComponentFixture<ZimiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
