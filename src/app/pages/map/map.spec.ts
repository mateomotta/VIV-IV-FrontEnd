import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MapComponent } from './map';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import * as L from 'leaflet';
import { MapCategory } from './map';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'redirectToLogin']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MapComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map on ngOnInit', () => {
    spyOn(component as any, 'initMap');
    component.ngOnInit();
    expect((component as any).initMap).toHaveBeenCalled();
  });

  it('should load points from http and update markers', () => {
    const mockPoints = [
      { id: 1, name: 'Test Point', category: 'startup' as MapCategory, lat: 0, lng: 0 }
    ];
    spyOn((component as any).http, 'get').and.returnValue(of(mockPoints));
    spyOn(component as any, 'updateMarkers');
    
    component.ngOnInit();
    
    expect((component as any).http.get).toHaveBeenCalledWith('assets/data/map-points.json');
    expect(component['allPoints']).toEqual(mockPoints);
    expect(component['filteredPoints']).toEqual(mockPoints);
    expect(component['updateMarkers']).toHaveBeenCalled();
  });

  it('should use default points if http returns empty', () => {
    spyOn((component as any).http, 'get').and.returnValue(of([]));
    spyOn(component as any, 'getDefaultPoints').and.returnValue([{ id: 1, name: 'Default', category: 'startup' as MapCategory, lat: 0, lng: 0 }]);
    spyOn(component as any, 'updateMarkers');
    
    component.ngOnInit();
    
    expect(component['allPoints'].length).toBeGreaterThan(0);
    expect(component['updateMarkers']).toHaveBeenCalled();
  });

  it('should filter points based on selected categories', () => {
    component['allPoints'] = [
      { id: 1, name: 'Startup', category: 'startup' as MapCategory, lat: 0, lng: 0 },
      { id: 2, name: 'Company', category: 'empresa' as MapCategory, lat: 0, lng: 0 }
    ];
    
    // Mock checkbox states
    spyOn(document, 'querySelectorAll').and.callFake((selector: string) => {
      if (selector.includes('data-category')) {
        const nodes = [
          { dataset: { category: 'startup' }, checked: true },
          { dataset: { category: 'empresa' }, checked: false }
        ];
        // Mock NodeList interface
        return {
          length: nodes.length,
          item: (index: number) => nodes[index] || null,
          [Symbol.iterator]: function* () { yield* nodes; }
        } as unknown as NodeListOf<any>;
      }
      return {
        length: 0,
        item: () => null,
        [Symbol.iterator]: function* () { }
      } as unknown as NodeListOf<any>;
    });
    
    spyOn(component as any, 'updateMarkers');
    component['applyFilters']();
    
    expect(component['filteredPoints'].length).toBe(1);
    expect(component['filteredPoints'][0].name).toBe('Startup');
    expect(component['updateMarkers']).toHaveBeenCalled();
  });

  it('should show add point modal when authenticated', () => {
    authService.isLoggedIn.and.returnValue(true);
    component['showAddPointModal']();
    expect(component.showModal).toBeTrue();
  });

  it('should redirect to login when not authenticated', () => {
    authService.isLoggedIn.and.returnValue(false);
    component['showAddPointModal']();
    expect(authService.redirectToLogin).toHaveBeenCalledWith('/mapa');
  });

  it('should clean up map on destroy', () => {
    spyOn(L.Map.prototype, 'remove');
    component.ngOnDestroy();
    expect(L.Map.prototype.remove).toHaveBeenCalled();
  });

  it('should get correct category names', () => {
    expect(component['getCategoryName']('startup')).toBe('Startup');
    expect(component['getCategoryName']('empresa')).toBe('Empresa');
    expect(component['getCategoryName']('unknown' as any)).toBe('unknown');
  });
});