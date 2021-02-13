import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

import { User } from '../interface/User';
import { AuthService } from '../services/auth.service';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Simple HTML', () => {
    it('should have minimum 2 buttons', () => {
      const btn = fixture.debugElement.queryAll(By.css('button'));
      expect(btn.length >=2).toBeTruthy();
    });

    it('should be an "Add" text button', () => {
      const btn = fixture.debugElement.queryAll(By.css('button'));
      expect(btn[0].nativeElement.textContent).toBe('Add');
    });

    it('should be a "Login" text button', () => {
      const btn = fixture.debugElement.queryAll(By.css('button'));
      expect(btn[1].nativeElement.textContent).toBe('Login');
    });
  });

  describe('Logic', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });

    it('should have a user', () => {
      component.user = helper.getUser();
      fixture.detectChanges();
      spyOn(component, 'getUser');
      const user: User = {
        displayName: 'string',
        email: 'string',
        photoURL: 'string',
        uid: 'string'
      }
      expect(component.user).toEqual(user);
    });

    it('should have addData to be true', () => {
      component.addData = helper.add();
      fixture.detectChanges();
      spyOn(component, 'add');
      expect(component.addData).toBeTruthy();
    });

    it('should have addData to be false', () => {
      component.addData = helper.onClose();
      spyOn(component, 'onClose');
      expect(component.addData).toBeFalsy();
    });

    it('should call login button one time', () => {
      spyOn(component, 'login');
      const btn = fixture.debugElement.queryAll(By.css('button'));
      btn[1].nativeElement.click();
      expect(component.login).toHaveBeenCalledTimes(1);
    });
  });
});

class AuthServiceStub {
  user = new Subject<User>();

  constructor() {
    this.user.next();
  }
}

class Helper {
  user: User;
  addData = false;

  getUser(): User {
    return {
      displayName: 'string',
      email: 'string',
      photoURL: 'string',
      uid: 'string'
    }
  }

  add(): boolean {
   return true;
  }

  onClose(): boolean {
    return false;
  }
}
