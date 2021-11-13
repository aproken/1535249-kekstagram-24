import { getData } from './api.js';
import { showErrorMessage } from './notifications.js';

import { setListenerUploadImg } from './upload.js';
import * as filter from './filter.js';

const onSuccess = (photos) => {
  filter.init(photos),
  setListenerUploadImg();
};

getData(onSuccess, showErrorMessage);
filter.showImgFilters();

