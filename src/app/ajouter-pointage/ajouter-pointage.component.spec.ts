import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPointageComponent } from './ajouter-pointage.component';

describe('AjouterPointageComponent', () => {
  let component: AjouterPointageComponent;
  let fixture: ComponentFixture<AjouterPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
