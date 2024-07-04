import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureMailComponent } from './secure-mail.component';

describe('SecureMailComponent', () => {
  let component: SecureMailComponent;
  let fixture: ComponentFixture<SecureMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecureMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
