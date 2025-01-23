import * as fs from 'fs';
import * as path from 'path';
import * as QRCode from 'qrcode';
import * as zlib from 'zlib';

async function generateDataUriAndQr() {
    const filePath = path.resolve('dist/index.html');
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        
        const base64Data = Buffer.from(htmlContent).toString('base64');
        const dataUri = `data:text/html;base64,${base64Data}`; // create data uri
        
        const compressed = zlib.gzipSync(dataUri);
        const compressedBase64 = compressed.toString('base64');
        
        const originalSizeKb = Buffer.byteLength(dataUri, 'utf-8') / 1024;
        const compressedSizeKb = Buffer.byteLength(compressedBase64, 'utf-8') / 1024;
        console.log(`Original Size: ${originalSizeKb.toFixed(2)} KB`);
        console.log(`Compressed Size: ${compressedSizeKb.toFixed(2)} KB`);
        
        const qrCodePath = path.resolve('out.png');
        await QRCode.toFile(qrCodePath, compressedBase64, { // make qr
            width: 1000,
            errorCorrectionLevel: 'L',
            margin: 1,
            version: 40,
        });
        console.log(`QR Code saved as ${qrCodePath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

generateDataUriAndQr();
