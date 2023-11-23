import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('avatar', { read: ElementRef }) avatar: ElementRef;
  animation: Animation;
  storage: any;
  nombreUsuario: string=""; 
  constructor(private animationCtrl: AnimationController, private activatedRoute: ActivatedRoute) {
    this.avatar = new ElementRef(null); 
    this.animation = this.animationCtrl.create();

  }

  ngAfterViewInit() {
    this.animation
      .addElement(this.avatar.nativeElement)
      .duration(5000)
      .iterations(1)  
      .fill('forwards')  
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.25, transform: 'translateX(100vw)', opacity: '0.2' },
        { offset: 0.50, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.75, transform: 'translateX(-100vw)', opacity: '0' },
        { offset: 1, transform: 'translateX(0px)', opacity: '0' },
      ])
      .play()
        setTimeout(() => {
          this.animation.play();
      }, 1000); 
  };
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
      }
    });
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }
}

