import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Marker, icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

// Category type for map points
export type MapCategory = 'startup' | 'empresa' | 'universidade' | 'governo' | 'evento';

// Interface for map point data
interface MapPoint {
  id: number;
  name: string;
  category: MapCategory;
  area?: string;
  lat: number;
  lng: number;
  description?: string;
  website?: string;
  address?: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;
  private markers: L.LayerGroup | undefined;
  private filteredPoints: MapPoint[] = [];
  private allPoints: MapPoint[] = [];
  
  // Default coordinates for Joinville
  private readonly defaultLat = -26.3044;
  private readonly defaultLng = -48.8487;
  private readonly defaultZoom = 13;

  // Category icons
  private readonly icons = {
    startup: L.icon({
      iconUrl: 'assets/images/markers/rocket-solid.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    empresa: L.icon({
      iconUrl: 'assets/images/markers/building-solid.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    universidade: L.icon({
      iconUrl: 'assets/images/markers/building-columns-solid.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    governo: L.icon({
      iconUrl: 'assets/images/markers/landmark-flag-solid.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    evento: L.icon({
      iconUrl: 'assets/images/markers/calendar-days-solid.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })
  };

  // Modal state
  showModal = false;
  newPoint: Partial<MapPoint> = {};
  isSubmitting = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadMapPoints();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Initialize the map
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], this.defaultZoom);
    
    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map!);

    // Initialize markers layer group
    this.markers = L.layerGroup().addTo(this.map);
  }

  private loadMapPoints(): void {
    // In a real app, this would be an HTTP request to your backend
    this.http.get<MapPoint[]>('assets/data/map-points.json').subscribe(points => {
      this.allPoints = points;
      this.filteredPoints = [...points];
      this.updateMarkers();
    }, error => {
      console.error('Error loading map points:', error);
      // Fallback to some default points if API fails
      this.allPoints = this.getDefaultPoints();
      this.filteredPoints = [...this.allPoints];
      this.updateMarkers();
    });
  }

  private getDefaultPoints(): MapPoint[] {
    return [
      {
        id: 1,
        name: 'Prefeitura de Joinville',
        category: 'governo',
        area: 'servicos',
        lat: -26.3044,
        lng: -48.8487,
        description: 'Prefeitura Municipal de Joinville',
        website: 'https://www.joinville.sc.gov.br'
      },
      {
        id: 2,
        name: 'Universidade Federal de Santa Catarina - Campus Joinville',
        category: 'universidade',
        area: 'educacao',
        lat: -26.2975,
        lng: -48.8433,
        description: 'Campus Joinville da UFSC',
        website: 'https://joinville.ufsc.br'
      },
      {
        id: 3,
        name: 'Inovaparq - Parque Tecnológico',
        category: 'empresa',
        area: 'tecnologia',
        lat: -26.2912,
        lng: -48.8501,
        description: 'Parque Tecnológico de Joinville',
        website: 'https://www.inovaparq.com.br'
      },
      {
        id: 4,
        name: 'Startup TechJoin',
        category: 'startup',
        area: 'tecnologia',
        lat: -26.3001,
        lng: -48.8403,
        description: 'Startup de soluções tecnológicas para a região',
        website: 'https://techjoin.example.com'
      },
      {
        id: 5,
        name: 'Feira de Inovação 2023',
        category: 'evento',
        area: 'tecnologia',
        lat: -26.3087,
        lng: -48.8456,
        description: 'Maior evento de inovação da região',
        website: 'https://feirainovacao.example.com'
      }
    ];
  }

  private updateMarkers(): void {
    // Clear existing markers
    if (this.markers) {
      this.markers.clearLayers();
    }

    this.filteredPoints.forEach(point => {
      const marker = L.marker([point.lat, point.lng], {
        icon: this.icons[point.category] || this.icons.startup
      });
      
      // Create popup content
      let popupContent = `<b>${point.name}</b><br>`;
      popupContent += `<small>${this.getCategoryName(point.category)}</small><br>`;
      if (point.description) {
        popupContent += `<p>${point.description}</p>`;
      }
      if (point.website) {
        popupContent += `<a href="${point.website}" target="_blank">Visitar website</a>`;
      }
      
      marker.bindPopup(popupContent);
      if (this.markers) {
        this.markers.addLayer(marker);
      }
    });
  }

  private getCategoryName(category: MapCategory): string {
    const names: Record<MapCategory, string> = {
      startup: 'Startup',
      empresa: 'Empresa',
      universidade: 'Universidade',
      governo: 'Órgão Governamental',
      evento: 'Evento'
    };
    return names[category];
  }

  private setupEventListeners(): void {
    // Filter checkboxes
    document.querySelectorAll('.filter-option input').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.applyFilters());
    });

    // Clear filters button
    document.querySelector('.clear-filters')?.addEventListener('click', () => {
      document.querySelectorAll('.filter-option input').forEach((checkbox) => {
  (checkbox as HTMLInputElement).checked = true;
}
);
      this.applyFilters();
    });

    // Add point button
    document.getElementById('addPointBtn')?.addEventListener('click', () => {
      if (this.authService.isLoggedIn()) {
        this.showAddPointModal();
      } else {
        // Redirect to login with return URL
        this.authService.redirectToLogin('/mapa');
      }
    });

    // Modal close button
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      this.hideAddPointModal();
    });

    // Modal cancel button
    document.querySelector('.cancel-button')?.addEventListener('click', () => {
      this.hideAddPointModal();
    });

    // Search address button
    document.getElementById('searchAddress')?.addEventListener('click', () => {
      this.searchAddress();
    });

    // Form submission
    document.getElementById('addPointForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitNewPoint();
    });
  }

