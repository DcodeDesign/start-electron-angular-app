import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNameGenerationFormComponent } from './branch-name-generation-form.component';

describe('BranchNameGenerationFormComponent', () => {
  let component: BranchNameGenerationFormComponent;
  let fixture: ComponentFixture<BranchNameGenerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNameGenerationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchNameGenerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
