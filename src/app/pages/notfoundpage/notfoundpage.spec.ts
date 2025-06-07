import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotfoundpageComponent } from './notfoundpage';
import { Router } from '@angular/router';

describe('NotfoundpageComponent', () => {
  let component: NotfoundpageComponent;
  let fixture: ComponentFixture<NotfoundpageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundpageComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundpageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should check if current page is 404', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/404');
    expect(component.is404Page()).toBeTrue();

    spyOnProperty(router, 'url', 'get').and.returnValue('/');
    expect(component.is404Page()).toBeFalse();
  });
});