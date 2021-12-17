import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import List from '@ckeditor/ckeditor5-list/src/list';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import VideoUpload from "./src/videoupload";
import Video from "./src/video";
import VideoResize from "./src/videoresize";
import VideoToolbar from "./src/videotoolbar";
import VideoStyle from "./src/videostyle";
import VideoInsert from "./src/videoinsert";

ClassicEditor.builtinPlugins = [
  Paragraph,
  Bold,
  Italic,
  CKEditorInspector,
  List,
  Heading,
  Essentials,
  Video,
  VideoUpload,
  VideoResize,
  VideoToolbar,
  VideoStyle,
  VideoInsert
]
export default ClassicEditor
