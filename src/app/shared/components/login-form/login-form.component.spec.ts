import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('formulaire invalide → submit non émis', () => {
    spyOn(component.submitForm, 'emit');

    component.form.setValue({ username: '', password: '' });
    component.submit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });

  it('formulaire valide → submit émet payload', () => {
    spyOn(component.submitForm, 'emit');

    component.form.setValue({
      username: 'demo',
      password: 'demo'
    });

    component.submit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      username: 'demo',
      password: 'demo'
    });
  });

});
