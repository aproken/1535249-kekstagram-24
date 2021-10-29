import {
  createPhotoDescriptions
} from './data.js';
import {
  renderThumbnailElements,
  reactThumbnailClick
} from './thumbnails.js';


const photoDescriptions = createPhotoDescriptions();
console.log(photoDescriptions);
renderThumbnailElements(photoDescriptions);
reactThumbnailClick(photoDescriptions);
