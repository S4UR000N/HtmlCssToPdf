const puppeteer = require('puppeteer');
const path = require('node:path');
const fs = require('fs');
const uuid = require('uuid');


module.exports = (res, req) =>
{
  // Parse POST form data
   let requestBody = '';
   req.on('data', (chunk) => requestBody += chunk.toString());
   req.on('end', () => {
      const formData = new URLSearchParams(requestBody);
      const htmlcss = formData.get('htmlcss');

      // Validate form data
      (async () => {
        const validator = require('html-validator')
        const options = {
          validator: 'WHATWG',
          data: htmlcss,
          isFragment: true
        }
      
        try
        {
          const result = await validator(options);
          if (result.isValid)
          {
              (async () => {
                const browser = await puppeteer.launch({
                    headless: true,
	                  args: ['--no-sandbox']
                });
                const page = await browser.newPage();
                await page.setContent(htmlcss, { waitUntil: 'domcontentloaded' });
                await page.emulateMediaType('screen');
  
                const pdf = await page.pdf({
                  path: 'src/storage/' + uuid.v4() + '.pdf',
                  margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                  printBackground: true,
                  format: 'A4',
                });

                await browser.close();
              })();

              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              res.end('<a href="">undone</a>');
          }

          // Display HTML errors
          else
          {
            var error = result.errors.reduce((acc, val) => acc + "(ln): " +  val.line + " | " + "(col): "  + val.column + " | " + val.message + "\n", '');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            var filePath = path.join('public', 'templates', 'index.html');
            const readStream = fs.createReadStream(filePath);
            let modifiedContent = '';

            readStream.on('data', (chunk) =>
            {
              const data = chunk.toString();
              modifiedContent += modifyTextareaContent(data, error);
            });

            readStream.on('end', () =>
            {
              res.setHeader('Content-Length', Buffer.byteLength(modifiedContent));
              res.end(modifiedContent);
            });
          }
        }
        catch (error)
        {
          console.error('Error during validation:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');        
        }
      })();
   });
}

/* Helpers */
// Puppeteer
// Error Message Helper
function modifyTextareaContent(data, replacementText)
{
  let modifiedContent = '';
  let isTextarea = false;

  if (data.includes('<textarea'))
  {
    isTextarea = true;
  }

  if (isTextarea && data.includes('</textarea>'))
  {
    const modifiedTextareaContent = replacementText;
    modifiedContent += data.replace(/(<textarea.*?>)([\s\S]*?)(<\/textarea>)/, `$1${modifiedTextareaContent}$3`);
    isTextarea = false;
  }
  else
  {
    modifiedContent += data;
  }

  return modifiedContent;
}
