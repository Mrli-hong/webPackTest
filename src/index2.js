import '../styles/style.scss'

import pic from '../assets/pic1.png'


console.log("Hello OUDUIDUI2", pic);
const img = new Image();
img.src = pic;
console.log("Hello OUDUIDUI222img", img);

document.querySelector('#root').append(img);