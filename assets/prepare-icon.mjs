import sharp from '../node_modules/sharp/lib/index.js'
import { existsSync } from 'fs'

// Detectar o ficheiro fonte (nome com extensão dupla ou simples)
const src = existsSync('icon-only.png.png') ? 'icon-only.png.png' : 'icon-only.png'
console.log(`Fonte: ${src}`)

const SIZE = 1024

async function run() {
  const meta = await sharp(src).metadata()
  console.log(`Dimensões originais: ${meta.width}x${meta.height}`)

  // 1. Trim automático das bordas brancas
  //    threshold=30 → remove pixels quase-brancos (RGB > 225)
  const trimmed = await sharp(src)
    .trim({ background: '#ffffff', threshold: 30 })
    .toBuffer()

  const trimMeta = await sharp(trimmed).metadata()
  console.log(`Após trim: ${trimMeta.width}x${trimMeta.height}`)

  // 2. Redimensionar para 900x900 e colocar sobre fundo escuro 1024x1024
  //    (margem de 62px de cada lado = safe zone para adaptive icon)
  const resized = await sharp(trimmed)
    .resize(900, 900, { fit: 'contain', background: { r: 28, g: 18, b: 7, alpha: 0 } })
    .toBuffer()

  // 3. Compor sobre fundo sólido escuro
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 28, g: 18, b: 7, alpha: 255 }
    }
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toFile('icon-only.png')

  console.log('icon-only.png gerado (sem bordas brancas)')

  // 4. icon-background.png — cor sólida escura
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 3,
      background: { r: 28, g: 18, b: 7 }
    }
  })
    .png()
    .toFile('icon-background.png')

  console.log('icon-background.png gerado')

  // 5. splash.png — ícone centrado sobre fundo escuro, maior
  const splashSize = 2732
  const splashIcon = await sharp(trimmed)
    .resize(1100, 1100, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 0 } })
    .toBuffer()

  await sharp({
    create: {
      width: splashSize,
      height: splashSize,
      channels: 4,
      background: { r: 18, g: 18, b: 18, alpha: 255 }
    }
  })
    .composite([{ input: splashIcon, gravity: 'center' }])
    .png()
    .toFile('splash.png')

  console.log('splash.png gerado')
  console.log('Concluído.')
}

run().catch(console.error)
