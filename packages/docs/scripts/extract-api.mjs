import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, resolve, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'vue-docgen-api'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')
const UI_COMPONENTS_DIR = resolve(ROOT_DIR, '../ui/src/components')
const OUTPUT_DIR = resolve(ROOT_DIR, '.vitepress/data')
const OUTPUT_FILE = resolve(OUTPUT_DIR, 'api-manifest.json')

function getAllVueFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  for (const file of files) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      getAllVueFiles(filePath, fileList)
    } else if (extname(file) === '.vue') {
      fileList.push(filePath)
    }
  }
  return fileList
}

function formatType(type) {
  if (!type) return 'any'
  if (typeof type === 'string') return type
  if (type.name === 'union' && Array.isArray(type.elements)) {
    return type.elements.map(formatType).join(' | ')
  }
  if (type.name === 'Array' && Array.isArray(type.elements)) {
    return `${formatType(type.elements[0])}[]`
  }
  return type.name || 'any'
}

function formatDefaultValue(defaultValue) {
  if (!defaultValue) return undefined
  if (typeof defaultValue === 'string') return defaultValue
  if (defaultValue.value !== undefined) {
    return defaultValue.value
  }
  return undefined
}

async function extract() {
  console.log(`🔍 Scanning Vue components in ${UI_COMPONENTS_DIR}...`)
  const vueFiles = getAllVueFiles(UI_COMPONENTS_DIR)
  console.log(`📦 Found ${vueFiles.length} Vue components. Extracting API metadata...`)

  const manifest = {}

  for (const filePath of vueFiles) {
    const componentName = basename(filePath, '.vue')
    try {
      const doc = await parse(filePath)
      
      const props = (doc.props || []).map((p) => ({
        name: p.name,
        type: formatType(p.type),
        default: formatDefaultValue(p.defaultValue),
        required: Boolean(p.required),
        description: p.description || '',
      }))

      const emits = (doc.events || []).map((e) => ({
        name: e.name,
        payload: e.type?.names ? e.type.names.join(' | ') : '',
        description: e.description || '',
      }))

      const slots = (doc.slots || []).map((s) => ({
        name: s.name,
        props: s.bindings ? Object.keys(s.bindings).join(', ') : '',
        description: s.description || '',
      }))

      manifest[componentName] = {
        name: componentName,
        description: doc.description || '',
        props,
        emits,
        slots,
      }
    } catch (err) {
      console.warn(`⚠️ Warning: Could not parse ${componentName} (${err.message})`)
      // Fallback empty entry
      manifest[componentName] = {
        name: componentName,
        description: '',
        props: [],
        emits: [],
        slots: [],
      }
    }
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8')
  console.log(`✅ API metadata generated for ${Object.keys(manifest).length} components -> ${OUTPUT_FILE}`)
}

extract()
