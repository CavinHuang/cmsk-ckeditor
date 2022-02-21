# @cmsk/ckeditor5
[![Author](https://img.shields.io/badge/Author-@cmsk-red.svg "Author")](https://github.com/CavinHuang "Author")
[![Last Commit](https://img.shields.io/github/last-commit/cavinHuang/cmsk-ckeditor "last commit")](https://github.com/CavinHuang/cmsk-ckeditor/commits/main "last commit")
[![Release Date](https://img.shields.io/github/release-date/cavinHuang/cmsk-ckeditor "Release Date")](https://github.com/CavinHuang/cmsk-ckeditor/releases")
[![Build Status](https://travis-ci.com/JoeyBling/yilia-plus-demo.svg?branch=master)](https://github.com/CavinHuang/cmsk-ckeditor)
[![release](https://img.shields.io/github/v/release/cavinHuang/cmsk-ckeditor "release")](https://www.npmjs.com/package/@cmsk/ckeditor5 "release")
[![language](https://img.shields.io/github/languages/top/cavinHuang/cmsk-ckeditor "language")](https://img.shields.io/github/languages/top/cavinHuang/cmsk-ckeditor "language") 
---
## 安装 
```bash
npm install @cmsk/editor5
# or
yarn add @cmsk/editor5
```

## 使用
vue2 + ts封装组件及使用示例

```vue
<template>
  <div id="editor" ref="editor" v-on="$listeners"> </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PropType } from 'vue'
import ClassicEditor from '@cmsk/ckeditor5/build/ckeditor';
import { debounce } from 'lodash';
const INPUT_EVENT_DEBOUNCE_WAIT = 300;

@Component({})
export default class CkEdit extends Vue {
  @Prop({ type: Object as PropType<any>, default: () => ({}) }) private editorConfig!: any
  @Prop({ type: String, default: '' }) private value!: string
  private $_instance: any = null
  private $_lastEditorData = ''
  private $_setUpEditorEvents() {
    const editor = this.$_instance;

    // Use the leading edge so the first event in the series is emitted immediately.
    // Failing to do so leads to race conditions, for instance, when the component value
    // is set twice in a time span shorter than the debounce time.
    // See https://github.com/ckeditor/ckeditor5-vue/issues/149.
    const emitDebouncedInputEvent = debounce(evt => {
      // Cache the last editor data. This kind of data is a result of typing,
      // editor command execution, collaborative changes to the document, etc.
      // This data is compared when the component value changes in a 2-way binding.
      const data = this.$_lastEditorData = editor.getData();

      // The compatibility with the v-model and general Vue.js concept of input–like components.
      this.$emit('input', data, evt, editor);
    }, INPUT_EVENT_DEBOUNCE_WAIT, { leading: true });

    // Debounce emitting the #input event. When data is huge, $_instance#getData()
    // takes a lot of time to execute on every single key press and ruins the UX.
    //
    // See: https://github.com/ckeditor/ckeditor5-vue/issues/42
    editor.model.document.on('change:data', emitDebouncedInputEvent);

    editor.editing.view.document.on('focus', (evt: any) => {
      this.$emit('focus', evt, editor);
    });

    editor.editing.view.document.on('blur', (evt: any) => {
      this.$emit('blur', evt, editor);
    });
  }
  mounted() {
    const $editor = this.$refs.editor
    const editorConfig = Object.assign({}, this.editorConfig)
    if ($editor) {
      ClassicEditor
        .create(document.querySelector('#editor'), editorConfig)
        .then((editor: any) => {
          this.$_instance = editor
          this.$_setUpEditorEvents();
          this.$emit('ready', editor);
        })
        .catch((error: any) => {
          console.error('Oops, something went wrong!');
          console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
          console.warn('Build id: a85us1kma4lo-qrsitu21u7bl');
          console.error(error);
        });
    }
  }
  beforeDestroy() {
    if (this.$_instance) {
      this.$_instance.destroy();
      this.$_instance = null;
    }
    this.$emit('destroy', this.$_instance);
  }
  @Watch('value')
  handleValueChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue && newValue !== this.$_lastEditorData) {
      this.$_instance.setData(newValue);
    }
  }
}
</script>

<style scoped>

</style>

```

组件使用

```vue
<template>
<ckeditor  :editor-config="editorConfig" v-model="boardContent"></ckeditor>
</template>

<script>
export default {
  data() {
    return {
    boardContent: '',
      editorConfig: {
        extraPlugins: [VideoUploadAdapterPlugin],
        video: {
          upload: {
            types: ['mp4'],
            allowMultipleFiles: false
          },
          styles: [
            'alignLeft', 'alignCenter', 'alignRight'
          ],

          // Configure the available video resize options.
          resizeOptions: [
            {
              name: 'videoResize:original',
              label: 'Original',
              icon: 'original'
            },
            {
              name: 'videoResize:50',
              label: '50',
              icon: 'medium'
            },
            {
              name: 'videoResize:75',
              label: '75',
              icon: 'large'
            }
          ],

          // You need to configure the video toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            'videoStyle:alignLeft', 'videoStyle:alignCenter', 'videoStyle:alignRight',
            '|',
            'videoResize:50',
            'videoResize:75',
            'videoResize:original'
          ]
        },
        image: {
          upload: {
            types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']
          }
        },
        language: 'zh-cn'
      }

    }
  }
}
</script>

```
