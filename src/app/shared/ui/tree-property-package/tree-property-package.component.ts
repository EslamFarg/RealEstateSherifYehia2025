import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tree-property-package',
  templateUrl: './tree-property-package.component.html',
  styleUrl: './tree-property-package.component.scss',
  standalone:true,
  imports:[NgIf]
})
export class TreePropertyPackageComponent {
// treeProperty:any=[
//     {
//       title:'المدينه 1' ,
//       expanded: false,
//       children:[
//         {
//           title:'الحي 1',
//           expanded: false,
//           children:[
//             {
//               title:'الشارع 1',
//               expanded: false,
//               children:[
//                 {
//                   title:'العقار 1',
//                   expanded: false,
//                   children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 },
//                 {
//                   title:'2 العقار',
//                   expanded: false,
//                   children:[
//                     {
//                       title:'الوحده 1',
//                      expanded: false, 
//                     },
//                     {
//                       title:'الوحده 2',
// expanded: false,                      
//                     }
//                   ]
//                 },
//               ]
//             },
//             {
//               title:'الشارع 2',
//               expanded: false,
//               children:[
//                 {
//                   title:'العقار 1',
//                   expanded: false,
//                      children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 },
//                 {
//                   title:'العقار 2',
//                   expanded: false,
//                      children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 }
//               ]
//             }

//           ]
//         },
//         // {
//         //   title:'الحي 2'
//         // }
//       ]
//     },
//     {
//       title:'المدينه 2' ,
//       expanded: false,
//       children:[
//         {
//           title:'الحي 1',
//           expanded: false,
//           children:[
//             {
//               title:'الشارع 1',
//               expanded: false,
//               children:[
//                 {
//                   title:'العقار 1',
//                   expanded: false,
//                   children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 },
//                 {
//                   title:'2 العقار',
//                   expanded: false,
//                   children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 },
//               ]
//             },
//             {
//               title:'الشارع 2',
//               expanded: false,
//               children:[
//                 {
//                   title:'العقار 1',
//                   expanded: false,
//                      children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     }
//                   ]
//                 },
//                 {
//                   title:'العقار 2',
//                   expanded: false,
//                      children:[
//                     {
//                       title:'الوحده 1',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 2',
//                       expanded: false,
//                     },
//                     {
//                       title:'الوحده 3',
//                       expanded: false,
//                     }
//                   ]
//                 }
//               ]
//             }

//           ]
//         },
//         // {
//         //   title:'الحي 2'
//         // }
//       ]
//     },
//   ]


treeProperty:any=[
  {
    title:'المدينه 1' ,
    expanded: false,
    children:[
      {
        title:'الحي 1',
        expanded: false,
        children:[
          {
            title:'العقار 1',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              }
            ]
          },
          {
            title:'العقار 2',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false, 
              },
              {
                title:'الوحده 2',
                expanded: false,                      
              }
            ]
          },
          {
            title:'العقار 3',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              }
            ]
          },
          {
            title:'العقار 4',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title:'المدينه 2' ,
    expanded: false,
    children:[
      {
        title:'الحي 1',
        expanded: false,
        children:[
          {
            title:'العقار 1',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              }
            ]
          },
          {
            title:'العقار 2',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              }
            ]
          },
          {
            title:'العقار 3',
            expanded: false,
            children:[
              {
                title:'الوحده 1',
                expanded: false,
              },
              {
                title:'الوحده 2',
                expanded: false,
              },
              {
                title:'الوحده 3',
                expanded: false,
              }
            ]
          }
        ]
      }
    ]
  },
]




    toggle(node: any) {
    node.expanded = !node.expanded;
  }
}
