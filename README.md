# QR Games
This is tic-tac-toe and flappy bird implemented in typescript. **All in a SINGLE QR Code!** (< 3kb!)

I was able to fit this all inside a qr code by first bundling and minifying the code with vite, and then running it through [`qrcode-datauri`](https://github.com/Badbird5907/qrcode-datauri), a cli tool I made to gzip and embed the html file inside a datauri.

![image](https://github.com/user-attachments/assets/e883b985-17d0-48ed-85e9-b59ae5f097fc)


![qr](https://raw.githubusercontent.com/Badbird5907/qr-games/refs/heads/master/out/qr.png)


# Build
Run `pnpm run build` to build the code for yourself!