private applyFilters(): void {
  const selectedCategories = Array.from(
    document.querySelectorAll('.filter-option input[data-category]:checked')
  ).map(el => (el as HTMLInputElement).dataset['category']);

  const selectedAreas = Array.from(
    document.querySelectorAll('.filter-option input[data-area]:checked')
  ).map(el => (el as HTMLInputElement).dataset['area']);

  this.filteredPoints = this.allPoints.filter(point => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(point.category);
    const areaMatch =
      !point.area || selectedAreas.length === 0 || selectedAreas.includes(point.area);
    return categoryMatch && areaMatch;
  });

  this.updateMarkers();
}

  private showAddPointModal(): void {
    this.showModal = true;
    this.newPoint = {}; // Reset form
  }

  private hideAddPointModal(): void {
    this.showModal = false;
  }

  private searchAddress(): void {
    const address = (document.getElementById('pointAddress') as HTMLInputElement).value;
    if (!address) return;

    // In a real app, you would use a geocoding service like Nominatim or Google Maps Geocoding API
    // This is a simplified version that just uses a mock response
    const mockGeocodingResponse = {
      lat: this.defaultLat + (Math.random() * 0.01 - 0.005), // Random near Joinville
      lng: this.defaultLng + (Math.random() * 0.01 - 0.005)
    };

    this.newPoint.lat = mockGeocodingResponse.lat;
    this.newPoint.lng = mockGeocodingResponse.lng;
    
    // Center map on the found location
    if (this.map) {
      this.map.setView([mockGeocodingResponse.lat, mockGeocodingResponse.lng], 15);
    }
    
    // Show a temporary marker
    if (this.tempMarker) {
      if (this.map) {
        this.map.removeLayer(this.tempMarker);
      }
    }
    this.tempMarker = L.marker([mockGeocodingResponse.lat, mockGeocodingResponse.lng], {
      icon: L.icon({
        iconUrl: 'assets/markers/marker-temp.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      }),
      zIndexOffset: 1000
    }).addTo(this.map!);
  }

  private tempMarker: L.Marker | null = null;

  private submitNewPoint(): void {
    this.isSubmitting = true;
    
    // Get form values
    const form = document.getElementById('addPointForm') as HTMLFormElement;
    const formData = new FormData(form);
    
    // In a real app, you would send this to your backend API
    setTimeout(() => {
      // Create new point (simulating API response)
      const newPoint: MapPoint = {
        id: Math.max(...this.allPoints.map(p => p.id)) + 1,
        name: formData.get('pointName') as string,
        category: formData.get('pointCategory') as MapCategory,
        lat: this.newPoint.lat || this.defaultLat,
        lng: this.newPoint.lng || this.defaultLng,
        description: formData.get('pointDescription') as string || '',
        website: formData.get('pointWebsite') as string || '',
        address: formData.get('pointAddress') as string || ''
      };
      
      // Add to our data
      this.allPoints.push(newPoint);
      this.filteredPoints.push(newPoint);
      this.updateMarkers();
      
      // Clean up
      this.isSubmitting = false;
      this.hideAddPointModal();
      if (this.tempMarker) {
        if (this.map) {
          this.map.removeLayer(this.tempMarker);
        }
        this.tempMarker = null;
      }
      
      // Show success message
      alert('Ponto adicionado com sucesso!');
    }, 1000);
  }
}

