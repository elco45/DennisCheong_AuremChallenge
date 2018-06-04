import createIndex from '../../../modules/server/create-index';
import Posts from '../Posts';

createIndex(Posts, { owner: 1 });
