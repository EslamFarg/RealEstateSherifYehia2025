import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-attachments',
  templateUrl: './popup-attachments.component.html',
  styleUrl: './popup-attachments.component.scss',
  standalone:true,
  imports:[NgClass]
})
export class PopupAttachmentsComponent {


  @Input() showPopupAttachment:any;

  @Input() dataFile:any=[];

  @Output() closeAttachments=new EventEmitter();
  @Output() idRemoveFiles=new EventEmitter();

  onClose(){
    this.closeAttachments.emit(!this.showPopupAttachment);
    
  }



  hideFile(i:any,id:any){
      const removedItem = this.dataFile[i];
    this.dataFile.splice(i,1);
    if (id) {
    this.idRemoveFiles.emit(id); // أرسل فقط العناصر التي لها id
  }

  if (this.dataFile.length == 0) {
    this.closeAttachments.emit(false);
  }


    // this.idRemoveFiles.emit(id);
    // if(this.dataFile.length==0){
    //   // this.showPopupAttachment=false;
    //   this.closeAttachments.emit(false);
    // }


  }

  // showFile(item:any){

  //   let  Reader=new FileReader();

    
  //   //console.log(item);
  //   Reader.onload=function(e:any){
  //     let div=document.createElement('div');

  //    let newTap=window.open();


  //   if(newTap){
  //     newTap.document.title = item.name;
  //    div.innerHTML=`<iframe width="100%" height="100%" src="${e.target.result}" frameborder="0"></iframe>`
  //    div.style.margin='auto'
  //     newTap.document.body.style.margin='0';
  //     newTap.document.body.style.padding='0';
  //     newTap.document.body.style.height='100vh';
  //    newTap?.document.body.appendChild(div);
  //       }
  

      
  //   }

  //   Reader.readAsDataURL(item);


  // }


//   showFile(item: any) {
//   // لو العنصر من السيرفر (فيه filePath)
//   if (item.filePath) {
//     const baseUrl = 'http://gtsdev-001-site3.atempurl.com'; // غيّرها حسب الـ API عندك
//     const fileUrl = `${baseUrl}${item.filePath}`;

//     const newTab = window.open();
//     if (newTab) {
//       newTab.document.title = item.fileName;
//       const div = document.createElement('div');
//       div.innerHTML = `
//         <iframe width="100%" height="100%" src="${fileUrl}" frameborder="0"></iframe>
//       `;
//       div.style.margin = 'auto';
//       newTab.document.body.style.margin = '0';
//       newTab.document.body.style.padding = '0';
//       newTab.document.body.style.height = '100vh';
//       newTab.document.body.appendChild(div);
//     }
//   } 
//   // لو العنصر من input (File)
//   else {
//     const reader = new FileReader();
//     reader.onload = function (e: any) {
//       const newTab = window.open();
//       if (newTab) {
//         newTab.document.title = item.name;
//         const div = document.createElement('div');
//         div.innerHTML = `
//           <iframe width="100%" height="100%" src="${e.target.result}" frameborder="0"></iframe>
//         `;
//         div.style.margin = 'auto';
//         newTab.document.body.style.margin = '0';
//         newTab.document.body.style.padding = '0';
//         newTab.document.body.style.height = '100vh';
//         newTab.document.body.appendChild(div);
//       }
//     };
//     reader.readAsDataURL(item);
//   }
// }



showFile(item: any) {
  const newTab = window.open();
  if (!newTab) return;

  newTab.document.title = item.name ?? item.fileName;

  // نص CSS جاهز للكارد
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

  if (item.filePath) {
    // ملفات من السيرفر
    const baseUrl = 'http://gtsdev-001-site3.atempurl.com';
    const fileUrl = `${baseUrl}${item.filePath}`;

    if (item.fileType?.startsWith('image')) {
      div.innerHTML = `<img src="${fileUrl}" alt="${item.fileName}" /><div class="file-name">${item.fileName}</div>`;
    } else {
      div.innerHTML = `<iframe src="${fileUrl}"></iframe><div class="file-name">${item.fileName}</div>`;
    }
  } else {
    // ملفات من input
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (item.type?.startsWith('image')) {
        div.innerHTML = `<img src="${e.target.result}" alt="${item.name}" /><div class="file-name">${item.name}</div>`;
      } else {
        div.innerHTML = `<iframe src="${e.target.result}"></iframe><div class="file-name">${item.name}</div>`;
      }
      newTab.document.body.appendChild(div);
    };
    reader.readAsDataURL(item);
    return;
  }

  newTab.document.body.appendChild(div);
}


}
