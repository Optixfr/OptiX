import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationRapportPageComponent } from './generation-rapport-page.component';

describe('GenerationRapportPageComponent', () => {
  let component: GenerationRapportPageComponent;
  let fixture: ComponentFixture<GenerationRapportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationRapportPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationRapportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
