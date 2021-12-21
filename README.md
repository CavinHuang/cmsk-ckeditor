# cmsk-ckeditor

基于ckeditor5的自定义编译插件。

![Language](https://img.shields.io/badge/-Javascript-blue.svg)
[![npm package](https://img.shields.io/npm/v/san-ssr-plugin.svg)](https://www.npmjs.org/package/cmsk-plugin-ckeditor5)
[![npm package](https://github.com/searchfe/san-ssr-plugin/workflows/CI/badge.svg)](https://github.com/searchfe/cmsk-ckeditor/actions)
[![npm package](https://img.shields.io/coveralls/github/searchfe/san-ssr-plugin.svg)](https://coveralls.io/github/searchfe/cmsk-ckeditor?branch=main)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)]()

# 快速开始

## 安装

```bash
npm i cmsk-plugin-ckeditor5

or

yarn add cmsk-plugin-ckeditor5
```

## 使用

```javascript
import CsCkEditor from 'cmsk-plugin-ckeditor5'

class VideoUploadAdapter {
      constructor( loader ) {
          this.loader = loader;
      }

      upload() {
          const uploadVideo = async (file) => {
              this.loader.uploaded = false;
              return new Promise((resolve) => {
                  setTimeout(() => {
                      this.loader.uploaded = true;
                      resolve({ default: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4' });
                  }, 2000);
              });
          };

          return this.loader.file.then((file) => uploadVideo(file));
      }

      abort() {
          return Promise.reject();
      }
  }

  function VideoUploadAdapterPlugin( editor ) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new VideoUploadAdapter(loader);
      };
  }
  CsCkEditor.create(
    document.querySelector( '#editor' ),
    {
      toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'videoUpload' ],
      extraPlugins: [VideoUploadAdapterPlugin],
      video: { 
        upload: { 
          types: ['mp4'],
          allowMultipleFiles: false
        },
        styles: [ 'alignLeft', 'alignCenter', 'alignRight' ],
        // Configure the available video resize options. 
        resizeOptions: [ 
          { name: 'videoResize:original', label: 'Original', icon: 'original' }, 
          { name: 'videoResize:50', label: '50', icon: 'medium' },
          { name: 'videoResize:75', label: '75', icon: 'large' }
        ], 
          // You need to configure the video toolbar, too, so it shows the new style // buttons as well as  the resize buttons.
        toolbar: [ 
          'videoStyle:alignLeft', 
          'videoStyle:alignCenter', 
          'videoStyle:alignRight', 
          '|', 
          'videoResize:50', 
          'videoResize:75', 
          'videoResize:original'
        ] 
    } 
  }).then( editor => { 
    window.editor = editor;
  }).catch( error => { console.error( error.stack ); } );
```
