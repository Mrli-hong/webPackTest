import '../styles/index.css';
import '../styles/style.scss';
console.log("Hello OUDUIDUI");

new Promise(resolve => {
    resolve('HelloWorld')
}).then(res => {
    console.log(res);
})