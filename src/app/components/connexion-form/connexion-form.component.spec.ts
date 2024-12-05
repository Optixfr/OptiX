import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionFormComponent } from './connexion-form.component';

describe('ConnexionFormComponent', () => {
  let component: ConnexionFormComponent;
  let fixture: ComponentFixture<ConnexionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
