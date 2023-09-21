import { createWorker } from 'tesseract.js';
import fs from 'fs';

const worker = await createWorker({
    logger: m => console.log(m)
});

(async () => {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const file = fs.readFileSync('/Users/gauravmakkar/Downloads/parseImage.jpeg')
    const { data: {words, text} } = await worker.recognize(file);
    const fonts = words.map((word)=>{
        return word.font_size
    })
    const min = Math.min(...fonts)
    const max= Math.max(...fonts)
    console.log("Output\n", text)
    console.log('Maximum font:', max)
    console.log('Minimum font:', min);
    await worker.terminate();
})();
