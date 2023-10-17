import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNameGenerationDetailWindowComponent } from './branch-name-generation-detail-window.component';

describe('BranchNameGenerationDetailWindowComponent', () => {
  let component: BranchNameGenerationDetailWindowComponent;
  let fixture: ComponentFixture<BranchNameGenerationDetailWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNameGenerationDetailWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchNameGenerationDetailWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
