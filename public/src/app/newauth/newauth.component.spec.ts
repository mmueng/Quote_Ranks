import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewauthComponent } from './newauth.component';

describe('NewauthComponent', () => {
  let component: NewauthComponent;
  let fixture: ComponentFixture<NewauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
