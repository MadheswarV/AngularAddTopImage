import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  selectedImg:any=[];

  imageUpload(e:any) {
    const canvas: HTMLCanvasElement | null = this.canvasRef ? this.canvasRef.nativeElement : null;
    if (!canvas) {
      return;
    }
  
    const context:any = canvas.getContext('2d');
    const img2 = new Image();
    img2.src = '../assets/img2.png';
  
    for (let i = 0; i < e.target.files.length; i++) {
      const image = e.target.files[i];
  
      const reader = new FileReader();
      reader.onload = () => {
        const img1 = new Image();
        img1.src = reader.result as string;
        img1.onload = () => {
          canvas.width = img1.width;
          canvas.height = img1.height + img2.height;
          context.drawImage(img2, 0, 0, canvas.width, img2.height);
          context.drawImage(img1, 0, img2.height, canvas.width, img1.height);
          const imgUrl = canvas.toDataURL('image/jpeg');
          this.selectedImg.push(imgUrl);
        };
      };
      reader.readAsDataURL(image);
    }
  }
  
}