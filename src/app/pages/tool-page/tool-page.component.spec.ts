import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPageComponent } from './tool-page.component';

describe('ToolPageComponent', () => {
  let component: ToolPageComponent;
  let fixture: ComponentFixture<ToolPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
