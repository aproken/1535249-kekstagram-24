import {
  createPhotoDescriptions
} from './data.js';
import {
  renderTrumbnailElements
} from './thumbnails.js';


const photoDescriptions = createPhotoDescriptions();
renderTrumbnailElements(photoDescriptions);
