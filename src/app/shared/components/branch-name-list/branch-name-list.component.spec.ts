import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNameListComponent } from './branch-name-list.component';

describe('BranchNameListComponent', () => {
  let component: BranchNameListComponent;
  let fixture: ComponentFixture<BranchNameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNameListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
