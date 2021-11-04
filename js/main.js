import {
  createPhotoDescriptions
} from './data.js';
import {
  renderThumbnailElements,
  reactThumbnailClick
} from './thumbnails.js';
import {
  showImgUploadForm
} from './form.js';


const photoDescriptions = createPhotoDescriptions();

renderThumbnailElements(photoDescriptions);
reactThumbnailClick(photoDescriptions);
showImgUploadForm();
