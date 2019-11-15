import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneauthComponent } from './oneauth.component';

describe('OneauthComponent', () => {
  let component: OneauthComponent;
  let fixture: ComponentFixture<OneauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
