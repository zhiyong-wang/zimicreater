import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimisListComponent } from './zimis-list.component';

describe('ZimisListComponent', () => {
  let component: ZimisListComponent;
  let fixture: ComponentFixture<ZimisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZimisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZimisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
