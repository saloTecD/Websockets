import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export { __filename, __dirname };

// import{fileURLToPath} from "url"
// import{dirname}from "path"
// const __filename=fileURLToPath(import.meta.url)
// const __dirname=dirname(__filename)


// export default __dirname