import { Component, Input, OnInit } from '@angular/core';

interface CarouselImage {
  image: string,
  id: number
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  @Input() images: CarouselImage[] = []
  @Input() indicators = true
  @Input() controls = true

  selectedIndex: number = 0

  ngOnInit(): void {
  }

  selectImage(index: number): void {
    this.selectedIndex = index
  }

  onPrevClick(): void {
    this.selectedIndex = this.selectedIndex !== 0 ? this.selectedIndex - 1 : this.images.length - 1  
  }
  
  onNextClick(): void {
    this.selectedIndex = this.selectedIndex === this.images.length - 1 ? 0 : this.selectedIndex + 1  
  }
}
