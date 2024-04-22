import { Component, Input, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { UserFullDto } from '../model/UserFullDto';


@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.scss'
})
export class QrGeneratorComponent implements OnInit{
  @Input() userToQr ?: UserFullDto;

  encodedString : string = '';


  ngOnInit(): void {
    this.encodedString = this.collectDataToQr();
  }

  private collectDataToQr(): string{ //for now only id, last name
    if(this.userToQr){
      return this.userToQr.lastName + '/'+ this.userToQr.id;
    }
    else return '';
  }
}

