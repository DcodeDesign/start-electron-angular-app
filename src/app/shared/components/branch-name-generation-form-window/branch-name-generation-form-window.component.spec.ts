import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNameGenerationFormWindowComponent } from './branch-name-generation-form-window.component';

describe('BranchNameGenerationFormWindowComponent', () => {
  let component: BranchNameGenerationFormWindowComponent;
  let fixture: ComponentFixture<BranchNameGenerationFormWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNameGenerationFormWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchNameGenerationFormWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
