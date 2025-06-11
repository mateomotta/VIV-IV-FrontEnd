import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css'],
  standalone: true,
  imports: [FormsModule]
})
export class Mapa implements AfterViewInit {
  tipoFiltro = 'todos';
  novoPonto = { nome: '', tipo: 'ator', endereco: '' };
  marcadores: L.Marker[] = [];
  map!: L.Map;

  ngAfterViewInit() {
    this.map = L.map('map').setView([-26.3045, -48.8487], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    this.renderizarPontos();
    
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  salvarPontos(pontos: any[]) {
    localStorage.setItem('pontosMapa', JSON.stringify(pontos));
  }

  carregarPontos() {
    return JSON.parse(localStorage.getItem('pontosMapa') || '[]');
  }

  renderizarPontos() {
    this.marcadores.forEach(m => this.map.removeLayer(m));
    this.marcadores = [];
    const pontos = this.carregarPontos();
    pontos.forEach((ponto: any) => {
      if (this.tipoFiltro !== 'todos' && ponto.tipo !== this.tipoFiltro) return;
      const marcador = L.marker([ponto.lat, ponto.lng])
        .addTo(this.map)
        .bindPopup(`<strong>${ponto.nome}</strong><br/>Tipo: ${ponto.tipo}`);
      this.marcadores.push(marcador);
    });
  }

  geocodificarEndereco() {
    const { nome, tipo, endereco } = this.novoPonto;
    if (!nome || !endereco) {
      alert('Preencha o nome e o endereço.');
      return;
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data || data.length === 0) {
          alert('Endereço não encontrado.');
          return;
        }
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const novo = { nome, tipo, lat, lng };
        const pontos = this.carregarPontos();
        pontos.push(novo);
        this.salvarPontos(pontos);
        this.renderizarPontos();
        this.novoPonto = { nome: '', tipo: 'ator', endereco: '' };
      })
      .catch(() => alert('Erro ao buscar endereço.'));
  }
}