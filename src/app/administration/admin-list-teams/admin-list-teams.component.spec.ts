import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListTeamsComponent } from './admin-list-teams.component';

describe('AdminListTeamsComponent', () => {
  let component: AdminListTeamsComponent;
  let fixture: ComponentFixture<AdminListTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
