import { imageUrls } from '../data/images';

export const getImage = () => {
    const randomImageNumber = Math.floor(Math.random() * imageUrls.length - 1);
    return imageUrls[randomImageNumber];
}