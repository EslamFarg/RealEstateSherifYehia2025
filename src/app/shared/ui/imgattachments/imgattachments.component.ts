import { NgFor, NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-imgattachments',
  templateUrl: './imgattachments.component.html',
  styleUrl: './imgattachments.component.scss',
  standalone:true,
  imports: [NgFor, NgClass]
})
export class ImgattachmentsComponent {





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  imgsArr:any=[]
  @Output() idRemoveFiles=new EventEmitter();

  idRemoveFileArr:any=[]

  @Output() dataImgs=new EventEmitter()
  showoverlay:any=null





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

  onFileSelected(e:any){

    const files=e.target.files;
    if(files){
Array.from(files).forEach((file:any) => {
    const url=URL.createObjectURL(file);
      this.imgsArr.push({
        file:file,
        url:url
      });
    })
    this.dataImgs.emit(this.imgsArr)
    }
    

    
  }



  @HostListener('document:click', ['$event']) Clickout(e:any){


    if(!e.target.closest('.box')){
      this.showoverlay=null;
    }
    
  }

  deleteItem(index:any,id:any){
    this.imgsArr.splice(index,1);
    if(id){
      this.idRemoveFileArr.push(id);
      this.idRemoveFiles.emit(this.idRemoveFileArr);
       
    }
   
  }

  resetImages() {
  this.imgsArr = [];
  // this.previewUrls = [];
  this.dataImgs.emit(this.imgsArr);
}

// viewItem(i:any,item:any){

//   const newTap=window.open('','_blank');
//   // console.log(item);

//   if(!newTap) return;

//   console.log(item);
//   newTap.document.title=item.name ?? item.fileName;
//     const styles = `
//     body { 
//       margin: 0; 
//       padding: 0; 
//       display: flex; 
//       justify-content: center; 
//       align-items: center; 
//       height: 100vh; 
//       font-family: Arial, sans-serif;
//       background: #f0f0f0;
//     }
//     .file-card {
//       background: #fff;
//       border-radius: 12px;
//       box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//       padding: 20px;
//       text-align: center;
//       max-width: 500px;
//     }
//     .file-card img {
//       max-width: 100%;
//       max-height: 60vh;
//       border-radius: 8px;
//       margin-bottom: 15px;
//       object-fit: contain;
//     }
//     .file-name {
//       font-size: 1.2rem;
//       font-weight: 600;
//       color: #333;
//     }
//     iframe {
//       width: 100%;
//       height: 60vh;
//       border: none;
//       border-radius: 8px;
//     }
//   `;
  
//     const styleTag = newTap.document.createElement('style');
//   styleTag.innerHTML = styles;
//   newTap.document.head.appendChild(styleTag);

  
//   const div = newTap.document.createElement('div');
//   div.className = 'file-card';

  
//   if (item.filePath) {
//     // ملفات من السيرفر
//     const baseUrl = 'http://gtsdev-001-site3.atempurl.com';
//     const fileUrl = `${baseUrl}${item.filePath}`;

//     if (item.fileType?.startsWith('image')) {
//       div.innerHTML = `<img src="${fileUrl}" alt="${item.fileName}" /><div class="file-name">${item.fileName}</div>`;
//     } else {
//       div.innerHTML = `<iframe src="${fileUrl}"></iframe><div class="file-name">${item.fileName}</div>`;
//     }
//   } else {
//     // ملفات من input
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       if (item.type?.startsWith('image')) {
//         div.innerHTML = `<img src="${e.target.result}" alt="${item.name}" /><div class="file-name">${item.name}</div>`;
//       } else {
//         div.innerHTML = `<iframe src="${e.target.result}"></iframe><div class="file-name">${item.name}</div>`;
//       }
//       newTap.document.body.appendChild(div);
//     };
//     reader.readAsDataURL(item);
//     return;
//   }

//   newTap.document.body.appendChild(div);
// }


// showFile(item: any) {



//   const div = newTab.document.createElement('div');
//   div.className = 'file-card';

//   if (item.filePath) {
//     // ملفات من السيرفر
//     const baseUrl = 'http://gtsdev-001-site3.atempurl.com';
//     const fileUrl = `${baseUrl}${item.filePath}`;

//     if (item.fileType?.startsWith('image')) {
//       div.innerHTML = `<img src="${fileUrl}" alt="${item.fileName}" /><div class="file-name">${item.fileName}</div>`;
//     } else {
//       div.innerHTML = `<iframe src="${fileUrl}"></iframe><div class="file-name">${item.fileName}</div>`;
//     }
//   } else {
//     // ملفات من input
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       if (item.type?.startsWith('image')) {
//         div.innerHTML = `<img src="${e.target.result}" alt="${item.name}" /><div class="file-name">${item.name}</div>`;
//       } else {
//         div.innerHTML = `<iframe src="${e.target.result}"></iframe><div class="file-name">${item.name}</div>`;
//       }
//       newTab.document.body.appendChild(div);
//     };
//     reader.readAsDataURL(item);
//     return;
//   }

//   newTab.document.body.appendChild(div);
// }


viewItem(i: any, item: any) {
  const newTab = window.open('', '_blank');
  if (!newTab) return;

  const file = item.file; // الملف الفعلي

  newTab.document.title = file.name;

  const styles = `
    body { 
      margin: 0; 
      padding: 0; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      font-family: Arial, sans-serif;
      background: #f0f0f0;
    }
    .file-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      padding: 20px;
      text-align: center;
      max-width: 500px;
    }
    .file-card img {
      max-width: 100%;
      max-height: 60vh;
      border-radius: 8px;
      margin-bottom: 15px;
      object-fit: contain;
    }
    .file-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }
    iframe {
      width: 100%;
      height: 60vh;
      border: none;
      border-radius: 8px;
    }
  `;
  const styleTag = newTab.document.createElement('style');
  styleTag.innerHTML = styles;
  newTab.document.head.appendChild(styleTag);

  const div = newTab.document.createElement('div');
  div.className = 'file-card';

  if (file.type.startsWith('image')) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      div.innerHTML = `<img src="${e.target.result}" alt="${file.name}" /><div class="file-name">${file.name}</div>`;
      newTab.document.body.appendChild(div);
    };
    reader.readAsDataURL(file);
  } else {
    // للملفات الغير صور
    const reader = new FileReader();
    reader.onload = (e: any) => {
      div.innerHTML = `<iframe src="${e.target.result}"></iframe><div class="file-name">${file.name}</div>`;
      newTab.document.body.appendChild(div);
    };
    reader.readAsDataURL(file);
  }
}



}
