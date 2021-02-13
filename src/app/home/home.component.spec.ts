import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { HomeComponent } from './home.component';
import { User } from '../interface/User';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postServiceMock: any;
  let authServiceMock: any;

  beforeEach(async(() => {
    postServiceMock = jasmine.createSpyObj('PostService', ['getPosts']);
    postServiceMock.getPosts.and.returnValue(of([]));

    // authServiceMock = jasmine.createSpyObj('AuthService', ['user']);
    // authServiceMock.user.and.returnValue(of({}))

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('simple HTML', () => {
  //   it('should have 0 app-post', () => {
  //     console.log(fixture.debugElement.queryAll(By.css('app-post')))
  //   });
  // });
});

class AuthServiceStub{
  user = new Subject<User>();

  constructor() {
    this.user.next();
  }
}
