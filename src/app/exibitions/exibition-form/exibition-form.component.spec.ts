import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitionFormComponent } from './exibition-form.component';

describe('ExibitionFormComponent', () => {
  let component: ExibitionFormComponent;
  let fixture: ComponentFixture<ExibitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExibitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
