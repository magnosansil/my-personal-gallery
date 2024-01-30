import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  [x: string]: any;
  public showDeleteIcon: boolean = false;

  constructor(
    public photoService: PhotoService,
    public alertController: AlertController,
    public toastController: ToastController
    ) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async deletePhoto(position: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this photo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'secondary',
          handler: () => {
            console.log('Cancel deleting');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            // User clicked the "Delete" button
            const deletedPhoto = this.photoService.photos[position];
            await this.photoService.deletePicture(position);

            // Show a toast message
            const toast = await this.toastController.create({
              message: 'Photo deleted',
              duration: 2000,
              position: 'bottom',
              buttons: [
                {
                  text: 'Undo',
                  handler: async () => {
                    // User clicked the "Undo" button
                    this.photoService.photos.splice(position, 0, deletedPhoto);
                    await Preferences.set({
                      key: this.photoService.PHOTO_STORAGE,
                      value: JSON.stringify(this.photoService.photos)
                    })
                  }
                }
              ]
            });

            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
}
