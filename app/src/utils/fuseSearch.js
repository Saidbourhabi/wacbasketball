import Fuse from 'fuse.js'
const FUSE_OPTIONS = {
    keys: [
        'name', 
        'tags', 
        'description'
    ],
    threshold: 0.3,
    ignoreLocation: true,
}
export const createFuseSearch = (data) => new Fuse(data, FUSE_OPTIONS)